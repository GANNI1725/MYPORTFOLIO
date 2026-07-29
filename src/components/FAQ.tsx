import { useState, useId, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading from './SectionHeading'

interface FAQItem {
  question: string
  answer: ReactNode
}

const faqData: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer: 'I specialize in frontend web development using React, Next.js, Tailwind CSS, and TypeScript. I build responsive, accessible, and performant websites — from portfolio sites and landing pages to full-featured web applications. I also offer UI/UX consultation and design-to-code services.',
  },
  {
    question: 'What is your tech stack?',
    answer: 'My core stack includes React (with Vite), Next.js, TypeScript, Tailwind CSS, Framer Motion, and Node.js for any backend needs. I work with databases like MongoDB, PostgreSQL (via Prisma), and Firebase. For deployment, I use Vercel and Netlify.',
  },
  {
    question: 'How can I hire you?',
    answer: (
      <>
        You can reach out through the{' '}
        <a href="/#contact" className="text-accent hover:underline">contact form</a>{' '}
        on this site, or email me directly at{' '}
        <a href="mailto:bhandariganesh1725@gmail.com" className="text-accent hover:underline">bhandariganesh1725@gmail.com</a>.
        I typically respond within 24 hours.
      </>
    ),
  },
  {
    question: 'Where are you based?',
    answer: 'I am based in Tilottama-6, Manigram, Rupandehi, Nepal. I work remotely with clients and teams from around the world.',
  },
  {
    question: 'What is your typical turnaround time?',
    answer: 'A simple portfolio or landing page usually takes 1-2 weeks. A more complex web application or dashboard can take 3-6 weeks depending on the scope. I provide a detailed timeline after understanding your project requirements.',
  },
  {
    question: 'Do you offer website maintenance?',
    answer: 'Yes, I offer post-launch maintenance packages including content updates, performance optimization, security patches, and feature additions. This can be arranged on a monthly or per-project basis.',
  },
  {
    question: 'Can you work with my existing design files?',
    answer: 'Absolutely. I can take Figma, Adobe XD, or Sketch design files and translate them into pixel-perfect, responsive web interfaces using React and Tailwind CSS.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: typeof item.answer === 'string' ? item.answer : '',
    },
  })),
}

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const id = useId()
  const panelId = `faq-panel-${id}`
  const buttonId = `faq-button-${id}`

  return (
    <div className="border border-[var(--border)] rounded-xl overflow-hidden transition-colors">
      <button
        id={buttonId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-primary hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <span>{item.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 text-secondary"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 text-sm text-secondary leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-24 md:py-32 px-6 md:px-10">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          label="FAQ"
          title={
            <>
              Frequently Asked <span className="text-accent">Questions</span>
            </>
          }
          subtitle="Everything you need to know before reaching out"
        />

        <div className="space-y-3">
          {faqData.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
