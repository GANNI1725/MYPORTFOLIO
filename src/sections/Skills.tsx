import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SkillRing from '../components/SkillRing'
import { skills } from '../data'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'language', label: 'Languages' },
  { key: 'framework', label: 'Frameworks' },
  { key: 'tool', label: 'Tools' },
] as const

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory)

  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Skills"
          title={
            <>
              My <span className="text-accent">Skills</span>
            </>
          }
          subtitle="Technologies and tools I work with"
        />

        <div className="flex justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-[color,background-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                activeCategory === cat.key
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'glass text-secondary hover:text-primary hover:border-accent/30 hover:scale-105'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 md:gap-8 max-w-4xl mx-auto">
          {filtered.map((skill, i) => (
            <SkillRing key={skill.name} name={skill.name} percentage={skill.percentage} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
