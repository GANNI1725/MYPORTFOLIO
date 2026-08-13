import { motion } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import TimelineItem from '../components/TimelineItem'
import { experiences } from '../data'
import { staggerContainer, revealTransition } from '../lib/motion'

export default function Experience() {
  return (
    <motion.section
      id="experience"
      className="py-20 md:py-28 px-6 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={revealTransition}
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Experience"
          title={
            <>
              Experience & <span className="text-accent">Education</span>
            </>
          }
          subtitle="My professional and academic journey"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {experiences.map((exp) => (
            <TimelineItem key={`${exp.company}-${exp.role}`} experience={exp} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
