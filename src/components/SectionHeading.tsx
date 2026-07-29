import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label: string
  title: React.ReactNode
  subtitle?: string
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-secondary mt-3 max-w-lg mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
