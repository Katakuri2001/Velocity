import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink">
      <div className="page-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <Link
              href="/"
              className="focus-ring font-display text-2xl font-medium tracking-[0.22em] text-primary transition-colors duration-300 hover:text-gold"
            >
              VELOCITY
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A private showroom for exceptional machines. Discover, compare and enquire at your own pace.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <nav className="mt-6 flex flex-col gap-4" aria-label="Footer navigation">
              <Link href="/inventory" className="focus-ring w-fit text-sm text-muted transition-colors duration-300 hover:text-primary">
                Inventory
              </Link>
              <Link href="/compare" className="focus-ring w-fit text-sm text-muted transition-colors duration-300 hover:text-primary">
                Compare
              </Link>
              <Link href="/favorites" className="focus-ring w-fit text-sm text-muted transition-colors duration-300 hover:text-primary">
                Favorites
              </Link>
            </nav>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Contact</p>
            <Link href="/contact" className="focus-ring mt-6 inline-block text-sm text-muted transition-colors duration-300 hover:text-primary">
              Speak with the showroom
            </Link>
            <p className="mt-6 text-xs text-muted/80">Demo content. Not real inventory.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 text-[11px] uppercase tracking-[0.2em] text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <span>Velocity — Premium Automotive Showroom</span>
          <span>Price on enquiry</span>
        </div>
      </div>
    </footer>
  )
}
