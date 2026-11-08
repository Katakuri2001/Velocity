'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { GlassPanel } from '@/components/ui/glass-panel'
import { Skeleton } from '@/components/ui/skeleton'

interface VehicleGalleryProps {
  images: any[]
  vehicle: any
}

export function VehicleGallery({ images, vehicle }: VehicleGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  const displayImages = images.length > 0 ? images : [{ url: '', alt: 'No image available' }]
  const currentImage = displayImages[currentIndex]

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-[500px] bg-secondaryBg rounded-xl overflow-hidden group cursor-pointer"
        onClick={() => setIsFullscreen(true)}
      >
        <div className="absolute inset-0 bg-white/5">
          {currentImage.url ? (
            <img
              src={currentImage.url}
              alt={currentImage.alt || `${vehicle.model} ${vehicle.year}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>

        {/* Image counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 right-4 glass-panel rounded-lg px-3 py-1">
            <span className="text-xs font-manrope font-medium text-primaryText">
              {currentIndex + 1} / {displayImages.length}
            </span>
          </div>
        )}

        {/* Navigation arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((i) => (i === 0 ? displayImages.length - 1 : i - 1))
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-panel rounded-full p-2 hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
                            <svg className="w-5 h-5 text-primaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((i) => (i === displayImages.length - 1 ? 0 : i + 1))
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-panel rounded-full p-2 hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
                            <svg className="w-5 h-5 text-primaryText" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
            </button>
          </>
        )}
      </motion.div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-accent-electric-blue'
                  : 'border-transparent hover:border-white/30'
              }`}
            >
              {img.url ? (
                <img src={img.url} alt={img.alt || 'Thumbnail'} className="h-full w-full object-cover" />
              ) : (
                <Skeleton className="h-full w-full" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative max-w-[90vw] max-h-[90vh]"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-0 right-0 glass-panel rounded-full p-2 text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={currentImage.url}
                alt={currentImage.alt || `${vehicle.model} ${vehicle.year}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 glass-panel p-4">
              <p className="text-primaryText font-manrope text-lg">{vehicle.model}</p>
              <p className="text-secondaryText text-sm">{vehicle.year}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
