import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-secondaryBg flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">🏎️</span>
      </div>
      <h1 className="font-display text-3xl font-bold text-primaryText mb-4">
        Vehicle not found
      </h1>
      <p className="text-secondaryText font-manrope mb-8 max-w-md mx-auto">
        The vehicle you're looking for may have been sold or is no longer available.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button size="lg" className="w-full sm:w-auto" onClick={() => {}}>
          <Link href="/inventory" className="flex items-center justify-center w-full h-full">
            Browse all vehicles
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => {}}>
          <Link href="/" className="flex items-center justify-center w-full h-full">
            Return to homepage
          </Link>
        </Button>
      </div>
    </div>
  )
}
