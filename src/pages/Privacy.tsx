import { motion } from 'motion/react'
import SEO from '../components/SEO'
import { useReducedMotion } from '../hooks/useReducedMotion'

const sections = [
  {
    title: 'Information We Collect',
    content: 'When you use the contact form on this website, we collect your name, email address, phone number, and any additional information you choose to provide in your message. We do not collect any personal information without your explicit consent.',
  },
  {
    title: 'How We Use Your Information',
    content: 'The information you provide is used solely to respond to your inquiries, provide the services you request, and communicate with you about your projects. We do not sell, rent, or share your personal information with third parties for marketing purposes.',
  },
  {
    title: 'Cookies',
    content: 'This website uses minimal cookies for essential functionality. We store a theme preference cookie (to remember your dark/light mode selection) in your local storage. We do not use tracking cookies, analytics cookies, or third-party advertising cookies.',
  },
  {
    title: 'Third-Party Services',
    content: 'This site uses the following third-party services: Google Fonts for typography (Inter, JetBrains Mono), and EmailJS for processing contact form submissions. These services may process your data according to their own privacy policies. We recommend reviewing their policies for more information.',
  },
  {
    title: 'Data Security',
    content: 'We implement reasonable security measures to protect your personal information. However, no method of electronic storage or transmission is 100% secure. By using this website, you acknowledge this inherent risk.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, please contact us using the information below.',
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.',
  },
  {
    title: 'Contact',
    content: 'If you have any questions about this Privacy Policy or how your data is handled, please reach out via email at bhandariganesh1725@gmail.com.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemAnim = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export default function Privacy() {
  const reduced = useReducedMotion()
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Ganesh Prasad Bhandari's portfolio website. Learn about how your data is collected, used, and protected."
        path="/privacy"
      />
      <div className="min-h-screen pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="font-mono code-label text-2xs font-medium tracking-eyebrow uppercase text-accent mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              Privacy <span className="text-accent">Policy</span>
            </h1>
            <p className="text-secondary text-sm mt-3">Last updated: July 2026</p>
          </motion.div>

          <motion.div
            variants={reduced ? undefined : container}
            initial={reduced ? undefined : "hidden"}
            animate={reduced ? undefined : "visible"}
            className="space-y-10"
          >
            {sections.map((s) => (
              <motion.div key={s.title} variants={reduced ? undefined : itemAnim} transition={reduced ? undefined : { ease: [0.16, 1, 0.3, 1] }}>
                <h2 className="text-lg font-bold text-primary mb-2">{s.title}</h2>
                <p className="text-sm text-secondary leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}
