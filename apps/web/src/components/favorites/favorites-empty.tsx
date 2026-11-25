'use client'

import Link from 'next/link'

export function FavoritesEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center md:py-20">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-glassBorder bg-white/5 text-2xl text-accentChampagne">
        ♡
      </div>
      <h2 className="font-display text-2xl font-bold text-primaryText">No favorites yet</h2>
      <p className="mt-4 max-w-md font-manrope text-secondaryText">
        Save vehicles you love by clicking the heart icon on any vehicle card.
      </p>
      <Link
        href="/inventory"
        className="focus-ring mt-8 inline-flex rounded-xl bg-accentChampagne px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#241a0c] transition-colors hover:bg-[#e8cfa5]"
      >
        Browse inventory
      </Link>
    </div>
  )
}
