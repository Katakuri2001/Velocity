import { describe, it, expect } from 'vitest'
import { db } from './db'

describe('InMemoryDatabase adapter', () => {
  it('initializes and returns empty rows for unknown table', async () => {
    const result = await db.query('SELECT * FROM roles')
    expect(result.rows).toEqual([])
    expect(result.rowCount).toBe(0)
  })

  it('inserts and retrieves a row', async () => {
    await db.run(
      "INSERT INTO roles (id, name, description) VALUES (?, ?, ?)",
      ['role_admin', 'admin', 'Full access'],
    )

    const role = await db.get<{ id: string; name: string; description?: string }>(
      'SELECT id, name FROM roles WHERE id = ?',
      ['role_admin'],
    )
    expect(role?.id).toBe('role_admin')
    expect(role?.name).toBe('admin')
  })

  it('returns null when no row matches', async () => {
    const role = await db.get<{ id: string }>(
      'SELECT id FROM roles WHERE id = ?',
      ['nonexistent'],
    )
    expect(role).toBeNull()
  })

  it('filters by is_demo', async () => {
    await db.run(
      "INSERT INTO vehicles (id, manufacturer_id, model, slug, year, price, is_demo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['veh_demo_1', 'man_1', 'Demo Car', 'demo-car', 2024, 99999, 1],
    )
    await db.run(
      "INSERT INTO vehicles (id, manufacturer_id, model, slug, year, price, is_demo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['veh_real_1', 'man_1', 'Real Car', 'real-car', 2023, 88888, 0],
    )

    const demos = await db.query<{ is_demo: number; model: string }>('SELECT * FROM vehicles WHERE is_demo = 1')
    expect(demos.rows.length).toBe(1)
    expect(demos.rows[0].model).toBe('Demo Car')

    const nonDemos = await db.query<{ is_demo: number; model: string }>('SELECT * FROM vehicles WHERE is_demo = 0')
    expect(nonDemos.rows.length).toBe(1)
    expect(nonDemos.rows[0].model).toBe('Real Car')
  })
})
