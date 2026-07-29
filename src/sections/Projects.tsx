import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data'

const categories = ['All', 'Full Stack', 'Frontend'] as const

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
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
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeCategory === cat
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'glass text-secondary hover:text-primary hover:border-accent/30 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
