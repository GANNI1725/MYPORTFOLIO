import { useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import type { Project } from '../data'
import { staggerItem, uiTransition } from '../lib/motion'
import OptimizedImage from './OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const reduced = useReducedMotion()
  const imgRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springRotateX = useSpring(mouseY, { stiffness: 120, damping: 12 })
  const springRotateY = useSpring(mouseX, { stiffness: 120, damping: 12 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current || reduced) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    mouseX.set(x * 5)
    mouseY.set(y * 5)
  }, [mouseX, mouseY, reduced])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      variants={staggerItem}
      transition={uiTransition}
      whileHover={{ y: -4 }}
      className="group glass rounded-xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
    >
      <div
        ref={imgRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-video bg-gradient-to-br from-accent/5 to-accent-hover/10 flex items-center justify-center overflow-hidden"
        style={{ perspective: 500 }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { rotateX: springRotateX, rotateY: springRotateY }}
        >
          <OptimizedImage
            src={project.image}
            webp={project.image.replace(/\.(png|jpe?g)$/i, '.webp')}
            avif={project.image.replace(/\.(png|jpe?g)$/i, '.avif')}
            alt={project.title}
            width={project.imageWidth}
            height={project.imageHeight}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        <div className="hidden w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <p className="font-mono code-label text-xs font-bold uppercase tracking-widest text-accent mb-2">{project.category}</p>
        <h3 className="text-lg font-bold text-primary mb-1">{project.title}</h3>
        <p className="text-sm text-secondary mb-1">{project.subtitle}</p>
        <p className="text-sm text-secondary/80 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="code-tag"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-accent hover:text-accent-hover transition-colors group/link"
          >
            Live Demo <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
