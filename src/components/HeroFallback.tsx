import { personalInfo, stats } from '../data'
import StatsCard from '../components/StatsCard'
import SocialLinks from '../components/SocialLinks'

const socialLinks = [
  {
    label: 'GitHub',
    href: personalInfo.social.github,
    color: '#24292F',
    glow: 'rgba(36,41,47,0.4)',
    colorDark: '#ffffff',
    glowDark: 'rgba(255,255,255,0.4)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    label: 'LinkedIn',
    href: personalInfo.social.linkedin,
    color: '#0A66C2',
    glow: 'rgba(10,102,194,0.5)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" /></svg>,
  },
  {
    label: 'Instagram',
    href: personalInfo.social.instagram,
    color: '#E4405F',
    glow: 'rgba(228,64,95,0.5)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
]

export default function HeroFallback() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-5 z-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary">
              Hi I Am
            </p>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-left text-balance text-primary"
              style={{ fontFamily: "'Alvera Demo', serif" }}
            >
              Ganesh Prasad<br />Bhandari
            </h1>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent leading-tight">
              Frontend Developer
            </h2>

            <p className="text-base md:text-lg text-secondary max-w-lg leading-relaxed">
              {personalInfo.tagline}
            </p>

            <SocialLinks links={socialLinks} delay={0} />

            <div className="flex flex-wrap gap-3">
              <div className="group/btn relative">
                <a
                  href="#contact"
                  className="relative h-11 px-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-[0.97] shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40"
                >
                  Hire Me
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-y-0.5"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
                </a>
              </div>
              <div className="group/btn relative">
                <a
                  href={personalInfo.resumeUrl}
                  className="relative h-11 px-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 dark:border-white/5 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 active:scale-[0.97] hover:bg-white/[0.08] dark:hover:bg-white/[0.08] hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/btn:translate-y-0.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download CV
                </a>
              </div>
            </div>

            <StatsCard stats={stats} delay={0} />
          </div>

          <div className="hidden lg:flex items-center justify-center h-full">
            <div className="w-full max-w-[696px]">
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute w-[627px] h-[627px] md:w-[765px] md:h-[765px] rounded-full bg-gradient-to-br from-accent/8 via-accent/3 to-transparent blur-2xl" />
                <div className="absolute w-[836px] h-[836px] md:w-[1043px] md:h-[1043px] rounded-full bg-accent/3 blur-[80px]" />
                <div className="relative w-[446px] md:w-[584px]">
                  <picture>
                    <source srcSet="/hero-545.avif" type="image/avif" />
                    <source srcSet="/hero-545.webp" type="image/webp" />
                    <img
                      src="/hero.png"
                      alt={personalInfo.name}
                      width={545}
                      height={800}
                      className="w-full aspect-[3/4] object-contain"
                      fetchPriority="high"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex lg:hidden items-center justify-center mt-10">
          <div className="w-[389px]">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-[389px]">
                <picture>
                  <source srcSet="/hero-545.avif" type="image/avif" />
                  <source srcSet="/hero-545.webp" type="image/webp" />
                  <img
                    src="/hero.png"
                    alt={personalInfo.name}
                    width={545}
                    height={800}
                    className="w-full aspect-[3/4] object-contain"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
