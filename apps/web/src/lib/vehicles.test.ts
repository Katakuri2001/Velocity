import { describe, it, expect, beforeEach } from 'vitest'

import { db } from './db'

describe('Vehicle filtering and sorting', () => {
  beforeEach(async () => {
    // Insert test vehicles
    await db.run(
      `INSERT INTO vehicles (id, manufacturer_id, model, slug, year, condition, price, currency, mileage, transmission, fuel_type, horsepower, availability, featured, new_arrival, is_demo, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      ['veh_1', 'man_1', 'Model A', 'model-a', 2024, 'new', 50000, 'USD', 100, 'Automatic', 'Petrol', 300, 'available', 1, 0, 0],
    )
    await db.run(
      `INSERT INTO vehicles (id, manufacturer_id, model, slug, year, condition, price, currency, mileage, transmission, fuel_type, horsepower, availability, featured, new_arrival, is_demo, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      ['veh_2', 'man_1', 'Model B', 'model-b', 2023, 'used', 35000, 'USD', 5000, 'Manual', 'Diesel', 200, 'available', 0, 1, 0],
    )
    await db.run(
      `INSERT INTO vehicles (id, manufacturer_id, model, slug, year, condition, price, currency, mileage, transmission, fuel_type, horsepower, availability, featured, new_arrival, is_demo, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      ['veh_3', 'man_2', 'Model C', 'model-c', 2024, 'used', 80000, 'USD', 200, 'Automatic', 'Electric', 400, 'sold', 0, 0, 0],
    )
  })

  it('filters by availability', async () => {
    const available = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 AND availability = 'available'",
    )
    expect(available.rows.length).toBe(2)
    expect(available.rows.map((r) => r.model)).toContain('Model A')
    expect(available.rows.map((r) => r.model)).toContain('Model B')
  })

  it('filters by manufacturer', async () => {
    const man1 = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 AND manufacturer_id = 'man_1'",
    )
    expect(man1.rows.length).toBe(2)
  })

  it('filters by price range', async () => {
    const cheap = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 AND price <= 40000",
    )
    expect(cheap.rows.length).toBe(1)
    expect(cheap.rows[0].model).toBe('Model B')
  })

  it('sorts by price ascending', async () => {
    const sorted = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 AND availability = 'available' ORDER BY price ASC",
    )
    expect(sorted.rows[0].model).toBe('Model B')
    expect(sorted.rows[1].model).toBe('Model A')
  })

  it('sorts by price descending', async () => {
    const sorted = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 AND availability = 'available' ORDER BY price DESC",
    )
    expect(sorted.rows[0].model).toBe('Model A')
    expect(sorted.rows[1].model).toBe('Model B')
  })

  it('filters by fuel type', async () => {
    const electric = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 AND fuel_type = 'Electric'",
    )
    expect(electric.rows.length).toBe(1)
    expect(electric.rows[0].model).toBe('Model C')
  })

  it('returns paginated results', async () => {
    const page1 = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 ORDER BY created_at DESC LIMIT 2 OFFSET 0",
    )
    expect(page1.rows.length).toBe(2)

    const page2 = await db.query<{ model: string }>(
      "SELECT * FROM vehicles WHERE is_demo = 0 ORDER BY created_at DESC LIMIT 2 OFFSET 2",
    )
    expect(page2.rows.length).toBe(1)
  })
})
