import { useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data'
import { staggerContainer, revealTransition } from '../lib/motion'

const categories = ['All', 'Full Stack', 'Frontend'] as const

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <motion.section
      id="projects"
      className="py-20 md:py-28 px-6 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={revealTransition}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Projects"
          title={
            <>
              Featured <span className="text-accent">Projects</span>
            </>
          }
          subtitle="Selected work I've done"
        />

        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                activeCategory === cat
                  ? 'bg-accent/10 text-accent border-accent/40'
                  : 'glass text-secondary hover:text-primary hover:border-accent/30 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
