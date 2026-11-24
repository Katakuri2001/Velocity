import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-glassBorder bg-secondaryBg/60">
      <div className="page-container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <Link href="/" className="focus-ring rounded text-lg font-display font-bold tracking-[0.18em] text-primaryText">
            VELOCITY
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed font-manrope text-secondaryText">
            A private showroom for exceptional machines. Discover, compare, and enquire.
          </p>
        </div>

        <div>
          <p className="text-[0.65rem] font-manrope uppercase tracking-[0.28em] text-accentChampagne">Explore</p>
          <nav className="mt-4 flex flex-col gap-3 text-sm font-manrope">
            <Link href="/inventory" className="focus-ring text-secondaryText transition-colors hover:text-primaryText">
              Inventory
            </Link>
            <Link href="/compare" className="focus-ring text-secondaryText transition-colors hover:text-primaryText">
              Compare
            </Link>
            <Link href="/favorites" className="focus-ring text-secondaryText transition-colors hover:text-primaryText">
              Favorites
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-[0.65rem] font-manrope uppercase tracking-[0.28em] text-accentChampagne">Contact</p>
          <Link href="/contact" className="focus-ring mt-4 inline-block text-sm font-manrope text-secondaryText transition-colors hover:text-primaryText">
            Speak with the showroom
          </Link>
          <p className="mt-4 text-xs font-manrope text-secondaryText">Demo content. Not real inventory.</p>
        </div>
      </div>
    </footer>
  )
}
