import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function ServerError() {
  return (
    <>
      <SEO
        title="500 — Server Error"
        description="Something went wrong on our end. Please try again later."
        path="/500"
      />
      <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg)]">
        <div className="text-center space-y-6 max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl md:text-9xl font-black text-accent/15 select-none"
          >
            500
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Something Went Wrong</h1>
            <p className="text-secondary text-sm leading-relaxed mt-3">
              An unexpected error occurred on our end. Please try refreshing the page, or come back
              later. We apologize for the inconvenience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={() => window.location.reload()}
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl bg-accent text-white text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40 transition-all hover:scale-105 active:scale-95"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="inline-flex h-11 px-6 items-center justify-center rounded-xl border border-[var(--border)] text-primary text-sm font-semibold hover:bg-white/5 transition-all"
            >
              Back to Home
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-[10px] text-secondary/40 mt-8"
          >
            Error 500 — Internal Server Error
          </motion.p>
        </div>
      </div>
    </>
  )
}
