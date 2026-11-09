import dynamicNext from 'next/dynamic'

const FavoritesContent = dynamicNext(
  () => import('./favorites-content'),
  { ssr: false, loading: () => <div className="min-h-[600px] flex items-center justify-center" /> },
)

export const dynamic = 'force-dynamic'

export default function FavoritesPage() {
  return <FavoritesContent />
}
