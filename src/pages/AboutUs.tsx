import { motion } from 'motion/react'
import SEO from '../components/SEO'
import { personalInfo } from '../data'
import SocialLinks from '../components/SocialLinks'
import { useReducedMotion } from '../hooks/useReducedMotion'

const socialLinks = [
  {
    label: 'GitHub',
    href: personalInfo.social.github,
    color: '#24292F',
    glow: 'rgba(36,41,47,0.4)',
    colorDark: '#ffffff',
    glowDark: 'rgba(255,255,255,0.4)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    label: 'LinkedIn',
    href: personalInfo.social.linkedin,
    color: '#0A66C2',
    glow: 'rgba(10,102,194,0.5)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" /></svg>,
  },
  {
    label: 'Instagram',
    href: personalInfo.social.instagram,
    color: '#E4405F',
    glow: 'rgba(228,64,95,0.5)',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
]

export default function AboutUs() {
  const reduced = useReducedMotion()
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about Ganesh Prasad Bhandari — a frontend developer from Nepal specializing in React, Next.js, and modern web technologies."
        path="/about-us"
      />
      <div className="min-h-screen pt-28 pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <p className="font-mono code-label text-2xs font-medium tracking-eyebrow uppercase text-accent mb-3">About</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              About <span className="text-accent">Us</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={reduced ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-lg font-bold text-primary mb-3">Who I Am</h2>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                I am Ganesh Prasad Bhandari, a frontend developer based in Tilottama-6, Manigram, Rupandehi, Nepal. My passion lies in creating visually engaging, highly interactive web applications that deliver seamless user experiences.
              </p>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                My journey into web development began with a deep curiosity about how digital experiences are built. I pursued this passion by learning modern tools and frameworks, eventually specializing in React, Next.js, and Tailwind CSS.
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                I believe that great design and clean code go hand in hand. Every project is an opportunity to push creative boundaries while maintaining performance, accessibility, and maintainability.
              </p>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-lg font-bold text-primary mb-3">My Approach</h2>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                I take a user-first approach to development. Before writing a single line of code, I invest time in understanding the problem, the audience, and the desired outcome. This ensures that the final product is not just functional but truly valuable.
              </p>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                During my internship at Sweven Incorporate Pvt. Ltd., I refined my ability to translate design concepts into responsive, production-ready interfaces. I learned the importance of collaboration, code reviews, and writing maintainable code that scales.
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                When I am not coding, I explore new design trends, experiment with 3D web graphics (Three.js), and contribute to open-source projects that challenge my skills.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-8 text-center space-y-4"
          >
            <h2 className="text-lg font-bold text-primary">Let's Connect</h2>
            <p className="text-sm text-secondary max-w-md mx-auto">
              I am always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out.
            </p>
            <div className="flex justify-center">
              <SocialLinks links={socialLinks} />
            </div>
            <a
              href="/#contact"
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-accent-cta text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}
