import { motion } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import CertificationCard from '../components/CertificationCard'
import { certifications } from '../data'
import { staggerContainer, revealTransition } from '../lib/motion'

export default function Certifications() {
  return (
    <motion.section
      id="certifications"
      className="py-20 md:py-28 px-6 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={revealTransition}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Certifications"
          title={
            <>
              <span className="text-accent">Certifications</span>
            </>
          }
          subtitle="Recognition and learning achievements"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
