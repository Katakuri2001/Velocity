import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="page-container section-pad text-center">
      <p className="eyebrow">404 — Not found</p>
      <h1 className="mt-6 font-display text-4xl font-normal tracking-[-0.03em] text-primary sm:text-5xl">
        This vehicle is no longer on display.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted">
        It may have been sold or is no longer available. The rest of the collection awaits.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/inventory"
          className="focus-ring inline-flex border border-gold px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:border-goldHover hover:text-goldHover"
        >
          Browse all vehicles
        </Link>
        <Link
          href="/"
          className="focus-ring inline-flex border border-hairline px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:border-gold/60 hover:text-gold"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  )
}
