/**
 * Database adapter interface.
 *
 * Local implementation: in-memory store (no native compilation).
 * Production: swap to Cloudflare D1 binding — same method signatures.
 */

export type QueryResult<T = unknown> = {
  rows: T[]
  rowCount: number
}

export type RunResult = {
  lastInsertRowid?: string
  changes: number
}

export interface DatabaseAdapter {
  query<T = unknown>(sql: string, params?: unknown[]): Promise<QueryResult<T>>
  run(sql: string, params?: unknown[]): Promise<RunResult>
  get<T = unknown>(sql: string, params?: unknown[]): Promise<T | null>
}

/**
 * In-memory database adapter for local development.
 * Implements the same interface as the future D1 adapter.
 */
class InMemoryDatabase implements DatabaseAdapter {
  private tables: Map<string, Map<string, unknown>> = new Map()
  private autoIndex: Map<string, number> = new Map()

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<QueryResult<T>> {
    const normalized = sql.trim()
    const lower = normalized.toLowerCase()

    if (lower.startsWith('select')) {
      return this.select<T>(normalized, params)
    }
    return { rows: [], rowCount: 0 }
  }

  async run(sql: string, params: unknown[] = []): Promise<RunResult> {
    const normalized = sql.trim()
    const lower = normalized.toLowerCase()

    if (lower.startsWith('insert into')) {
      return this.insert(normalized, params)
    }
    if (lower.startsWith('update')) {
      return this.update(normalized, params)
    }
    if (lower.startsWith('delete from')) {
      return this.delete(normalized, params)
    }
    return { changes: 0 }
  }

  async get<T = unknown>(sql: string, params: unknown[] = []): Promise<T | null> {
    const result = await this.query<T>(sql, params)
    return result.rows.length > 0 ? result.rows[0] : null
  }

  // --- internal helpers ---

  private table(name: string): Map<string, unknown> {
    if (!this.tables.has(name)) {
      this.tables.set(name, new Map())
    }
    return this.tables.get(name)!
  }

  private select<T = unknown>(sql: string, params: unknown[]): QueryResult<T> {
    // Very lightweight SELECT parser
    const fromMatch = sql.match(/FROM\s+(\w+)/i)
    if (!fromMatch) return { rows: [], rowCount: 0 }

    const tableName = fromMatch[1]
    const rows = Array.from(this.table(tableName).values()) as unknown[]

    // Simple WHERE col = ? or col = literal or col IN (?, ?) support
    // Supports multiple conditions joined by AND
    const whereMatch = sql.match(/WHERE\s+(.+)/i)
    let filtered = rows
    if (whereMatch) {
      const whereClause = whereMatch[1]
      const conditions = whereClause.split(/\s+AND\s+/i)

      for (const condition of conditions) {
        const trimmed = condition.trim()

        // Match: col = ?  OR  col = 'literal'  OR  col = 123
        const eqMatch = trimmed.match(/(\w+)\s*=\s*(?:'([^']*)'|(\d+)|(?:\?))/)
        if (eqMatch) {
          const col = eqMatch[1]
          const val = eqMatch[2] !== undefined ? eqMatch[2] : eqMatch[3] !== undefined ? Number(eqMatch[3]) : (params[0] as any)
          filtered = filtered.filter((r: any) => r[col] === val)
          continue
        }

        // Match: col IN (?, ?)
        const inMatch = trimmed.match(/(\w+)\s+IN\s*\(([^)]+)\)/i)
        if (inMatch) {
          const col = inMatch[1]
          const vals = inMatch[2].split(',').map((v) => v.trim().replace(/^'|'$/g, ''))
          filtered = filtered.filter((r: any) => vals.includes(String(r[col])))
          continue
        }

        // Match: col > ? or col >= ? or col < ? or col <= ?
        const rangeMatch = trimmed.match(/(\w+)\s*(>=|<=|>|<)\s*(?:'([^']*)'|(\d+)|(?:\?))/)
        if (rangeMatch) {
          const col = rangeMatch[1]
          const op = rangeMatch[2]
          const val = rangeMatch[3] !== undefined ? rangeMatch[3] : rangeMatch[4] !== undefined ? Number(rangeMatch[4]) : (params[0] as any)
          const numVal = typeof val === 'string' ? Number(val) : (val as number)
          filtered = filtered.filter((r: any) => {
            const rv = r[col]
            const numRv = typeof rv === 'string' ? Number(rv) : rv
            switch (op) {
              case '>=': return numRv >= numVal
              case '<=': return numRv <= numVal
              case '>': return numRv > numVal
              case '<': return numRv < numVal
              default: return true
            }
          })
          continue
        }
      }
    }

