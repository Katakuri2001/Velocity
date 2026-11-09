import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-72">
          <Skeleton className="h-64 w-full rounded-xl bg-secondaryBg" />
        </div>
        <div className="flex-grow">
          <Skeleton className="h-10 w-1/3 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[420px] w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
