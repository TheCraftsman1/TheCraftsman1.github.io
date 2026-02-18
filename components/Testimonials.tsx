import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionId } from '../types';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    avatar?: string;
}

const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        role: 'Product Manager',
        company: 'TechCorp',
        content: 'Vishnu delivered an exceptional mobile app that exceeded our expectations. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable.',
        rating: 5
    },
    {
        id: '2',
        name: 'Alex Rodriguez',
        role: 'Startup Founder',
        company: 'InnovateLabs',
        content: 'Working with Vishnu was a game-changer for our startup. He built our entire platform from scratch in record time without compromising on quality.',
        rating: 5
    },
    {
        id: '3',
        name: 'Priya Sharma',
        role: 'Engineering Lead',
        company: 'DataDriven Inc',
        content: 'His DevOps expertise helped us achieve 99.9% uptime and reduced our deployment time by 70%. Highly recommend for any serious project.',
        rating: 5
    },
    {
        id: '4',
        name: 'Michael Park',
        role: 'CTO',
        company: 'CloudScale',
        content: 'Vishnu\'s full-stack capabilities are impressive. He seamlessly handles everything from frontend animations to backend architecture.',
        rating: 5
    }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; isActive: boolean }> = ({ testimonial, isActive }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: isActive ? 1 : 0.5, scale: isActive ? 1 : 0.85, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`relative w-full max-w-2xl mx-auto ${isActive ? 'z-10' : 'z-0'}`}
        >
            <div className="glass-panel-intense p-8 md:p-12 rounded-2xl relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-neon-lime/20">
                    <Quote className="w-16 h-16" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-neon-lime fill-neon-lime' : 'text-gray-600'}`}
                        />
                    ))}
                </div>

                {/* Content */}
                <blockquote className="text-xl md:text-2xl font-exo text-white leading-relaxed mb-8 relative z-10">
                    "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-lime to-neon-cyan flex items-center justify-center text-black font-orbitron font-bold text-lg">
                        {testimonial.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-orbitron font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">
                            {testimonial.role} at <span className="text-neon-lime">{testimonial.company}</span>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-neon-lime/10 to-transparent rounded-tr-full" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-neon-cyan/10 to-transparent rounded-bl-full" />
            </div>
        </motion.div>
    );
};

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section id={SectionId.TESTIMONIALS} className="py-32 bg-carbon-gray relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-neon-lime/5 via-transparent to-transparent rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <ScrollReveal>
                    <SectionTitle title="Testimonials" subtitle="What People Say" />
                </ScrollReveal>

                {/* Testimonial carousel */}
                <div className="mt-16 relative">
                    <AnimatePresence mode="wait">
                        <TestimonialCard
                            key={testimonials[currentIndex].id}
                            testimonial={testimonials[currentIndex]}
                            isActive={true}
                        />
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-12">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full glass-panel-2 flex items-center justify-center text-gray-400 hover:text-neon-lime hover:border-neon-lime/50 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        setCurrentIndex(index);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'w-8 bg-neon-lime'
                                        : 'bg-gray-600 hover:bg-gray-400'
                                        }`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full glass-panel-2 flex items-center justify-center text-gray-400 hover:text-neon-lime hover:border-neon-lime/50 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-6">Trusted by developers worldwide</p>
                    <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
                        {['GitHub', 'LeetCode', 'LinkedIn', 'Firebase', 'Vercel'].map((brand) => (
                            <span key={brand} className="text-xl font-orbitron text-gray-400">
                                {brand}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
