import SectionHeading from '../components/SectionHeading'
import TimelineItem from '../components/TimelineItem'
import { experiences } from '../data'

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-10">
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

        <div className="relative">
          {experiences.map((exp, i) => (
            <TimelineItem key={`${exp.company}-${exp.role}`} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
