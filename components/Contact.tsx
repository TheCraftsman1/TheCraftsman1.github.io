import React, { useState } from 'react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import { Mail, Linkedin, Github, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setFormState({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section id={SectionId.CONTACT} className="py-24 bg-black relative border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6">
                <SectionTitle title="Contact" subtitle="Get In Touch" />

                <div className="mt-16 bg-carbon-gray p-8 md:p-12 relative border border-white/5">
                    {/* Neon Corner Accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-lime"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-lime"></div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label htmlFor="name" className="block text-xs font-exo uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-neon-lime transition-colors">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-exo focus:outline-none focus:border-neon-lime transition-colors placeholder-gray-700"
                                    placeholder="ENTER YOUR NAME"
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-exo uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-neon-lime transition-colors">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-transparent border-b border-white/20 py-3 text-white font-exo focus:outline-none focus:border-neon-lime transition-colors placeholder-gray-700"
                                    placeholder="ENTER YOUR EMAIL"
                                />
                            </div>
                        </div>
                        <div className="group">
                            <label htmlFor="message" className="block text-xs font-exo uppercase tracking-wider text-gray-500 mb-2 group-focus-within:text-neon-lime transition-colors">Message</label>
                            <textarea
                                id="message"
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                className="w-full bg-transparent border-b border-white/20 py-3 text-white font-exo focus:outline-none focus:border-neon-lime transition-colors placeholder-gray-700 resize-none"
                                placeholder="PROJECT DETAILS..."
                            ></textarea>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {status === 'error' && (
                                <div className="text-red-500 flex items-center gap-2 text-sm font-exo animate-pulse">
                                    <AlertCircle size={16} /> Please fill in all fields.
                                </div>
                            )}

                            <button
                                disabled={status === 'submitting'}
                                className="px-10 py-4 bg-neon-lime text-black font-orbitron font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] clip-path-slant disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                            >
                                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-gray-400 font-exo text-sm">
                            Based in India • Available for Freelance
                        </div>
                        <div className="flex gap-6">
                            <a href="https://github.com/TheCraftsman1" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-400 hover:text-neon-lime hover:scale-125 transition-all duration-300"><Github size={20} /></a>
                            <a href="https://in.linkedin.com/in/sree-vishnu-kanchipati-479422331" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-400 hover:text-neon-lime hover:scale-125 transition-all duration-300"><Linkedin size={20} /></a>
                            <a href="https://leetcode.com/u/dPqPqsFd0k/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode Profile" className="text-gray-400 hover:text-neon-lime hover:scale-125 transition-all duration-300"><Twitter size={20} /></a>
                            <a href="mailto:vishnukanchipati@gmail.com" aria-label="Send Email" className="text-gray-400 hover:text-neon-lime hover:scale-125 transition-all duration-300"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Footer Racing Stripe */}
                <div className="mt-24 flex items-center justify-center gap-2 opacity-30">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-2 h-8 bg-white skew-x-[-20deg]"></div>
                    ))}
                </div>
                <p className="text-center text-gray-600 font-exo text-xs mt-6 uppercase tracking-widest">© 2024 Vishnu Kanchipati. All Rights Reserved.</p>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-neutral-900 border border-neon-lime p-8 flex flex-col items-center text-center max-w-sm mx-4 shadow-[0_0_50px_rgba(204,255,0,0.2)]"
                        >
                            <CheckCircle className="text-neon-lime w-16 h-16 mb-4" />
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-400 font-exo">I'll get back to you as soon as possible.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;
