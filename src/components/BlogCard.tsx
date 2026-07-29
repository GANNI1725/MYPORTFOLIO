import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, User, X } from 'lucide-react'
import type { BlogPost } from '../data'

interface BlogCardProps {
  post: BlogPost
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="glass rounded-2xl p-6 md:p-8 border border-white/10 dark:border-white/5 flex flex-col hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/10 transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-secondary mb-5">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-accent" />
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <User size={12} />
          </div>
          <span className="text-xs font-semibold text-secondary">Ganesh Prasad Bhandari</span>
        </div>
        <h3 className="text-base font-bold text-primary mb-3 leading-snug flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-secondary/80 mb-6 line-clamp-3 text-justify">{post.excerpt}</p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-accent hover:text-accent-hover transition-colors mt-auto group/link cursor-pointer bg-transparent"
        >
          Read More <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
        </button>
      </motion.article>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8 md:p-10 border border-white/10"
              style={{
                background: 'var(--bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-secondary hover:text-primary hover:bg-white/20 transition-[color,background-color] duration-200"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-secondary mb-5">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-accent" />
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <User size={12} />
                </div>
                <span className="text-xs font-semibold text-secondary">Ganesh Prasad Bhandari</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-primary leading-tight mb-6">
                {post.title}
              </h2>

              <p className="text-base text-secondary leading-relaxed text-justify">
                {post.excerpt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
