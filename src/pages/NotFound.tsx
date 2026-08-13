import { motion } from 'motion/react'
import SEO from '../components/SEO'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function NotFound() {
  const reduced = useReducedMotion()
  return (
    <>
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist. Return to the homepage."
        path="/404"
      />
      <div className="min-h-screen flex items-center justify-center px-6 bg-canvas">
        <div className="text-center space-y-6 max-w-md">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl md:text-9xl font-black text-accent/15 select-none"
          >
            404
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Page Not Found</h1>
            <p className="text-secondary text-sm leading-relaxed mt-3">
              Looks like this page wandered off. Don't worry — even the best websites have a little
              glitch now and then.
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="/"
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-accent-cta text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95"
            >
              Back to Home
            </a>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xs text-secondary/40 mt-8"
          >
            Error 404 — Page not found
          </motion.p>
        </div>
      </div>
    </>
  )
}
