'use client'

import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import type { ImageProps } from 'next/image'

interface ImageOptimizerProps extends Omit<ImageProps, 'width' | 'height'> {
  src: string
  alt: string
  priority?: boolean
  className?: string
  placeholder?: 'blur' | 'empty'
  sizes?: string
}

export function ImageOptimizer({
  src,
  alt,
  priority = false,
  className = '',
  placeholder = 'empty',
  sizes,
  ...props
}: ImageOptimizerProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      placeholder={placeholder}
      sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
      className={`object-cover object-center ${className}`}
      {...props}
    />
  )
}

export function ImageOptimizerSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-secondaryBg rounded ${className}`}>
      <Skeleton className="absolute inset-0 h-full w-full" />
    </div>
  )
}
