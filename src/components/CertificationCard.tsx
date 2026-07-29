import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import type { Certification } from '../data'

interface CertificationCardProps {
  cert: Certification
  index: number
}

export default function CertificationCard({ cert, index }: CertificationCardProps) {
  const isRecent = index === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass rounded-2xl p-6 md:p-8 text-center border border-white/10 dark:border-white/5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 relative overflow-hidden"
    >
      {isRecent && (
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">
          Latest
        </span>
      )}
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-200">
        <Award size={22} />
      </div>
      <h3 className="text-base font-bold text-primary mb-2">{cert.title}</h3>
      <p className="text-sm text-secondary mb-5">
        {cert.issuer} &bull; {cert.date}
      </p>
      <button
        onClick={(e) => e.preventDefault()}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-accent hover:text-accent-hover transition-colors group/link cursor-pointer bg-transparent"
      >
        View Certificate <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </motion.div>
  )
}
