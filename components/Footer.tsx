import React, { useState } from 'react';
import { Check, Copy, ArrowUp, FileText, Code2, Award, GraduationCap, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from './Github';
import { Linkedin } from './Linkedin';
import { Leetcode } from './Leetcode';
import { LiquidButton } from './ui/liquid-glass-button';
import { playClickSnap, playHoverTick } from '../lib/sound';
import { Magnetic } from './ui/Magnetic';

// Getform / Form dispatch endpoint
const GETFORM_ENDPOINT = (import.meta as any).env?.VITE_GETFORM_ENDPOINT || 'https://formsubmit.co/ajax/vishnukanchipati@gmail.com';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    playClickSnap();
    navigator.clipboard.writeText('vishnukanchipati@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    playClickSnap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSnap();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all fields.');
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3500);
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim());
      data.append('message', formData.message.trim());
      data.append('_subject', `Portfolio Message from ${formData.name.trim()}`);

      const response = await fetch(GETFORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: data,
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setFormStatus('error');
      setErrorMessage('Failed to send message. Please copy email directly.');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <footer
      className="relative w-full py-12 sm:py-20 border-t border-zinc-200/80 dark:border-white/10 overflow-hidden transition-colors duration-300 section-contained"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Credibility & Milestone Strip */}
        <div className="relative mb-10 sm:mb-16 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.025] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.12] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] overflow-hidden item-contained">
          {/* Top Specular Edge Highlight */}
          <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none z-20" />

          <div
            onMouseEnter={playHoverTick}
            data-cursor="3rd Prize"
            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-zinc-50/70 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/15 backdrop-blur-md flex items-center justify-center text-[#fba01d] flex-shrink-0 shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <Award size={18} />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-amber-600 dark:text-[#fba01d] uppercase block">
                3rd Prize Winner
              </span>
              <span className="text-xs text-zinc-600 dark:text-neutral-300 font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                National-Level Hackathon · AgroNova
              </span>
            </div>
          </div>

          <div
            onMouseEnter={playHoverTick}
            data-cursor="8.59 CGPA"
            className="flex items-center gap-3 p-2.5 sm:p-3 border-t md:border-t-0 md:border-l border-zinc-200/80 dark:border-white/10 rounded-xl hover:bg-zinc-50/70 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/15 backdrop-blur-md flex items-center justify-center text-blue-500 dark:text-blue-400 flex-shrink-0 shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <GraduationCap size={18} />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-blue-600 dark:text-blue-400 uppercase block">
                8.59 / 10.0 CGPA
              </span>
              <span className="text-xs text-zinc-600 dark:text-neutral-300 font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                B.Tech Computer Science @ IARE
              </span>
            </div>
          </div>

          <div
            onMouseEnter={playHoverTick}
            data-cursor="200+ Solved"
            className="flex items-center gap-3 p-2.5 sm:p-3 border-t md:border-t-0 md:border-l border-zinc-200/80 dark:border-white/10 rounded-xl hover:bg-zinc-50/70 dark:hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/15 backdrop-blur-md flex items-center justify-center text-emerald-500 dark:text-emerald-400 flex-shrink-0 shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <Code2 size={18} />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-['Plus_Jakarta_Sans',sans-serif] font-bold text-emerald-600 dark:text-emerald-400 uppercase block">
                200+ Solved Milestones
              </span>
              <span className="text-xs text-zinc-600 dark:text-neutral-300 font-medium font-['Plus_Jakarta_Sans',sans-serif]">
                Active DSA on LeetCode & GfG
              </span>
            </div>
          </div>
        </div>

        {/* Main "Let's Build Together" Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start pb-10 sm:pb-16 border-b border-zinc-200/80 dark:border-white/10">
          {/* Left Column: Direct Info & Quick Actions */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-['Plus_Jakarta_Sans',sans-serif] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white font-['Montserrat',sans-serif] tracking-tight leading-tight mb-3 sm:mb-4">
                Let’s build something <br />
                <span className="text-[#fba01d]">resilient together.</span>
              </h2>
              <p className="text-sm text-zinc-600 dark:text-neutral-400 leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
                Outside the IDE, I focus on physical endurance, developer tooling, and rapid prototyping hackathons. Available for software engineering roles & select opportunities.
              </p>
            </div>

            {/* Click to Copy Email Button */}
            <div className="relative w-full">
              <Magnetic maxOffset={8}>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  onMouseEnter={playHoverTick}
                  data-cursor="Copy Email"
                  className="group relative w-full flex items-center justify-between gap-3.5 px-5 py-3.5 rounded-xl bg-white hover:bg-zinc-50 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] backdrop-blur-2xl border border-zinc-200/80 hover:border-zinc-300 dark:border-white/15 dark:hover:border-white/35 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none" />

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 dark:bg-white/[0.04] backdrop-blur-md border border-zinc-200/80 dark:border-white/15 flex items-center justify-center text-zinc-900 dark:text-white transition-all group-hover:border-[#fba01d]/60 group-hover:text-[#fba01d] shadow-sm dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400 uppercase tracking-wider block">
                        {copied ? 'Success!' : 'Click to Copy Email'}
                      </span>
                      <span className="text-sm font-['Plus_Jakarta_Sans',sans-serif] font-bold text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#fba01d] transition-colors">
                        vishnukanchipati@gmail.com
                      </span>
                    </div>
                  </div>
                </button>
              </Magnetic>

              {/* Toast Notification */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#fba01d] text-black font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold px-3 py-1 rounded-md shadow-lg pointer-events-none whitespace-nowrap flex items-center gap-1.5"
                  >
                    <Check size={12} />
                    <span>Copied to clipboard!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Verification & Social Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Magnetic maxOffset={8}>
                <LiquidButton
                  href="/vishnu-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  size="default"
                  data-cursor="Download CV"
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold"
                >
                  <FileText size={14} className="text-[#fba01d]" />
                  <span>Resume PDF</span>
                </LiquidButton>
              </Magnetic>

              <Magnetic maxOffset={8}>
                <LiquidButton
                  href="https://github.com/TheCraftsman1"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  size="icon"
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif]"
                  title="GitHub"
                  data-cursor="GitHub"
                >
                  <Github size={14} />
                </LiquidButton>
              </Magnetic>

              <Magnetic maxOffset={8}>
                <LiquidButton
                  href="https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  size="icon"
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif]"
                  title="LinkedIn"
                  data-cursor="LinkedIn"
                >
                  <Linkedin size={14} />
                </LiquidButton>
              </Magnetic>

              <Magnetic maxOffset={8}>
                <LiquidButton
                  href="https://leetcode.com/u/Vishnu_Kanchipati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="default"
                  size="icon"
                  className="text-xs font-['Plus_Jakarta_Sans',sans-serif]"
                  title="LeetCode"
                  data-cursor="LeetCode"
                >
                  <Leetcode size={14} />
                </LiquidButton>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Interactive Getform Call Contact Form */}
          <div className="lg:col-span-7 w-full">
            <div className="relative p-5 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.025] backdrop-blur-2xl border border-zinc-200/80 dark:border-white/[0.12] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03),inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.22)] overflow-hidden item-contained">
              <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/35 to-transparent pointer-events-none z-20" />

              <div className="mb-4">
                <span className="text-[11px] font-['Plus_Jakarta_Sans',sans-serif] font-bold uppercase tracking-wider text-amber-600 dark:text-[#fba01d] block">
                  Write Directly
                </span>
                <p className="text-xs text-zinc-500 dark:text-neutral-400 font-['Plus_Jakarta_Sans',sans-serif] mt-0.5">
                  Send a message directly from here — delivered straight to my primary inbox.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label
                      htmlFor="footer-form-name"
                      className="block text-[10.5px] font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 font-['Plus_Jakarta_Sans',sans-serif]"
                    >
                      Your Name
                    </label>
                    <input
                      id="footer-form-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-neutral-500 text-xs font-['Plus_Jakarta_Sans',sans-serif] focus:outline-none focus:border-[#fba01d] dark:focus:border-[#fba01d] transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="footer-form-email"
                      className="block text-[10.5px] font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 font-['Plus_Jakarta_Sans',sans-serif]"
                    >
                      Email Address
                    </label>
                    <input
                      id="footer-form-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-neutral-500 text-xs font-['Plus_Jakarta_Sans',sans-serif] focus:outline-none focus:border-[#fba01d] dark:focus:border-[#fba01d] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="footer-form-message"
                    className="block text-[10.5px] font-bold uppercase tracking-wider text-zinc-700 dark:text-neutral-300 font-['Plus_Jakarta_Sans',sans-serif]"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="footer-form-message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about what you're building, project scope, or potential collaboration..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200/80 dark:border-white/10 text-zinc-950 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-neutral-500 text-xs font-['Plus_Jakarta_Sans',sans-serif] focus:outline-none focus:border-[#fba01d] dark:focus:border-[#fba01d] transition-colors resize-none"
                  />
                </div>

                {/* Inline Status Alerts */}
                <AnimatePresence>
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-500 font-['Plus_Jakarta_Sans',sans-serif] font-semibold flex items-center gap-1.5 py-1"
                    >
                      <AlertCircle size={14} />
                      <span>{errorMessage || 'Failed to transmit message. Please copy email directly.'}</span>
                    </motion.div>
                  )}
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-emerald-600 dark:text-emerald-400 font-['Plus_Jakarta_Sans',sans-serif] font-bold flex items-center gap-1.5 py-1"
                    >
                      <Check size={14} />
                      <span>Message received! I will review and reply to your email promptly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3 px-5 rounded-xl bg-[#fba01d] hover:bg-[#e28f17] text-zinc-950 font-bold font-['Plus_Jakarta_Sans',sans-serif] text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(251,160,29,0.35)] hover:shadow-[0_6px_20px_rgba(251,160,29,0.45)] active:scale-[0.99]"
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-black/80 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Send Message</span>
                      <Send size={13} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-neutral-400">
          <span>
            © {new Date().getFullYear()} Sree Vishnu Kanchipati. Engineered with TypeScript & Framer Motion.
          </span>

          <Magnetic maxOffset={6}>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={playHoverTick}
              data-cursor="Scroll Top"
              className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-[#fba01d] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
