import { motion } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import type { Experience } from '../data'

interface TimelineItemProps {
  experience: Experience
  index: number
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
  const { company, role, period, location, type, description } = experience

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 md:pl-12 pb-10 last:pb-0 group"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent group-last:bg-gradient-to-b group-last:from-accent/40 group-last:via-accent/10 group-last:to-transparent" />
      <div className="absolute left-[-7px] top-1 w-[16px] h-[16px] rounded-full bg-accent border-[3px] border-[var(--bg)] shadow-lg shadow-accent/25" />

      <div className="glass rounded-xl p-5 md:p-6 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-[border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
              {type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
            </div>
            <div>
              <h3 className="text-base font-bold text-primary">{role}</h3>
              <p className="text-accent text-sm font-semibold">{company}</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-wider text-secondary">
            <span>{period}</span>
            <span className="opacity-40">|</span>
            <span>{location}</span>
          </div>
        </div>
        <ul className="space-y-2 ml-8 md:ml-12">
          {description.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 shrink-0 mt-1.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
