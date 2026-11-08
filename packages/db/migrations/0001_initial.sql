-- Migration 0001: Initial schema
-- Creates all 14 entities for the Velocity showroom

-- Roles (RBAC)
CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Users (admin, staff, customer)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role_id TEXT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Manufacturers (extensible without code changes)
CREATE TABLE IF NOT EXISTS manufacturers (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  vehicle_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vehicle categories
CREATE TABLE IF NOT EXISTS vehicle_categories (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vehicles (core entity)
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  manufacturer_id TEXT NOT NULL REFERENCES manufacturers(id) ON DELETE CASCADE,
  category_id TEXT REFERENCES vehicle_categories(id) ON DELETE SET NULL,
  model TEXT NOT NULL,
  variant TEXT,
  slug TEXT NOT NULL UNIQUE,
  year INTEGER NOT NULL,
  condition TEXT NOT NULL DEFAULT 'used',
  price REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  mileage INTEGER,
  transmission TEXT,
  fuel_type TEXT,
  engine_capacity TEXT,
  horsepower INTEGER,
  torque INTEGER,
  acceleration TEXT,
  top_speed TEXT,
  drivetrain TEXT,
  exterior_color TEXT,
  interior_color TEXT,
  description TEXT,
  availability TEXT NOT NULL DEFAULT 'available',
  featured INTEGER NOT NULL DEFAULT 0,
  new_arrival INTEGER NOT NULL DEFAULT 0,
  stock_number TEXT,
  is_demo INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vehicle images (multiple per vehicle)
CREATE TABLE IF NOT EXISTS vehicle_images (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_primary INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vehicle features (library)
CREATE TABLE IF NOT EXISTS vehicle_features (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Vehicle specifications (EAV — flexible key-value per vehicle)
CREATE TABLE IF NOT EXISTS vehicle_specifications (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  spec_group TEXT NOT NULL,
  spec_key TEXT NOT NULL,
  spec_value TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Favorites (user saved vehicles)
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, vehicle_id)
);

-- Enquiries (customer enquiries)
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  vehicle_id TEXT REFERENCES vehicles(id) ON DELETE SET NULL,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_contact TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Test drive requests
CREATE TABLE IF NOT EXISTS test_drive_requests (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  vehicle_id TEXT REFERENCES vehicles(id) ON DELETE SET NULL,
  user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Homepage content (editable sections)
CREATE TABLE IF NOT EXISTS homepage_content (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Showroom settings (global configuration)
CREATE TABLE IF NOT EXISTS showroom_settings (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Audit logs (human-readable activity history)
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_manufacturer ON vehicles(manufacturer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
CREATE INDEX IF NOT EXISTS idx_vehicles_availability ON vehicles(availability);
CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);
CREATE INDEX IF NOT EXISTS idx_vehicles_new_arrival ON vehicles(new_arrival);
CREATE INDEX IF NOT EXISTS idx_vehicles_created_at ON vehicles(created_at);
CREATE INDEX IF NOT EXISTS idx_vehicles_is_demo ON vehicles(is_demo);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle ON vehicle_images(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_vehicle ON enquiries(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_test_drive_vehicle ON test_drive_requests(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_test_drive_status ON test_drive_requests(status);
CREATE INDEX IF NOT EXISTS idx_vehicle_specs_vehicle ON vehicle_specifications(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_manufacturers_slug ON manufacturers(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON vehicle_categories(slug);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
