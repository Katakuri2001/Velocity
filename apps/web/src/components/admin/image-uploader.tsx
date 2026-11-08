'use client'

import * as React from 'react'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  accept?: string
  multiple?: boolean
  className?: string
}

export function ImageUploader({ onUpload, accept = 'image/*', multiple = false, className }: ImageUploaderProps) {
  const [isDragActive, setIsDragActive] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragActive(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFiles = (files: FileList | File[]) => {
    const fileList = Array.from(files)
    if (multiple) {
      fileList.forEach((file) => uploadFile(file))
    } else if (fileList.length > 0) {
      uploadFile(fileList[0])
    }
  }

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        onUpload(data.url)
      } else {
        const err = await res.json()
        alert(err.error || 'Upload failed')
      }
    } catch {
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragActive(true) }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragActive(false) }}
      onDrop={handleDrop}
      className={React.useMemo(
        () => `
          border-2 border-dashed rounded-xl p-6 text-center transition-colors
          ${isDragActive ? 'border-accent-electric-blue bg-white/10' : 'border-white/10 hover:border-white/30'}
          ${className || ''}
        `.trim(),
        [isDragActive, className],
      )}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files)
        }}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5">
          <span className="text-xl">📷</span>
        </div>
        <p className="text-sm font-manrope text-secondaryText">
          {isDragActive ? 'Drop images here' : 'Click to upload or drag and drop'}
        </p>
        <p className="text-xs text-secondaryText">
          JPEG, PNG, WebP • Max 5MB
        </p>
      </div>
      {uploading && (
        <div className="animate-pulse h-2 w-24 bg-white/10 rounded-full mt-4" />
      )}
    </div>
  )
}
