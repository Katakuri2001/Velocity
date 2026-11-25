/**
 * Presentation-only helpers.
 * Never invents values: prices stay on enquiry, absent specs stay unconfirmed.
 */

export function formatPrice(price: number | null | undefined): string {
  return price && price > 0 ? price.toLocaleString() : 'Price on enquiry'
}

export function formatSpec(value: unknown): string {
  if (value === null || value === undefined) return 'To be confirmed'
  const text = String(value).trim()
  return text.length > 0 ? text : 'To be confirmed'
}
