import { motion } from 'motion/react'
import { Award, ExternalLink } from 'lucide-react'
import type { Certification } from '../data'
import { staggerItem, uiTransition } from '../lib/motion'

interface CertificationCardProps {
  cert: Certification
  index: number
}

export default function CertificationCard({ cert, index }: CertificationCardProps) {
  const isRecent = index === 0

  return (
    <motion.div
      variants={staggerItem}
      transition={uiTransition}
      whileHover={{ y: -4 }}
      className="glass rounded-xl p-5 md:p-6 text-center border border-border hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative overflow-hidden"
    >
      {isRecent && (
        <span className="code-tag absolute top-3 right-3 bg-accent/10 px-2 py-1 rounded-md">
          Latest
        </span>
      )}
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-200">
        <Award size={22} />
      </div>
      <h3 className="text-base font-bold text-primary mb-2">{cert.title}</h3>
      <p className="font-mono text-xs text-secondary mb-5">
        {cert.issuer} &bull; {cert.date}
      </p>
      <button
        onClick={(e) => e.preventDefault()}
        className="inline-flex min-h-11 items-center gap-1.5 px-4 text-sm font-bold text-accent hover:text-accent-hover transition-colors group/link cursor-pointer bg-transparent"
      >
        View Certificate <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}
