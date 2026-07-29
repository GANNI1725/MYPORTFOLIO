interface SocialLink {
  label: string
  href: string
  icon: React.ReactNode
  color: string
  glow: string
  colorDark?: string
  glowDark?: string
}

interface SocialLinksProps {
  links: SocialLink[]
  delay?: number
}

export default function SocialLinks({ links, delay = 0 }: SocialLinksProps) {
  return (
    <div
      className="flex gap-3 reveal-up"
      style={{ animationDelay: `${delay}s` }}
    >
      {links.map((social) => (
        <div key={social.label} className="relative group/tooltip">
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center text-secondary transition-all duration-300 hover:scale-110 active:scale-95"
            style={{
              '--social-color': social.color,
              '--social-glow': social.glow,
            } as React.CSSProperties}
            aria-label={social.label}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              const isDark = document.documentElement.classList.contains('dark')
              const c = isDark && social.colorDark ? social.colorDark : social.color
              const g = isDark && social.glowDark ? social.glowDark : social.glow
              el.style.color = c
              el.style.borderColor = c
              el.style.background = `${c}14`
              el.style.boxShadow = `0 0 20px ${g}`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.color = ''
              el.style.borderColor = ''
              el.style.background = ''
              el.style.boxShadow = ''
            }}
          >
            {social.icon}
          </a>
          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-primary opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 border border-[var(--border)] shadow-lg">
            {social.label}
          </span>
        </div>
      ))}
    </div>
  )
}
