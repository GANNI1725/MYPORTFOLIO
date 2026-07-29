import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionHeading from '../components/SectionHeading'
import { personalInfo } from '../data'

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/5 dark:bg-white/5 border border-[var(--border)] text-primary text-sm focus:outline-none focus:border-accent focus:ring-[3px] focus:ring-accent/20 focus:bg-accent/[0.02] focus:shadow-xl focus:shadow-accent/10 transition-[border-color,box-shadow,background-color] duration-200'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')

    const form = new FormData(formRef.current)
    const templateParams = {
      from_name: form.get('user_name'),
      from_email: form.get('user_email'),
      phone: form.get('user_phone'),
      service: form.get('service'),
      timeline: form.get('timeline'),
      message: form.get('message'),
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )

      setStatus('success')
      formRef.current.reset()

      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)

      setStatus('error')

      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          label="Contact"
          title={
            <>
              Get In <span className="text-accent">Touch</span>
            </>
          }
          subtitle="Have a project in mind? Let's build something amazing together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 p-4 glass rounded-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">Email</p>
                <p className="text-sm font-semibold text-primary">{personalInfo.email}</p>
              </div>
            </a>
            <a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-4 p-4 glass rounded-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">Phone</p>
                <p className="text-sm font-semibold text-primary">{personalInfo.phone}</p>
              </div>
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(personalInfo.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 glass rounded-xl hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-secondary">Location</p>
                <p className="text-sm font-semibold text-primary">{personalInfo.location}</p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-4"
            >
              <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-secondary px-1">Full Name</span>
                  <input type="text" name="user_name" required placeholder="John Doe" autoComplete="name" className={inputClass} />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-secondary px-1">Email Address</span>
                  <input type="email" name="user_email" required placeholder="john@example.com" autoComplete="email" className={inputClass} />
                </label>
              </motion.div>
              <motion.div variants={staggerItem}>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-secondary px-1">Phone Number</span>
                  <input type="tel" name="user_phone" placeholder="+977 98XXXXXXXX" autoComplete="tel" pattern="[+]?[0-9\s\-\(\)]{7,20}" title="Enter a valid phone number (7-20 digits)" className={inputClass} />
                </label>
              </motion.div>
              <motion.div variants={staggerItem}>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-secondary px-1">Service of Interest</span>
                  <input type="text" name="service" placeholder="e.g. Web Development" className={inputClass} />
                </label>
              </motion.div>
              <motion.div variants={staggerItem}>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-secondary px-1">Timeline</span>
                  <input type="text" name="timeline" placeholder="e.g. 2-3 weeks" className={inputClass} />
                </label>
              </motion.div>
              <motion.div variants={staggerItem}>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-secondary px-1">Project Details</span>
                  <textarea name="message" required rows={4} placeholder="Describe your project..." className={`${inputClass} resize-none`} />
                </label>
              </motion.div>

              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              <motion.div variants={staggerItem} className="flex justify-end md:justify-end">
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group relative w-full md:w-auto h-11 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success'
                      ? 'bg-accent/20 text-accent'
                      : status === 'error'
                      ? 'bg-red-900/20 text-red-400'
                      : 'bg-accent text-white shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/40'
                  }`}
                >
                  {status === 'idle' && (
                    <><Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> Send Message</>
                  )}
                  {status === 'sending' && (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Sending...</>
                  )}
                  {status === 'success' && (
                    <><CheckCircle size={14} className="text-accent" /> Sent Successfully!</>
                  )}
                  {status === 'error' && (
                    <><AlertCircle size={14} className="text-red-400" /> Failed to Send</>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
