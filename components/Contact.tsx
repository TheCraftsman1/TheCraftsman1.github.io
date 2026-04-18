import React, { useState } from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import { Mail, Linkedin, Github, Code, CheckCircle, AlertCircle, ArrowUpRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidEmail, sanitizeInput } from '../utils/validation';
import ScrollReveal from './ScrollReveal';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedName = sanitizeInput(formState.name);
    const sanitizedEmail = sanitizeInput(formState.email);
    const sanitizedMessage = sanitizeInput(formState.message);

    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      setErrorMessage('Please fill in all fields.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    if (!isValidEmail(sanitizedEmail)) {
      setErrorMessage('Invalid email format.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('submitting');

    fetch('https://formsubmit.co/ajax/vishnukanchipati@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        _subject: "New Portfolio Message!"
      })
    })
      .then(response => {
        if (response.ok) {
          setStatus('success');
          setFormState({ name: '', email: '', message: '' });
          setTimeout(() => setStatus('idle'), 5000);
        } else {
          throw new Error('Failed to send');
        }
      })
      .catch(() => {
        setErrorMessage('Failed to send message. Please try again.');
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      });
  };

  const socials = [
    { href: 'https://github.com/TheCraftsman1', label: 'GitHub', desc: 'Check out my repos', icon: <Github className="w-5 h-5" /> },
    { href: 'https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331', label: 'LinkedIn', desc: 'Let\'s connect', icon: <Linkedin className="w-5 h-5" /> },
    { href: 'https://leetcode.com/u/dPqPqsFd0k/', label: 'LeetCode', desc: 'DSA practice', icon: <Code className="w-5 h-5" /> },
    { href: 'mailto:vishnukanchipati@gmail.com', label: 'Email', desc: 'Direct message', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <section id={SectionId.CONTACT} className="py-32 md:py-40 bg-white relative overflow-hidden border-t border-neutral-100">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle title="Contact" subtitle="Get In Touch" number="05" />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left — CTA + Social */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollReveal animation="fade-up">
            <h3
              className="text-4xl md:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-[0.95] mb-8"
              style={{ fontFamily: "'Syne', 'Inter', sans-serif" }}
            >
              Let's build<br />
              something<br />
              <span className="text-neutral-300">great.</span>
            </h3>
            </ScrollReveal>

            <ScrollReveal delay={200} animation="fade-up">
              <p className="text-neutral-500 text-lg leading-relaxed max-w-sm font-light mb-12">
                Have a project in mind or want to collaborate? I'm currently open to new opportunities. Reach out and let's create impactful software together.
            </p>
            </ScrollReveal>

            {/* Social cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-neutral-100 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-neutral-900 transition-all duration-300">
                    {social.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-neutral-900">{social.label}</p>
                    <p className="text-[11px] text-neutral-400 font-medium">{social.desc}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="float-label-group">
                <input
                  id="contact-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder=" "
                  maxLength={100}
                />
                <label htmlFor="contact-name">Your Name</label>
              </div>

              {/* Email */}
              <div className="float-label-group">
                <input
                  id="contact-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder=" "
                  maxLength={100}
                />
                <label htmlFor="contact-email">Email Address</label>
              </div>

              {/* Message */}
              <div className="float-label-group">
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder=" "
                  maxLength={500}
                  style={{ resize: 'none' }}
                />
                <label htmlFor="contact-message">Your Message</label>
              </div>

              {/* Error */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 flex items-center gap-2 text-sm font-medium"
                  >
                    <AlertCircle size={16} /> {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-5 bg-neutral-900 text-white font-black uppercase tracking-wider text-sm rounded-xl hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 button-shine relative overflow-hidden"
                style={{ fontFamily: "'Syne', sans-serif" }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white border border-neutral-200 p-10 flex flex-col items-center text-center max-w-sm mx-4 shadow-2xl rounded-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              >
                <CheckCircle className="text-emerald-500 w-16 h-16 mb-5" />
              </motion.div>
              <h3
                className="text-2xl font-black text-neutral-900 uppercase tracking-tight mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Message Sent!
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">I'll get back to you as soon as possible.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