    // Apply ORDER BY
    const orderMatch = sql.match(/ORDER\s+BY\s+(\w+)\s+(ASC|DESC)/i)
    if (orderMatch) {
      const col = orderMatch[1]
      const dir = orderMatch[2].toUpperCase()
      filtered.sort((a: any, b: any) => {
        const av = a[col]
        const bv = b[col]
        if (av === bv) return 0
        if (av == null) return dir === 'ASC' ? 1 : -1
        if (bv == null) return dir === 'ASC' ? -1 : 1
        return dir === 'ASC' ? (av < bv ? -1 : 1) : (av > bv ? -1 : 1)
      })
    }

    // Apply LIMIT and OFFSET
    const limitMatch = sql.match(/LIMIT\s+(\d+)/i)
    const offsetMatch = sql.match(/OFFSET\s+(\d+)/i)
    if (limitMatch) {
      const limit = parseInt(limitMatch[1], 10)
      const offset = offsetMatch ? parseInt(offsetMatch[1], 10) : 0
      filtered = filtered.slice(offset, offset + limit)
    }

    return { rows: filtered as T[], rowCount: filtered.length }
  }

  private insert(sql: string, params: unknown[]): RunResult {
    const intoMatch = sql.match(/INTO\s+(\w+)/i)
    if (!intoMatch) return { changes: 0 }

    const tableName = intoMatch[1]
    const valuesMatch = sql.match(/VALUES\s*\((.+)\)/i)
    if (!valuesMatch) return { changes: 0 }

    const placeholders = valuesMatch[1].split(',').map(() => '?')
    const columns = sql
      .match(/\(([^)]+)\)/i)?.[1]
      ?.split(',')
      .map((c) => c.trim()) || []

    const row: Record<string, unknown> = {}
    columns.forEach((col, i) => {
      row[col] = params[i]
    })

    // Only auto-generate id if not provided in params
    if (!row.id) {
      row.id = `id_${Date.now()}_${Math.random().toString(36).slice(2)}`
    }
    this.table(tableName).set(String(row.id), row)

    return { lastInsertRowid: String(row.id), changes: 1 }
  }

  private whereMatchRow(row: Record<string, unknown>, whereClause: string, params: unknown[]): boolean {
    // Match: col = ?  OR  col = 'literal'  OR  col = 123
    const eqMatch = whereClause.match(/(\w+)\s*=\s*(?:'([^']*)'|(\d+)|(?:\?))/)
    if (eqMatch) {
      const col = eqMatch[1]
      const val = eqMatch[2] !== undefined ? eqMatch[2] : eqMatch[3] !== undefined ? Number(eqMatch[3]) : params[0]
      if (row[col] !== val) return false
    }
    return true
  }

  private update(sql: string, params: unknown[]): RunResult {
    const updateMatch = sql.match(/UPDATE\s+(\w+)\s+SET/i)
    if (!updateMatch) return { changes: 0 }

    const tableName = updateMatch[1]
    const rows = this.table(tableName)
    let changes = 0

    for (const [id, row] of Array.from(rows.entries())) {
      const rowAny = row as Record<string, unknown>
      let match = true

      const whereMatch = sql.match(/WHERE\s+(.+)/i)
      if (whereMatch) {
        match = this.whereMatchRow(rowAny, whereMatch[1], params)
      }

      if (match) {
        changes++
      }
    }

    return { changes }
  }

  private delete(sql: string, params: unknown[]): RunResult {
    const fromMatch = sql.match(/FROM\s+(\w+)/i)
    if (!fromMatch) return { changes: 0 }

    const tableName = fromMatch[1]
    const rows = this.table(tableName)
    let changes = 0

    for (const [id, row] of Array.from(rows.entries())) {
      const rowAny = row as Record<string, unknown>
      let match = true

      const whereMatch = sql.match(/WHERE\s+(.+)/i)
      if (whereMatch) {
        match = this.whereMatchRow(rowAny, whereMatch[1], params)
      }

      if (match) {
        rows.delete(id)
        changes++
      }
    }

    return { changes }
  }
}

export const db: DatabaseAdapter = new InMemoryDatabase()
