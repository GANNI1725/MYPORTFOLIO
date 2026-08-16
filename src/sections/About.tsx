import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import OptimizedImage from '../components/OptimizedImage'
import { aboutContent, personalInfo } from '../data'
import { revealTransition } from '../lib/motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTheme } from '../theme/useTheme'

const wordReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export default function About() {
  const { theme } = useTheme()
  const [imgError, setImgError] = useState(false)
  const reduced = useReducedMotion()
  const imgRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springRotateX = useSpring(mouseY, { stiffness: 150, damping: 15 })
  const springRotateY = useSpring(mouseX, { stiffness: 150, damping: 15 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current || reduced) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    mouseX.set(x * 4)
    mouseY.set(y * 4)
  }, [mouseX, mouseY, reduced])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.section
      id="about"
      className="py-20 md:py-28 px-6 md:px-10 bg-dots"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={revealTransition}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="About"
          title={
            <>
              About <span className="text-accent">Me</span>
            </>
          }
          subtitle="Get to know more about me and my journey"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
            ref={imgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 600 }}
          >
            <motion.div
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/15"
              style={reduced ? undefined : { rotateX: springRotateX, rotateY: springRotateY }}
            >
              {imgError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-hover/20" />
              ) : (
                <OptimizedImage
                  src={theme === 'red' ? '/Red%20mode%20my%20photo.png' : personalInfo.avatar}
                  webp={theme === 'red' ? '/Red%20mode%20my%20photo.webp' : '/hero.webp'}
                  avif={theme === 'red' ? undefined : '/hero.avif'}
                  alt={personalInfo.name}
                  width={theme === 'red' ? 388 : 545}
                  height={theme === 'red' ? 886 : 1600}
                  loading="lazy"
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                />
              )}
              <div className="absolute inset-0" />
            </motion.div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-accent/5 border border-border" />
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-accent/5 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <p className="font-mono text-sm font-semibold text-accent mb-1">
              Frontend Intern at Sweven Incorporate Pvt. Ltd.
            </p>
            {aboutContent.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.015, delayChildren: i * 0.12 },
                  },
                }}
                className="text-secondary leading-relaxed text-base lg:text-lg md:text-justify"
              >
                {reduced ? p : p.split(' ').map((word, j) => (
                  <motion.span
                    key={j}
                    variants={wordReveal}
                    className="inline-block mr-[0.25em]"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
