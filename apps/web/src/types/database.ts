export type Role = {
  id: string
  name: string
  description?: string
  created_at: string
}

export type User = {
  id: string
  email: string
  password_hash: string
  role_id: string
  is_active: number
  created_at: string
  updated_at: string
}

export type Manufacturer = {
  id: string
  name: string
  slug: string
  logo_url?: string
  description?: string
  is_active: number
  vehicle_count: number
  created_at: string
  updated_at: string
}

export type VehicleCategory = {
  id: string
  name: string
  slug: string
  image_url?: string
  description?: string
  sort_order: number
  created_at: string
}

export type Vehicle = {
  id: string
  manufacturer_id: string
  category_id?: string
  model: string
  variant?: string
  slug: string
  year: number
  condition: string
  price: number
  currency: string
  mileage?: number
  transmission?: string
  fuel_type?: string
  engine_capacity?: string
  horsepower?: number
  torque?: number
  acceleration?: string
  top_speed?: string
  drivetrain?: string
  exterior_color?: string
  interior_color?: string
  description?: string
  availability: string
  featured: number
  new_arrival: number
  stock_number?: string
  is_demo: number
  created_at: string
  updated_at: string
}

export type VehicleImage = {
  id: string
  vehicle_id: string
  url: string
  alt?: string
  sort_order: number
  is_primary: number
  created_at: string
}

export type VehicleFeature = {
  id: string
  name: string
  category: string
  created_at: string
}

export type VehicleSpecification = {
  id: string
  vehicle_id: string
  spec_group: string
  spec_key: string
  spec_value: string
  created_at: string
}

export type Favorite = {
  id: string
  user_id: string
  vehicle_id: string
  created_at: string
}

export type Enquiry = {
  id: string
  vehicle_id?: string
  user_id?: string
  name: string
  email: string
  phone?: string
  preferred_contact?: string
  message: string
  status: string
  created_at: string
  updated_at: string
}

export type TestDriveRequest = {
  id: string
  vehicle_id?: string
  user_id?: string
  name: string
  email: string
  phone?: string
  preferred_date: string
  preferred_time: string
  status: string
  created_at: string
  updated_at: string
}

export type HomepageContent = {
  id: string
  section_key: string
  title?: string
  subtitle?: string
  content?: string
  is_active: number
  updated_at: string
}

export type ShowroomSetting = {
  id: string
  key: string
  value?: string
  updated_at: string
}

export type AuditLog = {
  id: string
  actor: string
  action: string
  entity_type: string
  entity_id?: string
  details?: string
  created_at: string
}
