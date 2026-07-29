interface SectionHeadingProps {
  label: string
  title: React.ReactNode
  subtitle?: string
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <span
        className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4 reveal-up"
        style={{ animationDelay: '0s' }}
      >
        {label}
      </span>
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight reveal-up"
        style={{ animationDelay: '0.05s' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-secondary mt-3 max-w-lg mx-auto reveal-up"
          style={{ animationDelay: '0.1s' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
