import dynamicNext from 'next/dynamic'

const CompareContent = dynamicNext(
  () => import('./compare-content'),
  { ssr: false, loading: () => <div className="min-h-[600px] flex items-center justify-center" /> },
)

export const dynamic = 'force-dynamic'

export default function ComparePage() {
  return <CompareContent />
}
