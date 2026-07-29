import SectionHeading from '../components/SectionHeading'
import CertificationCard from '../components/CertificationCard'
import { certifications } from '../data'

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 md:py-32 px-6 md:px-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
