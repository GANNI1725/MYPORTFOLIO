import { motion } from 'motion/react'
import SectionHeading from '../components/SectionHeading'
import BlogCard from '../components/BlogCard'
import { blogPosts } from '../data'
import { staggerContainer, revealTransition } from '../lib/motion'

export default function Blog() {
  return (
    <motion.section
      id="blog"
      className="py-20 md:py-28 px-6 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={revealTransition}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Blog"
          title={
            <>
              Blog & <span className="text-accent">Insights</span>
            </>
          }
          subtitle="Recent thoughts and articles"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
