'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LocationSelectorProps {
    onSelect: (location: 'pune' | 'coimbatore') => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelect }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<'pune' | 'coimbatore' | null>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { y: -40, opacity: 0, filter: 'blur(12px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" }
        )
        .fromTo(subtitleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        )
        .fromTo(cardsRef.current?.children || [],
            { y: 60, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "back.out(1.4)" },
            "-=0.4"
        );
    }, { scope: containerRef });

    const handleSelect = (location: 'pune' | 'coimbatore') => {
        setSelected(location);
        // Animate out
        const tl = gsap.timeline({
            onComplete: () => onSelect(location)
        });

        tl.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            duration: 0.8,
            ease: "power2.inOut"
        });
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        >
            {/* Animated background effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Pune glow - left */}
                <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[180px] animate-pulse" />
                {/* Coimbatore glow - right */}
                <div className="absolute top-1/2 right-[25%] translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
                {/* Center subtle glow */}
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-white/3 rounded-full blur-[120px]" />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center px-4 max-w-4xl w-full">
                {/* Logo / Brand */}
                <div className="mb-4">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 mx-auto animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                </div>

                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-4 tracking-tighter"
                    style={{
                        background: 'linear-gradient(to bottom right, #fff, #a0aec0, #cbd5e1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0px 4px 20px rgba(0,255,255,0.15))'
                    }}
                >
                    WELCOME TO BOOMER&apos;S
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-gray-400 text-lg md:text-xl text-center mb-12 md:mb-16 max-w-lg tracking-wide"
                >
                    Select your arena to enter
                </p>

                {/* Location Cards */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full max-w-3xl">

                    {/* Pune Card */}
                    <button
                        onClick={() => handleSelect('pune')}
                        disabled={selected !== null}
                        className={`group relative rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer text-left
                            ${selected === 'pune' 
                                ? 'border-cyan-400/80 shadow-[0_0_60px_rgba(34,211,238,0.4)] scale-[1.02]' 
                                : selected === 'coimbatore'
                                    ? 'border-white/5 opacity-40 scale-95'
                                    : 'border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:-translate-y-2'
                            }`}
                    >
                        <div className="relative aspect-[16/10] bg-gradient-to-br from-cyan-950/60 via-black to-slate-900/60 overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute inset-0 bg-[url('/images/landing.png')] bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                            
                            {/* Animated border glow on hover */}
                            <div className="absolute -inset-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

                            {/* Content */}
                            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-widest drop-shadow-md">PUNE</h3>
                                </div>
                                <p className="text-cyan-400 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase ml-[1.4rem]">Headquarters</p>
                                <p className="text-gray-500 text-xs mt-2 ml-[1.4rem] tracking-wide">Viman Nagar</p>
                            </div>

                            {/* Arrow indicator on hover */}
                            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </button>

                    {/* Coimbatore Card */}
                    <button
                        onClick={() => handleSelect('coimbatore')}
                        disabled={selected !== null}
                        className={`group relative rounded-2xl md:rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer text-left
                            ${selected === 'coimbatore'
                                ? 'border-purple-400/80 shadow-[0_0_60px_rgba(168,85,247,0.4)] scale-[1.02]'
                                : selected === 'pune'
                                    ? 'border-white/5 opacity-40 scale-95'
                                    : 'border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:-translate-y-2'
                            }`}
                    >
                        <div className="relative aspect-[16/10] bg-gradient-to-br from-purple-950/60 via-black to-indigo-900/60 overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute inset-0 bg-[url('/images/landing.png')] bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                            {/* Animated border glow on hover */}
                            <div className="absolute -inset-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

                            {/* Content */}
                            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-widest drop-shadow-md">COIMBATORE</h3>
                                </div>
                                <p className="text-purple-400 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase ml-[1.4rem]">New Arena</p>
                                <p className="text-gray-500 text-xs mt-2 ml-[1.4rem] tracking-wide">Tamil Nadu</p>
                            </div>

                            {/* Arrow indicator on hover */}
                            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>

                {/* Subtle hint */}
                <p className="text-gray-600 text-xs mt-8 tracking-widest uppercase animate-pulse">
                    You can switch locations anytime
                </p>
            </div>
        </div>
    );
};

export default LocationSelector;
