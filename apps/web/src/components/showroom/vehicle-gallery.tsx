'use client'

import * as React from 'react'

interface VehicleGalleryProps {
  images: any[]
  vehicle: any
  manufacturerName?: string
}

export function VehicleGallery({ images, vehicle, manufacturerName }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const displayImages = images.length > 0 ? images : []
  const currentImage = displayImages[currentIndex]

  return (
    <div>
      <div className="relative aspect-[4/3] w-full border border-hairline bg-surface">
        {currentImage?.url ? (
          <img
            src={currentImage.url}
            alt={currentImage.alt || `${manufacturerName || ''} ${vehicle.model} ${vehicle.year}`}
            className="h-full w-full object-contain object-center p-6 sm:p-10"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted">
            Images to be confirmed
          </div>
        )}

        {displayImages.length > 1 && (
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="focus-ring absolute bottom-4 right-4 text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-gold"
          >
            {currentIndex + 1} / {displayImages.length} · View full screen
          </button>
        )}
      </div>

      {displayImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {displayImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={currentIndex === index}
              className={`focus-ring h-16 w-20 shrink-0 border bg-surface p-1 transition-colors duration-300 ${
                currentIndex === index ? 'border-gold' : 'border-hairline hover:border-muted/60'
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}

      {isFullscreen && currentImage?.url && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-ink/95 p-6"
          onClick={() => setIsFullscreen(false)}
          role="presentation"
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="focus-ring absolute right-6 top-6 text-[11px] uppercase tracking-[0.2em] text-muted hover:text-primary"
          >
            Close
          </button>
          <img
            src={currentImage.url}
            alt={currentImage.alt || vehicle.model}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  )
}
