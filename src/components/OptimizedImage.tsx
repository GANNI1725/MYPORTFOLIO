import type { CSSProperties, SyntheticEvent } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  webp?: string
  avif?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  decoding?: 'sync' | 'async' | 'auto'
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void
  style?: CSSProperties
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  webp,
  avif,
  loading = 'eager',
  fetchPriority,
  decoding = 'async',
  onError,
  style,
}: OptimizedImageProps) {
  return (
    <picture>
      {avif ? <source type="image/avif" srcSet={avif} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} /> : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        onError={onError}
        style={style}
      />
    </picture>
  )
}