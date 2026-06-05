'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RefuelSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();
        // Replace ScrollTrigger with simple entrance animations
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        )
            .fromTo(cardRef.current,
                { scale: 0.8, opacity: 0, rotationX: -20 },
                { scale: 1, opacity: 1, rotationX: 0, duration: 1 },
                "-=0.5"
            );

    }, { scope: containerRef });

    return (
        <section id="refuel" ref={containerRef} className="w-full relative flex flex-col items-center justify-center p-8 md:py-24 pointer-events-auto">
            {/* Section Background */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
                {/* Purplish cloudish gradients for District theme */}
                <div className="absolute top-1/4 left-1/4 w-[30rem] md:w-[45rem] h-[30rem] md:h-[45rem] bg-fuchsia-600/30 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[25rem] md:w-[40rem] h-[25rem] md:h-[40rem] bg-purple-600/30 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen"></div>
                
                {/* Subtle image overlay */}
                <img src="/images/happy-hour-promo.jpg" alt="Happy Hours Promo" className="w-full h-full object-cover opacity-20 mix-blend-overlay blur-sm scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950/95"></div>
            </div>

            <div ref={titleRef} className="flex flex-col items-center mb-12 relative z-10">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 mb-6 flex items-center gap-3">
                    <img src="/images/district-logo.png" alt="District by Zomato" className="h-6 object-contain" />
                    <span className="text-white/80 text-xs font-semibold tracking-widest uppercase border-l border-white/20 pl-3">Exclusive Event</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-500 text-center">
                    HAPPY HOURS
                </h2>
            </div>

            <div
                ref={cardRef}
                className="bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-2xl border border-purple-500/30 p-5 md:p-8 lg:p-12 rounded-3xl max-w-5xl w-full shadow-[0_0_80px_rgba(168,85,247,0.2)] relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                    <div className="flex-1">
                        <p className="text-gray-300/90 mb-8 text-lg md:text-xl leading-relaxed font-light tracking-wide">
                            Buy one hour of gaming and get to play two hours! Level up your weekdays with our exclusive 1+1 deals on PC and Console gaming.
                        </p>
                        <ul className="space-y-4 text-sm md:text-base text-gray-300/80 mb-10 font-normal">
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">📅</span> 
                                Every Mon, Tue & Wed
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">🎮</span> 
                                Buy 1 Hour, Get 2 Hours
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">🕹️</span> 
                                PC & Console (1 to 4 Joysticks)
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">🎟️</span> 
                                Prices Starting at ₹100
                            </li>
                        </ul>
                        <a href="https://www.district.in/events/boomers-gaming-caf-2025-buy-tickets" target="_blank" rel="noopener noreferrer" className="inline-block text-center bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_-10px_rgba(192,38,211,0.6)] tracking-widest text-sm w-full md:w-auto">
                            BOOK ON DISTRICT
                        </a>
                    </div>

                    {/* Visual Showcase */}
                    <div className="flex-1 w-full h-64 md:h-[28rem] relative flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                        <img src="/images/happy-hour-interior.jpg" alt="Gaming Cafe Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none z-20">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                1+1 Deals
                            </div>
                            <div className="bg-purple-600/90 backdrop-blur-md border border-purple-400/50 text-white text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                District Exclusive
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RefuelSection;
