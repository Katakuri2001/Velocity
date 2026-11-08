import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondaryBg border-t glass-border pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Link href="/" className="text-xl font-display font-bold text-primaryText">
              VELOCITY
            </Link>
            <p className="text-secondaryText text-sm mt-2">
              Premium automotive showroom. Discover, explore, compare, enquire.
            </p>
          </div>
          <nav className="flex gap-6 text-sm font-manrope">
            <Link href="/inventory" className="text-secondaryText hover:text-primaryText transition-colors">
              Inventory
            </Link>
            <Link href="/contact" className="text-secondaryText hover:text-primaryText transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <p className="text-[0.75rem] text-secondaryText mt-8 border-t glass-border pt-4">
          Velocity — Demo content. Not real inventory.
        </p>
      </div>
    </footer>
  )
}
