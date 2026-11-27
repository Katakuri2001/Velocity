/** Display names for the local preview catalog. UI only — no data or API changes. */
const NAMES: Record<string, string> = {
  man_porsche: 'Porsche',
  man_mercedes: 'Mercedes-Benz',
  man_bmw: 'BMW',
  man_ferrari: 'Ferrari',
  man_lamborghini: 'Lamborghini',
  man_audi: 'Audi',
  man_toyota: 'Toyota',
  man_lexus: 'Lexus',
  man_mclaren: 'McLaren',
}

export function manufacturerName(id?: string | null): string {
  if (!id) return 'Manufacturer'
  if (NAMES[id]) return NAMES[id]
  const slug = id.replace(/^man_/, '')
  if (!slug) return 'Manufacturer'
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}
