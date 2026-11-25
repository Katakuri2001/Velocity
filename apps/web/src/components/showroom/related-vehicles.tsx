import Link from 'next/link'

export function RelatedVehicles({ vehicle }: { vehicle: any }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">Continue exploring</p>
        <h2 className="mt-4 font-display text-3xl font-normal text-primary">More from the collection</h2>
        <p className="mt-3 text-sm text-muted">Similar machines, presented with the same restraint.</p>
      </div>
      <Link
        href="/inventory"
        className="focus-ring w-fit border-b border-hairline pb-1 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:border-gold hover:text-primary"
      >
        View all vehicles
      </Link>
    </div>
  )
}
