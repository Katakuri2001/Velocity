/**
 * Velocity catalog seed — Meter + CarAPI.
 *
 * Gate 1 (--resolve-only): resolve all 11 cars, write scripts/seed-report.json,
 * print the resolve table, then exit. No image bytes, no D1 writes.
 *
 * Usage: npx tsx scripts/seed-velocity.ts --resolve-only
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const ENV_PATH = join(ROOT, '.env.local')
const REPORT_PATH = join(ROOT, 'scripts', 'seed-report.json')
const STAGING_DIR = join(ROOT, 'scripts', 'staging')
const R2_PUBLIC_URL = 'https://pub-8c38cfe6583241abbd047c611c9137dc.r2.dev'
const CLOUDFLARE_ACCOUNT_ID = 'e86299bf709f164c49c7743f56829687'

const CARAPI_BASE = 'https://carapi.app/api'
const METER_BASE = 'https://carimage.dev/api/v1'
const CARAPI_DELAY_MS = 3100 // public/free tier: 20 calls per minute

interface CarSpec {
  slug: string
  make: string
  model: string
  year: number
  color: string
  category: string
  featured: number
}

const CARS: CarSpec[] = [
  { slug: 'porsche-911-carrera', make: 'Porsche', model: '911 Carrera', year: 2024, color: 'GT Silver', category: 'Sports Cars', featured: 0 },
  { slug: 'porsche-911-gt3', make: 'Porsche', model: '911 GT3', year: 2024, color: 'White', category: 'Sports Cars', featured: 1 },
  { slug: 'mercedes-s-class', make: 'Mercedes-Benz', model: 'S-Class', year: 2024, color: 'Black', category: 'Luxury Sedans', featured: 0 },
  { slug: 'bmw-m4', make: 'BMW', model: 'M4', year: 2024, color: 'Blue', category: 'Sports Cars', featured: 0 },
  { slug: 'bmw-x7', make: 'BMW', model: 'X7', year: 2024, color: 'Black', category: 'Luxury SUVs', featured: 0 },
  { slug: 'ferrari-sf90', make: 'Ferrari', model: 'SF90', year: 2024, color: 'Red', category: 'Supercars', featured: 1 },
  { slug: 'lamborghini-huracan', make: 'Lamborghini', model: 'Huracan', year: 2023, color: 'Yellow', category: 'Supercars', featured: 1 },
  { slug: 'audi-rs7', make: 'Audi', model: 'RS7', year: 2024, color: 'Grey', category: 'Sports Cars', featured: 0 },
  { slug: 'toyota-land-cruiser', make: 'Toyota', model: 'Land Cruiser', year: 2024, color: 'White', category: 'Luxury SUVs', featured: 0 },
  { slug: 'lexus-lx', make: 'Lexus', model: 'LX', year: 2024, color: 'Black', category: 'Luxury SUVs', featured: 0 },
  { slug: 'mclaren-750s', make: 'McLaren', model: '750S', year: 2024, color: 'Orange', category: 'Supercars', featured: 0 },
]

const METER_IMAGES = [
  { slug: 'porsche-911-carrera', makeSlug: 'porsche', vehicleId: 'veh_aw0eb005gh5jd', color: 'silver' },
  { slug: 'porsche-911-gt3', makeSlug: 'porsche', vehicleId: 'veh_92qzv25dgwjvj', color: 'white' },
  { slug: 'mercedes-s-class', makeSlug: 'mercedes-benz', vehicleId: 'veh_4sbvgd7669efd', color: 'black' },
  { slug: 'bmw-m4', makeSlug: 'bmw', vehicleId: 'veh_605qp1vt5w6k5', color: 'blue' },
  { slug: 'bmw-x7', makeSlug: 'bmw', vehicleId: 'veh_7jqcxz1d7sb28', color: 'black' },
  { slug: 'ferrari-sf90', makeSlug: 'ferrari', vehicleId: 'veh_f6wmx1qzkm0dz', color: 'red' },
  { slug: 'lamborghini-huracan', makeSlug: 'lamborghini', vehicleId: 'veh_f4tzn7g972rg0', color: 'yellow' },
  { slug: 'audi-rs7', makeSlug: 'audi', vehicleId: 'veh_6gygt2rezxtx1', color: 'gray' },
  { slug: 'toyota-land-cruiser', makeSlug: 'toyota', vehicleId: 'veh_cw5ky8pczwz36', color: 'white' },
  { slug: 'lexus-lx', makeSlug: 'lexus', vehicleId: 'veh_3zpm0wcrfm6ay', color: 'black' },
  { slug: 'mclaren-750s', makeSlug: 'mclaren', vehicleId: 'veh_e3fkqneqsnjp6', color: 'orange' },
] as const

const MAKE_ALIASES: Record<string, string[]> = {
  'Mercedes-Benz': ['Mercedes-Benz', 'Mercedes'],
}

type Json = Record<string, any>

function loadEnv(): Record<string, string> {
  let text: string
  try {
    text = readFileSync(ENV_PATH, 'utf8')
  } catch {
    throw new Error(`Missing env file: ${ENV_PATH}`)
  }
  const env: Record<string, string> = {}
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const at = line.indexOf('=')
    if (at < 0) continue
    const key = line.slice(0, at).trim()
    let value = line.slice(at + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  const required = ['CAR_IMAGE_API_KEY', 'CARAPI_TOKEN', 'CARAPI_SECRET']
  const missing = required.filter((key) => !env[key]?.trim())
  if (missing.length) {
    throw new Error(`Missing or empty environment variables: ${missing.join(', ')}`)
  }
  return env
}

function norm(value: unknown): string {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function tokens(value: unknown): string[] {
  return String(value ?? '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
}

function shortError(status: number, body: string): string {
  let detail = ''
  try {
    const parsed = JSON.parse(body)
    detail = String(parsed.message ?? parsed.error ?? parsed.detail ?? '')
  } catch {
    detail = body.slice(0, 120)
  }
  return `HTTP ${status}${detail ? `: ${detail}` : ''}`
}

async function getJson(url: string, headers: Record<string, string>): Promise<Json> {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(30000) })
  const text = await response.text()
  if (!response.ok) throw new Error(shortError(response.status, text))
  try {
    return JSON.parse(text) as Json
  } catch {
    throw new Error(`HTTP 200 but response was not JSON: ${text.slice(0, 120)}`)
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function carApiLogin(token: string, secret: string): Promise<string> {
  const response = await fetch(`${CARAPI_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ api_token: token, api_secret: secret }),
    signal: AbortSignal.timeout(30000),
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`CarAPI login failed: ${shortError(response.status, text)}`)
  const jwt = text.trim().replace(/^"|"$/g, '')
  if (!jwt) throw new Error('CarAPI login returned an empty token')
  return jwt
}

let carApiCalls = 0
let lastCarApiCall = 0

async function carApiGet(path: string, jwt: string, params: Record<string, string | number>): Promise<Json> {
  const url = new URL(`${CARAPI_BASE}${path}`)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value))
  return carApiGetUrl(url.toString(), jwt)
}

async function carApiGetUrl(url: string, jwt: string): Promise<Json> {
  const wait = CARAPI_DELAY_MS - (Date.now() - lastCarApiCall)
  if (lastCarApiCall && wait > 0) await sleep(wait)
  lastCarApiCall = Date.now()
  carApiCalls += 1
  try {
    return await getJson(url, { Authorization: `Bearer ${jwt}`, Accept: 'application/json' })
  } catch (error) {
    const safeUrl = url.replace(/Bearer [^&\s]+/g, 'Bearer ***')
    throw new Error(`${error instanceof Error ? error.message : String(error)} [${safeUrl}]`)
  }
}

async function carApiAll(path: string, jwt: string, params: Record<string, string | number>, maxPages = 3): Promise<Json[]> {
  const first = await carApiGet(path, jwt, params)
  const rows = dataRows(first)
  let next = first?.collection?.next ? String(first.collection.next) : ''
  let pages = 1
  while (next && pages < maxPages) {
    const absolute = next.startsWith('http')
      ? next
      : next.startsWith('/api/')
        ? `https://carapi.app${next}`
        : `${CARAPI_BASE}${next}`
    const page = await carApiGetUrl(absolute, jwt)
    rows.push(...dataRows(page))
    next = page?.collection?.next ? String(page.collection.next) : ''
    pages += 1
  }
  return rows
}

function dataRows(result: Json): Json[] {
  const data = result?.data
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.results)) return data.results
  return []
}

function scoreModel(name: unknown, target: string): number {
  const a = norm(name)
  const b = norm(target)
  if (!a || !b) return 0
  if (a === b) return 100
  if (a.includes(b)) return 80 + a.length - b.length
  if (b.includes(a)) return 70 + b.length - a.length
  const ta = tokens(a)
  const tb = tokens(b)
  if (!ta.length || !tb.length) return 0
  const overlap = ta.filter((t) => tb.includes(t)).length / Math.max(ta.length, tb.length)
  return overlap >= 0.5 ? 40 + overlap * 10 : overlap * 10
}

function pickBest<T>(rows: T[], score: (row: T) => number): T | undefined {
  let best: T | undefined
  let bestScore = -1
  for (const row of rows) {
    const value = score(row)
    if (value > bestScore) {
      best = row
      bestScore = value
    }
  }
  return bestScore > 0 ? best : undefined
}

interface CarApiResolution {
  model: string | null
  modelId: number | null
  trim: string | null
  trimId: number | null
  msrp: number | null
  engine: Json | null
  body: Json | null
  availableYears: number[]
  catalogModels: string[]
  error: string | null
}

async function resolveCarApi(car: CarSpec, jwt: string): Promise<CarApiResolution> {
  const out: CarApiResolution = {
    model: null, modelId: null, trim: null, trimId: null,
    msrp: null, engine: null, body: null, availableYears: [], catalogModels: [], error: null,
  }
  const makes = MAKE_ALIASES[car.make] ?? [car.make]

  let models: Json[] = []
  for (const make of makes) {
    try {
      models = await carApiAll('/models/v2', jwt, { year: car.year, make })
    } catch (error) {
      out.error = String(error)
    }
    if (models.length) break
  }
  if (!models.length) {
    // The public/free dataset can omit year indexes while still listing models.
    for (const make of makes) {
      try {
        models = await carApiAll('/models/v2', jwt, { make })
      } catch (error) {
        out.error ??= String(error)
      }
      if (models.length) break
    }
  }
  out.catalogModels = models.map((row) => String(row.name ?? '')).filter(Boolean).slice(0, 12)
  if (!models.length) {
    out.error ??= 'NOT FOUND: no models returned'
    return out
  }

  const modelRow = pickBest(models, (row) => scoreModel(row.name, car.model))
  if (!modelRow) {
    out.error = `NOT FOUND: model name absent from public dataset (closest catalog names: ${out.catalogModels.join(', ')})`
    return out
  }
  out.model = String(modelRow.name)
  out.modelId = Number(modelRow.id) || null

  const modelName = String(modelRow.name)
  const makeName = String(modelRow.make ?? car.make)
  let trims = await carApiAll('/trims/v2', jwt, {
    year: car.year, make: makeName, model: modelName,
  })
  if (!trims.length) {
    trims = await carApiAll('/trims/v2', jwt, { make: makeName, model: modelName })
    const years = trims.map((row) => Number(row.year)).filter(Number.isFinite)
    out.availableYears = [...new Set(years)].sort((a, b) => b - a)
  }
  const inYear = trims.filter((row) => Number(row.year) === car.year)
  if (!inYear.length) {
    const hint = out.availableYears.length
      ? `dataset has ${out.availableYears.slice(0, 8).join(', ')}`
      : 'no trims for this model in the public dataset'
    out.error = `NOT FOUND: no trims for ${car.year} (${hint})`
    return out
  }

  // Deterministic: prefer the trim with the highest reported MSRP.
  const trimRow = [...inYear].sort((a, b) => Number(b.msrp ?? 0) - Number(a.msrp ?? 0))[0]
  out.trim = String(trimRow.trim ?? trimRow.description ?? '')
  out.trimId = Number(trimRow.id) || null
  const msrp = Number(trimRow.msrp)
  out.msrp = Number.isFinite(msrp) && msrp > 0 ? msrp : null

  const trimName = String(trimRow.trim ?? '').trim()
  if (trimName) {
    const engineResult = await carApiGet('/engines/v2', jwt, {
      year: car.year, make: makeName, model: modelName, trim: trimName,
    })
    out.engine = dataRows(engineResult)[0] ?? null

    const bodyResult = await carApiGet('/bodies/v2', jwt, {
      year: car.year, make: makeName, model: modelName, trim: trimName,
    })
    out.body = dataRows(bodyResult)[0] ?? null
  }

  return out
}

const MATCH_KIND_SCORE: Record<string, number> = {
  exact: 40, prefix: 30, token: 20, substring: 10, alias: 5,
}

interface MeterResolution {
  vehicleId: string | null
  make: string | null
  model: string | null
  year: number | null
  error: string | null
}

async function resolveMeter(car: CarSpec, apiKey: string): Promise<MeterResolution> {
  const out: MeterResolution = { vehicleId: null, make: null, model: null, year: null, error: null }
  const queries = [`${car.make} ${car.model}`, car.model]
  const results: Json[] = []

  for (const query of queries) {
    const url = new URL(`${METER_BASE}/vehicles`)
    url.searchParams.set('q', query)
    url.searchParams.set('year', String(car.year))
    try {
      const response = await getJson(url.toString(), { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' })
      results.push(...dataRows(response))
    } catch (error) {
      out.error = String(error)
    }
    if (results.length) break
  }
  if (!results.length) {
    out.error ??= 'NOT FOUND: no Meter results'
    return out
  }

  const makeOk = (row: Json) => {
    const meterMake = norm(row.make_name ?? row.make_slug)
    const wanted = norm(car.make)
    return meterMake === wanted || meterMake.includes(wanted) || wanted.includes(meterMake)
  }
  const candidates = results.filter(makeOk)
  const pool = candidates.length ? candidates : results

  const row = pickBest(pool, (item) => {
    const modelScore = scoreModel(item.model_name ?? item.model_slug, car.model)
    const kindScore = MATCH_KIND_SCORE[String(item.match_kind ?? '')] ?? 0
    return modelScore + kindScore
  })
  if (!row) {
    out.error = 'NOT FOUND: Meter result did not match model'
    return out
  }

  const ids = row.ids && typeof row.ids === 'object' ? row.ids : {}
  const id = ids[String(car.year)] ?? row.id ?? null
  if (!id || !String(id).startsWith('veh_')) {
    out.error = 'NOT FOUND: no stable veh_ id for requested year'
    return out
  }

  out.vehicleId = String(id)
  out.make = String(row.make_name ?? row.make_slug ?? car.make)
  out.model = String(row.model_name ?? row.model_slug ?? car.model)
  const years = Array.isArray(row.years) ? row.years : []
  out.year = years.includes(car.year) ? car.year : Number(row.year) || car.year
  return out
}

interface ReportRow {
  slug: string
  make: string
  model: string
  year: number
  color: string
  category: string
  featured: number
  priceRule: 'a-msrp'
  carApi: {
    status: 'FOUND' | 'NOT FOUND'
    trimFound: string | null
    trimId: number | null
    msrp: number | null
    modelFound: string | null
    modelId: number | null
    engine: Json | null
    body: Json | null
    availableYears: number[]
    catalogModels: string[]
    error: string | null
  }
  meter: {
    status: 'FOUND' | 'NOT FOUND'
    vehicleId: string | null
    make: string | null
    model: string | null
    year: number | null
    error: string | null
  }
}

function printTable(rows: ReportRow[]): void {
  const headers = ['Velocity slug', 'CarAPI trim found / NOT FOUND', 'Meter veh_… id', 'Meter make/model/year used']
  const body = rows.map((row) => {
    const carapi = row.carApi.status === 'FOUND'
      ? `${row.carApi.trimFound ?? ''} (id ${row.carApi.trimId ?? '?'}, MSRP ${row.carApi.msrp ?? 'null'})`
      : `NOT FOUND${row.carApi.error ? ` — ${row.carApi.error}` : ''}`
    const meter = row.meter.status === 'FOUND'
      ? `${row.meter.vehicleId} -> ${row.meter.make} ${row.meter.model} ${row.meter.year}`
      : `NOT FOUND${row.meter.error ? ` — ${row.meter.error}` : ''}`
    return [row.slug, carapi, row.meter.vehicleId ?? 'NOT FOUND', meter]
  })
  const widths = headers.map((_, index) => Math.max(headers[index].length, ...body.map((cells) => cells[index].length)))
  const rule = widths.map((width) => '-'.repeat(width)).join('-+-')
  const format = (cells: string[]) => cells.map((cell, index) => cell.padEnd(widths[index])).join(' | ')
  console.log(format(headers))
  console.log(rule)
  for (const cells of body) console.log(format(cells))
}

interface ImageInfo {
  format: 'png' | 'webp'
  width: number
  height: number
  alpha: boolean
}

function inspectImage(bytes: Buffer): ImageInfo {
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  if (bytes.length >= 24 && bytes.subarray(0, 8).equals(pngSignature)) {
    const width = bytes.readUInt32BE(16)
    const height = bytes.readUInt32BE(20)
    const colorType = bytes[25]
    let alpha = colorType === 4 || colorType === 6
    let offset = 8
    while (offset + 12 <= bytes.length) {
      const length = bytes.readUInt32BE(offset)
      const type = bytes.toString('ascii', offset + 4, offset + 8)
      if (type === 'tRNS') alpha = true
      if (length > bytes.length - offset - 12) break
      offset += 12 + length
      if (type === 'IEND') break
    }
    return { format: 'png', width, height, alpha }
  }

  if (bytes.length >= 16 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP') {
    let alpha = false
    let width = 0
    let height = 0
    let offset = 12
    while (offset + 8 <= bytes.length) {
      const type = bytes.toString('ascii', offset, offset + 4)
      const size = bytes.readUInt32LE(offset + 4)
      const data = bytes.subarray(offset + 8, offset + 8 + size)
      if (type === 'VP8X' && data.length >= 10) {
        alpha = (data[0] & 0x10) !== 0
        width = 1 + data.readUIntLE(4, 3)
        height = 1 + data.readUIntLE(7, 3)
      } else if (type === 'ALPH') {
        alpha = true
      } else if (type === 'VP8L' && data.length >= 5 && data[0] === 0x2f) {
        const bits = data.readUInt32LE(1)
        width = (bits & 0x3fff) + 1
        height = ((bits >> 14) & 0x3fff) + 1
        alpha = ((bits >> 28) & 1) === 1
      } else if (type === 'VP8 ' && data.length >= 10) {
        width = data.readUInt16LE(6) & 0x3fff
        height = data.readUInt16LE(8) & 0x3fff
      }
      if (size > bytes.length - offset - 8) break
      offset += 8 + size + (size % 2)
    }
    return { format: 'webp', width, height, alpha }
  }

  return { format: 'png', width: 0, height: 0, alpha: false }
}

async function downloadMeterImage(entry: (typeof METER_IMAGES)[number], apiKey: string): Promise<{ bytes: Buffer; used: string | null; included: string | null; source: string | null }> {
  const url = new URL(`${METER_BASE}/images/car`)
  url.searchParams.set('vehicle', entry.vehicleId)
  url.searchParams.set('view', 'front-3-4')
  url.searchParams.set('color', entry.color)
  url.searchParams.set('format', 'png')

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(180000),
    })
    if (response.status === 402) throw new Error('STOP: Meter plan limit hit (HTTP 402)')
    if (response.status === 429) throw new Error('STOP: Meter rate limit hit (HTTP 429)')
    if (!response.ok) {
      if (attempt < 2) {
        await sleep(5000)
        continue
      }
      throw new Error(`Meter image download failed: HTTP ${response.status}`)
    }
    const contentType = response.headers.get('content-type') ?? ''
    if (!contentType.toLowerCase().startsWith('image/')) {
      throw new Error(`Meter returned non-image content-type: ${contentType}`)
    }
    const bytes = Buffer.from(await response.arrayBuffer())
    return {
      bytes,
      used: response.headers.get('X-Vehicle-Images-Used'),
      included: response.headers.get('X-Vehicle-Images-Included'),
      source: response.headers.get('X-Image-Source'),
    }
  }
  throw new Error('Meter image download failed after retries')
}

interface Gate2Image {
  slug: string
  vehicleId: string
  format: 'png' | 'webp'
  width: number
  height: number
  alpha: boolean
  stagingPath: string
  r2Key?: string
  r2Url?: string
}

function updateReportGate2(images: Gate2Image[]): void {
  let report: Json = {}
  if (existsSync(REPORT_PATH)) {
    report = JSON.parse(readFileSync(REPORT_PATH, 'utf8')) as Json
  }
  report.gate2 = {
    verifiedAt: new Date().toISOString(),
    gate: 'width >= 1024, alpha required, native size preserved',
    r2PublicUrl: R2_PUBLIC_URL,
    images,
  }
  mkdirSync(dirname(REPORT_PATH), { recursive: true })
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')
}

async function runDownload(): Promise<void> {
  const env = loadEnv()
  const images: Gate2Image[] = []
  console.log('Gate 2 — downloading 11 Meter primary images')
  for (const entry of METER_IMAGES) {
    const directory = join(STAGING_DIR, entry.slug)
    mkdirSync(directory, { recursive: true })
    const existingPng = join(directory, 'primary.png')
    const existingWebp = join(directory, 'primary.webp')
    let bytes: Buffer | null = null
    let charge = ''
    let from = ''
    if (existsSync(existingPng)) bytes = readFileSync(existingPng)
    else if (existsSync(existingWebp)) bytes = readFileSync(existingWebp)
    if (bytes) {
      charge = ' reused=staged'
    } else {
      const result = await downloadMeterImage(entry, env.CAR_IMAGE_API_KEY)
      bytes = result.bytes
      charge = result.used ? ` used=${result.used}/${result.included ?? '?'}` : ''
      from = result.source ? ` source=${result.source}` : ''
    }

    const info = inspectImage(bytes)
    if (info.format === 'png' && info.width === 0) {
      throw new Error(`STOP: ${entry.slug} is not a valid PNG or WebP`)
    }
    if (info.width < 1024) {
      throw new Error(`STOP: ${entry.slug} width ${info.width}px is below 1024px`)
    }
    if (!info.alpha) {
      throw new Error(`STOP: ${entry.slug} has no transparency`)
    }
    const path = join(directory, `primary.${info.format}`)
    if (!existsSync(path)) writeFileSync(path, bytes)
    images.push({
      slug: entry.slug,
      vehicleId: entry.vehicleId,
      format: info.format,
      width: info.width,
      height: info.height,
      alpha: info.alpha,
      stagingPath: path,
    })
    console.log(`${entry.slug} | ${info.format} | ${info.width}x${info.height} | alpha=yes | ${path}${charge}${from}`)
  }
  updateReportGate2(images)
  console.log('Gate 2 download+verify complete. 11/11 OK.')
}

function r2Key(entry: (typeof METER_IMAGES)[number], extension: string): string {
  return `vehicles/${entry.makeSlug}/${entry.slug}/primary.${extension}`
}

function runUpload(): Promise<void> {
  const urls: string[] = []
  let report: Json = {}
  if (existsSync(REPORT_PATH)) report = JSON.parse(readFileSync(REPORT_PATH, 'utf8')) as Json
  const recorded: Gate2Image[] = Array.isArray(report?.gate2?.images) ? report.gate2.images : []

  for (const entry of METER_IMAGES) {
    const extension = existsSync(join(STAGING_DIR, entry.slug, 'primary.webp')) ? 'webp' : 'png'
    const local = join(STAGING_DIR, entry.slug, `primary.${extension}`)
    if (!existsSync(local)) throw new Error(`STOP: missing staged file ${local}`)
    const info = inspectImage(readFileSync(local))
    const key = r2Key(entry, extension)
    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
    const result = spawnSync(
      npx,
      ['wrangler', 'r2', 'object', 'put', `velocity-images/${key}`, '--file', local, '--content-type', `image/${extension}`, '--remote', '-y'],
      {
        cwd: ROOT,
        env: { ...process.env, CLOUDFLARE_ACCOUNT_ID },
        encoding: 'utf8',
        shell: process.platform === 'win32',
      },
    )
    if (result.status !== 0) {
      throw new Error(`R2 upload failed for ${entry.slug}: ${(result.stderr || result.stdout || '').trim().slice(0, 400)}`)
    }
    const url = `${R2_PUBLIC_URL}/${key}`
    urls.push(url)
    const row = recorded.find((image) => image.slug === entry.slug)
    if (row) {
      row.r2Key = key
      row.r2Url = url
    }
    console.log(`${url} | ${info.width}x${info.height}`)
  }
  writeFileSync(join(ROOT, 'scripts', 'r2-urls.txt'), `${urls.join('\n')}\n`, 'utf8')
  updateReportGate2(recorded.length === 11 ? recorded : METER_IMAGES.map((entry) => ({
    slug: entry.slug,
    vehicleId: entry.vehicleId,
    format: 'png',
    width: inspectImage(readFileSync(join(STAGING_DIR, entry.slug, 'primary.png'))).width,
    height: inspectImage(readFileSync(join(STAGING_DIR, entry.slug, 'primary.png'))).height,
    alpha: true,
    stagingPath: join(STAGING_DIR, entry.slug, 'primary.png'),
    r2Key: r2Key(entry, 'png'),
    r2Url: `${R2_PUBLIC_URL}/${r2Key(entry, 'png')}`,
  })))
  console.log(`Gate 2 upload complete. ${urls.length}/11 R2 objects.`)
  return Promise.resolve()
}

async function runResolve(): Promise<void> {
  const env = loadEnv()
  const jwt = await carApiLogin(env.CARAPI_TOKEN, env.CARAPI_SECRET)

  const rows: ReportRow[] = []
  for (const car of CARS) {
    const [carApi, meter] = await Promise.all([
      resolveCarApi(car, jwt),
      resolveMeter(car, env.CAR_IMAGE_API_KEY),
    ])
    rows.push({
      slug: car.slug,
      make: car.make,
      model: car.model,
      year: car.year,
      color: car.color,
      category: car.category,
      featured: car.featured,
      priceRule: 'a-msrp',
      carApi: {
        status: carApi.trimId && carApi.trim ? 'FOUND' : 'NOT FOUND',
        trimFound: carApi.trim,
        trimId: carApi.trimId,
        msrp: carApi.msrp,
        modelFound: carApi.model,
        modelId: carApi.modelId,
        engine: carApi.engine,
        body: carApi.body,
        availableYears: carApi.availableYears,
        catalogModels: carApi.catalogModels,
        error: carApi.error,
      },
      meter: {
        status: meter.vehicleId ? 'FOUND' : 'NOT FOUND',
        vehicleId: meter.vehicleId,
        make: meter.make,
        model: meter.model,
        year: meter.year,
        error: meter.error,
      },
    })
    console.error(`resolved ${car.slug}`)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    gate: 1,
    priceRule: 'a-msrp',
    freePlanOnly: true,
    carApiCalls,
    rows,
  }
  mkdirSync(dirname(REPORT_PATH), { recursive: true })
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  console.log('')
  printTable(rows)
  console.log('')
  console.log(`CarAPI calls made: ${carApiCalls}`)
  console.log(`Report: ${REPORT_PATH}`)
}

const NHTSA_MODEL: Record<string, string> = {
  'porsche-911-carrera': '911',
  'porsche-911-gt3': '911',
  'mercedes-s-class': 'S-Class',
  'bmw-m4': 'M4',
  'bmw-x7': 'X7',
  'ferrari-sf90': 'SF90',
  'lamborghini-huracan': 'Huracan',
  'audi-rs7': 'RS 7',
  'toyota-land-cruiser': 'Land Cruiser',
  'lexus-lx': 'LX',
  'mclaren-750s': '750S',
}

const VARIANT: Record<string, string | null> = {
  'porsche-911-carrera': 'Carrera',
  'porsche-911-gt3': 'GT3',
}

const CATEGORY_SLUG: Record<string, string> = {
  'Supercars': 'supercars',
  'Sports Cars': 'sports-cars',
  'Luxury SUVs': 'luxury-suvs',
  'Luxury Sedans': 'luxury-sedans',
}

const CATEGORY_IMAGE: Record<string, string> = {
  supercars: '/images/categories/supercars.jpg',
  'sports-cars': '/images/categories/sports-cars.jpg',
  'luxury-suvs': '/images/categories/luxury-suvs.jpg',
  'luxury-sedans': '/images/categories/luxury-sedans.jpg',
}

const CATEGORY_SORT: Record<string, number> = {
  supercars: 1,
  'sports-cars': 2,
  'luxury-sedans': 3,
  'luxury-suvs': 4,
}

interface ManufacturerSpec {
  horsepower: number | null
  torque: number | null
  engine_capacity: string | null
  transmission: string | null
  fuel_type: string | null
  drivetrain: string | null
  acceleration: string | null
  top_speed: string | null
  source: string
  raw: Record<string, string>
}

const MANUFACTURER_SPECS: Record<string, ManufacturerSpec> = {
  'audi-rs7': {
    horsepower: 592,
    torque: 800,
    engine_capacity: '3996 cc',
    transmission: '8-speed',
    fuel_type: null,
    drivetrain: 'quattro permanent all-wheel drive',
    acceleration: null,
    top_speed: null,
    source: 'https://www.audi.com/en/search?query=RS+7+Sportback+TFSI+%28441+kW%29&order=relevance&filter=on',
    raw: { horsepower: '600 PS (441 kW)', torque: '800 Nm', engine: '3996 cc', transmission: '8-speed', drivetrain: 'quattro permanent all-wheel drive with self-locking centre differential' },
  },
  'toyota-land-cruiser': {
    horsepower: 326,
    torque: 630,
    engine_capacity: '2.4-litre turbo-charged',
    transmission: 'eight-speed automatic',
    fuel_type: 'i-FORCE MAX hybrid',
    drivetrain: 'Full-time four-wheel drive',
    acceleration: null,
    top_speed: null,
    source: 'https://pressroom.toyota.com/the-evolution-of-a-legend-the-all-new-2024-land-cruiser/',
    raw: { horsepower: '326 hp', torque: '465 lb-ft', engine: '2.4-litre turbo-charged', transmission: 'eight-speed automatic', fuel: 'i-FORCE MAX hybrid; EPA 23 MPG combined', drivetrain: 'Full-time four-wheel drive' },
  },
  'lexus-lx': {
    horsepower: 409,
    torque: 650,
    engine_capacity: '3445 cm³',
    transmission: 'AUTOMATIC (AJA0F)',
    fuel_type: 'Premium required, 95 octane',
    drivetrain: null,
    acceleration: null,
    top_speed: '209 km/h',
    source: 'https://pressroom.lexus.com/vehicle/2024-lexus-lx/',
    raw: { horsepower: '409 hp', torque: '650 Nm', engine: '3445 cm3 (210.23 cu.in.)', transmission: 'AUTOMATIC (AJA0F)', fuel: 'Premium required; 95 or more (octane)', top_speed: '130 mph', acceleration: '0-60 mph 6.9 s (not converted)' },
  },
}

function sql(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return 'NULL'
  if (typeof value === 'number') return String(value)
  return `'${String(value).replace(/'/g, "''")}'`
}

function runSql(): Promise<void> {
  const report = JSON.parse(readFileSync(REPORT_PATH, 'utf8')) as Json
  const images: Gate2Image[] = Array.isArray(report?.gate2?.images) ? report.gate2.images : []
  if (images.length !== 11) throw new Error('STOP: gate2 report must contain 11 images')
  const imageBySlug = new Map(images.map((image) => [image.slug, image]))
  const description = 'Price on enquiry — owner to set in admin'
  const lines: string[] = [
    '-- Velocity catalog seed — local D1 only. Generated by scripts/seed-velocity.ts --sql.',
    '-- Scope: exactly 11 vehicles from the confirmed Gate 1 / Gate 2 dataset.',
    '',
  ]

  const manufacturers = [...new Map(CARS.map((car) => [car.make.toLowerCase().replace(/[^a-z0-9]+/g, '-'), car.make])).entries()]
  for (const [slug, name] of manufacturers) {
    lines.push(`INSERT OR IGNORE INTO manufacturers (id, name, slug, logo_url, description, is_active, vehicle_count) VALUES (lower(hex(randomblob(16))), ${sql(name)}, ${sql(slug)}, ${sql(`/images/manufacturers/${slug}.svg`)}, ${sql(`${name} vehicles`)}, 1, 0);`)
  }
  lines.push('')

  for (const [slug, image] of Object.entries(CATEGORY_IMAGE)) {
    const name = Object.entries(CATEGORY_SLUG).find(([, value]) => value === slug)?.[0] ?? slug
    lines.push(`INSERT OR IGNORE INTO vehicle_categories (id, name, slug, image_url, description, sort_order) VALUES (lower(hex(randomblob(16))), ${sql(name)}, ${sql(slug)}, ${sql(image)}, ${sql(`${name} vehicles`)}, ${CATEGORY_SORT[slug] ?? 0});`)
  }
  lines.push('')

  for (const car of CARS) {
    const image = imageBySlug.get(car.slug)
    if (!image?.r2Url) throw new Error(`STOP: missing Gate 2 R2 URL for ${car.slug}`)
    const manufacturerSlug = car.make.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const categorySlug = CATEGORY_SLUG[car.category]
    const model = NHTSA_MODEL[car.slug] ?? car.model
    const variant = VARIANT[car.slug] ?? null
    const alt = `${car.year} ${car.make} ${car.model} — front three-quarter studio view`
    const spec = MANUFACTURER_SPECS[car.slug]
    const updates = [
      `manufacturer_id = (SELECT id FROM manufacturers WHERE slug = ${sql(manufacturerSlug)})`,
      `category_id = (SELECT id FROM vehicle_categories WHERE slug = ${sql(categorySlug)})`,
      `model = ${sql(model)}`,
      `variant = ${sql(variant)}`,
      `year = ${car.year}`,
      `condition = 'new'`,
      `price = 0`,
      `currency = 'USD'`,
      `mileage = NULL`,
      `transmission = ${sql(spec?.transmission)}`,
      `fuel_type = ${sql(spec?.fuel_type)}`,
      `engine_capacity = ${sql(spec?.engine_capacity)}`,
      `horsepower = ${sql(spec?.horsepower)}`,
      `torque = ${sql(spec?.torque)}`,
      `acceleration = ${sql(spec?.acceleration)}`,
      `top_speed = ${sql(spec?.top_speed)}`,
      `drivetrain = ${sql(spec?.drivetrain)}`,
      `exterior_color = ${sql(car.color)}`,
      `interior_color = NULL`,
      `description = ${sql(description)}`,
      `availability = 'available'`,
      `featured = ${car.featured}`,
      `new_arrival = 0`,
      `stock_number = ${sql(`VEL-${car.slug}`)}`,
      `is_demo = 0`,
      `updated_at = datetime('now')`,
    ].join(', ')

    lines.push(`INSERT INTO vehicles (id, manufacturer_id, category_id, model, variant, slug, year, condition, price, currency, mileage, transmission, fuel_type, engine_capacity, horsepower, torque, acceleration, top_speed, drivetrain, exterior_color, interior_color, description, availability, featured, new_arrival, stock_number, is_demo) VALUES (lower(hex(randomblob(16))), (SELECT id FROM manufacturers WHERE slug = ${sql(manufacturerSlug)}), (SELECT id FROM vehicle_categories WHERE slug = ${sql(categorySlug)}), ${sql(model)}, ${sql(variant)}, ${sql(car.slug)}, ${car.year}, 'new', 0, 'USD', NULL, ${sql(spec?.transmission)}, ${sql(spec?.fuel_type)}, ${sql(spec?.engine_capacity)}, ${sql(spec?.horsepower)}, ${sql(spec?.torque)}, ${sql(spec?.acceleration)}, ${sql(spec?.top_speed)}, ${sql(spec?.drivetrain)}, ${sql(car.color)}, NULL, ${sql(description)}, 'available', ${car.featured}, 0, ${sql(`VEL-${car.slug}`)}, 0) ON CONFLICT(slug) DO UPDATE SET ${updates};`)
    lines.push(`DELETE FROM vehicle_images WHERE vehicle_id = (SELECT id FROM vehicles WHERE slug = ${sql(car.slug)});`)
    lines.push(`INSERT INTO vehicle_images (id, vehicle_id, url, alt, sort_order, is_primary) VALUES (lower(hex(randomblob(16))), (SELECT id FROM vehicles WHERE slug = ${sql(car.slug)}), ${sql(image.r2Url)}, ${sql(alt)}, 0, 1);`)
    lines.push(`DELETE FROM vehicle_specifications WHERE vehicle_id = (SELECT id FROM vehicles WHERE slug = ${sql(car.slug)});`)
    if (spec) {
      const eav: Array<[string, string, string | number | null]> = [
        ['Engine', 'engine', spec.engine_capacity],
        ['Engine', 'horsepower', spec.horsepower],
        ['Engine', 'torque', spec.torque],
        ['Performance', 'acceleration', spec.acceleration],
        ['Performance', 'top_speed', spec.top_speed],
        ['Body', 'transmission', spec.transmission],
        ['Body', 'fuel_type', spec.fuel_type],
        ['Body', 'drivetrain', spec.drivetrain],
      ]
      for (const [group, key, value] of eav) {
        if (value === null || value === undefined) continue
        lines.push(`INSERT INTO vehicle_specifications (id, vehicle_id, spec_group, spec_key, spec_value) VALUES (lower(hex(randomblob(16))), (SELECT id FROM vehicles WHERE slug = ${sql(car.slug)}), ${sql(group)}, ${sql(key)}, ${sql(String(value))});`)
      }
    }
    lines.push('')
  }

  lines.push('UPDATE manufacturers SET vehicle_count = (SELECT COUNT(*) FROM vehicles WHERE manufacturer_id = manufacturers.id);')
  lines.push('')
  report.gate4 = {
    appliedAt: new Date().toISOString(),
    status: 'partial specs accepted; 3 cars only',
    conversions: {
      'audi-rs7': '600 PS x 0.986 = 592 horsepower; 465 lb-ft not used; torque 800 Nm retained',
      'toyota-land-cruiser': '465 lb-ft x 1.356 = 630 Nm',
      'lexus-lx': '130 mph x 1.609 = 209 km/h; 0-60 mph NOT converted to 0-100',
    },
    sources: MANUFACTURER_SPECS,
    nullSlugs: CARS.filter((car) => !MANUFACTURER_SPECS[car.slug]).map((car) => car.slug),
  }
  writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const path = join(ROOT, 'scripts', 'seed-velocity.sql')
  writeFileSync(path, lines.join('\n'), 'utf8')
  console.log(`Wrote ${path}`)
  return Promise.resolve()
}

async function main(): Promise<void> {
  if (process.argv.includes('--download-only')) return runDownload()
  if (process.argv.includes('--upload-only')) return runUpload()
  if (process.argv.includes('--sql')) return runSql()
  return runResolve()
}

main().catch((error) => {
  console.error(`FAILED: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
})
