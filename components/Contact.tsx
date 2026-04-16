import React, { useState } from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import TechyBackground from './TechyBackground';
import { Mail, Linkedin, Github, Code, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isValidEmail, sanitizeInput } from '../utils/validation';

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

        // Submit via FormSubmit.co
        fetch('https://formsubmit.co/ajax/vishnukanchipati@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
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

    return (
        <section id={SectionId.CONTACT} className="py-24 bg-white relative border-t border-slate-200/80">
            {/* Techy background decoration */}
            <TechyBackground variant="circuit" opacity={0.2} />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <SectionTitle title="Contact" subtitle="Get In Touch" />

                <div className="mt-16 glass-panel-intense p-8 md:p-12 relative border border-slate-200">
                    {/* Neon Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sky-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sky-500"></div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label htmlFor="name" className="block text-xs font-exo uppercase tracking-wider text-slate-500 mb-2 group-focus-within:text-sky-500 transition-colors">Name</label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        type="text"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-slate-900 font-exo focus:outline-none focus:border-sky-500 focus:bg-sky-50 transition-all duration-300 placeholder-slate-400 backdrop-blur-sm"
                                        placeholder="ENTER YOUR NAME"
                                        maxLength={100}
                                    />
                                    {/* Focus Gradient Line underneath */}
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-500 to-cyan-400 group-focus-within:w-full transition-all duration-500 rounded-b-lg" />
                                </div>
                            </div>
                            <div className="group relative">
                                <label htmlFor="email" className="block text-xs font-exo uppercase tracking-wider text-slate-500 mb-2 group-focus-within:text-sky-500 transition-colors">Email</label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-slate-900 font-exo focus:outline-none focus:border-sky-500 focus:bg-sky-50 transition-all duration-300 placeholder-slate-400 backdrop-blur-sm"
                                        placeholder="ENTER YOUR EMAIL"
                                        maxLength={100}
                                    />
                                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-500 to-cyan-400 group-focus-within:w-full transition-all duration-500 rounded-b-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="group relative">
                            <label htmlFor="message" className="block text-xs font-exo uppercase tracking-wider text-slate-500 mb-2 group-focus-within:text-sky-500 transition-colors">Message</label>
                            <div className="relative">
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-slate-900 font-exo focus:outline-none focus:border-sky-500 focus:bg-sky-50 transition-all duration-300 placeholder-slate-400 resize-none backdrop-blur-sm"
                                    placeholder="PROJECT DETAILS..."
                                    maxLength={500}
                                ></textarea>
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-500 to-cyan-400 group-focus-within:w-full transition-all duration-500 rounded-b-lg" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {status === 'error' && (
                                <div className="text-red-500 flex items-center gap-2 text-sm font-exo animate-pulse">
                                    <AlertCircle size={16} /> {errorMessage}
                                </div>
                            )}

                            <motion.button
                                disabled={status === 'submitting'}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 bg-sky-500 text-white font-orbitron font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(14,165,233,0.45)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ml-auto relative overflow-hidden group/btn"
                            >
                                <span className="relative z-10">{status === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                                {/* Hover light sweep effect */}
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:animate-[shimmer_1s_infinite] skew-x-12" />
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-slate-500 font-exo text-sm">
                            Based in India • Available for Freelance
                        </div>
                        <div className="flex gap-6">
                            <a href="https://github.com/TheCraftsman1" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-500 hover:text-sky-500 hover:scale-125 transition-all duration-300"><Github size={20} /></a>
                            <a href="https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-slate-500 hover:text-sky-500 hover:scale-125 transition-all duration-300"><Linkedin size={20} /></a>
                            <a href="https://leetcode.com/u/dPqPqsFd0k/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode Profile" className="text-slate-500 hover:text-sky-500 hover:scale-125 transition-all duration-300"><Code size={20} /></a>
                            <a href="mailto:vishnukanchipati@gmail.com" aria-label="Send Email" className="text-slate-500 hover:text-sky-500 hover:scale-125 transition-all duration-300"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Footer Racing Stripe */}
                <div className="mt-24 flex items-center justify-center gap-2 opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-2 h-8 bg-white skew-x-[-20deg]"></div>
                    ))}
                </div>
                <p className="text-center text-slate-500 font-exo text-xs mt-6 uppercase tracking-widest">© 2026 Vishnu Kanchipati. All Rights Reserved.</p>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/65 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white border border-sky-400 p-8 flex flex-col items-center text-center max-w-sm mx-4 shadow-[0_0_50px_rgba(14,165,233,0.25)]"
                        >
                            <CheckCircle className="text-sky-500 w-16 h-16 mb-4" />
                            <h3 className="text-2xl font-orbitron font-bold text-slate-900 mb-2">Message Sent!</h3>
                            <p className="text-slate-600 font-exo">I'll get back to you as soon as possible.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
