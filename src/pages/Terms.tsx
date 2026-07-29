import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useReducedMotion } from '../hooks/useReducedMotion'

const sections = [
  {
    title: 'Acceptance of Terms',
    content: 'By accessing and using this website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should not use this website.',
  },
  {
    title: 'Intellectual Property',
    content: 'All content on this website — including but not limited to text, graphics, logos, images, animations, code snippets, and project demonstrations — is the intellectual property of Ganesh Prasad Bhandari unless otherwise stated. You may not reproduce, distribute, modify, or publicly display any content without prior written consent.',
  },
  {
    title: 'Use of Website',
    content: 'This website is provided for informational and portfolio purposes. You agree to use it only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the site.',
  },
  {
    title: 'Third-Party Links',
    content: 'This website may contain links to third-party websites (e.g., GitHub, LinkedIn). These links are provided for your convenience. We do not endorse or assume responsibility for the content, privacy practices, or terms of any third-party sites.',
  },
  {
    title: 'Disclaimer',
    content: 'The information and materials on this website are provided "as is" without any warranties, express or implied. While we strive to keep the information accurate and up to date, we make no representations or guarantees regarding the completeness, accuracy, or reliability of the content.',
  },
  {
    title: 'Limitation of Liability',
    content: 'Ganesh Prasad Bhandari shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use this website.',
  },
  {
    title: 'Governing Law',
    content: 'These terms shall be governed by and construed in accordance with the laws of Nepal. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Nepal.',
  },
  {
    title: 'Changes to Terms',
    content: 'We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting. Your continued use of the website after any changes constitutes acceptance of the new terms.',
  },
  {
    title: 'Contact',
    content: 'If you have any questions about these Terms and Conditions, please contact us at bhandariganesh1725@gmail.com.',
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

export default function Terms() {
  const reduced = useReducedMotion()
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for using Ganesh Prasad Bhandari's portfolio website. Includes intellectual property notice, disclaimer, and governing law (Nepal)."
        path="/terms"
      />
      <div className="min-h-screen pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Legal</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              Terms & <span className="text-accent">Conditions</span>
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
