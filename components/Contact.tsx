import React, { useState } from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import { Mail, Code, CheckCircle, AlertCircle, ArrowUpRight, Send } from 'lucide-react';
import { Github } from './Github';
import { Linkedin } from './Linkedin';
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
    { href: 'https://github.com/TheCraftsman1', label: 'GitHub', desc: 'Code repositories', icon: <Github className="w-5 h-5" /> },
    { href: 'https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331', label: 'LinkedIn', desc: 'Professional network', icon: <Linkedin className="w-5 h-5" /> },
    { href: 'https://leetcode.com/u/Vishnu_Kanchipati/', label: 'LeetCode', desc: 'Problem solving', icon: <Code className="w-5 h-5" /> },
    { href: 'mailto:vishnukanchipati@gmail.com', label: 'Email', desc: 'Direct message', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <section id={SectionId.CONTACT} className="py-32 md:py-40 bg-[#FAFAFA] relative overflow-hidden text-black" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Pure white canvas base */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Very subtle 5% opacity soft gray gradients (Airy white theme) */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200/20 via-white/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-200/30 via-white/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionTitle title="Contact" subtitle="Connect With Me" number="05" titleColor="text-black" />

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
          {/* Left side � Corporate/Elegant Info (cols: 5) */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ScrollReveal animation="fade-up">
              <h3 className="text-4xl md:text-[3.25rem] font-light tracking-tight text-black leading-[1.05] mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                Let's create<br />
                something <span className="font-semibold italic text-neutral-500 line-clamp-1 py-1">exceptional.</span>
              </h3>
            </ScrollReveal>

            <ScrollReveal delay={150} animation="fade-up">
              <p className="text-neutral-500 text-[1.05rem] leading-relaxed max-w-sm font-light mb-12">
                Whether you have a specific project in mind, or simply want to connect and talk software engineering, I'm always open to new opportunities.
              </p>
            </ScrollReveal>

            {/* 3D Rendered Minimal White Icons / Soft Drop Shadows */}
            <div className="flex flex-col gap-4">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-5">
                    {/* Minimal White Neumorphic Icon Box */}
                    <div className="w-[52px] h-[52px] rounded-xl bg-white flex items-center justify-center text-neutral-400 group-hover:text-neutral-800 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02),0_2px_10px_rgba(0,0,0,0.04)] transition-all duration-500">
                      {social.icon}
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-neutral-800 tracking-wide">{social.label}</p>
                      <p className="text-xs text-neutral-400 font-light mt-0.5">{social.desc}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-800 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side � Clean UI/UX Neumorphic Form (cols: 7) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Soft Neumorphic Form Container */}
            <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-10 rounded-[2.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.04),0_2px_10px_rgba(0,0,0,0.02)]">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-widest px-1">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full bg-[#FAFAFA] text-neutral-800 placeholder:text-neutral-500 rounded-2xl border-0 px-5 py-4 focus:ring-2 focus:ring-neutral-200/60 focus:bg-white shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 font-medium text-[15px]"
                      maxLength={100}
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-widest px-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-[#FAFAFA] text-neutral-800 placeholder:text-neutral-500 rounded-2xl border-0 px-5 py-4 focus:ring-2 focus:ring-neutral-200/60 focus:bg-white shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 font-medium text-[15px]"
                      maxLength={100}
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-[11px] font-semibold text-neutral-400 uppercase tracking-widest px-1">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-[#FAFAFA] text-neutral-800 placeholder:text-neutral-500 rounded-2xl border-0 px-5 py-4 focus:ring-2 focus:ring-neutral-200/60 focus:bg-white shadow-[inset_0_2px_6px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 font-medium text-[15px]"
                    maxLength={500}
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="text-red-500/90 flex items-center gap-2 text-[13px] font-medium px-2"
                    >
                      <AlertCircle className="w-4 h-4" /> {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full mt-4 py-[1.15rem] bg-neutral-900 border border-neutral-800 text-white font-semibold uppercase tracking-widest text-[12px] rounded-2xl hover:bg-neutral-800 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden"
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-3">
                      <motion.div
                        className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
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
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern, Clean Success Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-900/10 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
              className="bg-white p-12 flex flex-col items-center text-center max-w-sm mx-4 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] border border-neutral-100 rounded-[2rem]"
            >
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              >
                <CheckCircle className="text-black w-16 h-16 stroke-[1.5] mb-6" />
              </motion.div>
              <h3 className="text-2xl font-light text-black tracking-tight mb-3" style={{ fontFamily: "'Georgia', serif" }}>
                Message Sent.
              </h3>
              <p className="text-neutral-500 text-[15px] font-light leading-relaxed">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
