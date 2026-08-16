import OptimizedImage from './OptimizedImage'

export default function Logo() {
  return (
    <span className="inline-flex items-center">
      <OptimizedImage
        src="/logo.png"
        webp="/logo.webp"
        alt="GPB"
        width="72"
        height="32"
        className="h-8 w-auto"
      />
    </span>
  )
}
