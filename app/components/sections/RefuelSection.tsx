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
                {/* Purplish cloudish gradients */}
                <div className="absolute top-1/4 left-1/4 w-[30rem] md:w-[45rem] h-[30rem] md:h-[45rem] bg-purple-700/30 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[25rem] md:w-[40rem] h-[25rem] md:h-[40rem] bg-indigo-600/20 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen"></div>
                
                {/* Subtle image overlay */}
                <img src="/images/happy-hour-promo.jpg" alt="Happy Hours Promo" className="w-full h-full object-cover opacity-25 mix-blend-overlay blur-sm scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/60 to-zinc-950/90"></div>
            </div>

            <h2
                ref={titleRef}
                className="text-5xl md:text-8xl font-black text-orange-500 mb-12 mix-blend-difference text-center relative z-10"
            >
                HAPPY HOURS
            </h2>

            <div
                ref={cardRef}
                className="bg-gradient-to-br from-zinc-900/95 to-black/95 backdrop-blur-2xl border border-orange-500/20 p-5 md:p-8 lg:p-12 rounded-3xl max-w-5xl w-full shadow-[0_0_80px_rgba(249,115,22,0.15)] relative overflow-hidden"
            >
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                    <div className="flex-1">
                        {/* Removed duplicate Happy Hours heading */}
                        <p className="text-gray-300 mb-8 text-lg md:text-xl leading-relaxed font-medium">
                            Book your spot in the VIP lounge and unlock exclusive happy hour deals. Reserve PC blocks for your squad and order gourmet fuel directly to your station through our Zomato District integration.
                        </p>
                        <ul className="space-y-3 text-sm md:text-base text-gray-400 mb-10 font-semibold tracking-wide">
                            <li className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span> Live Table Availability
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span> Exclusive App-Only Menu
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span> 1-Click Tournament Registration
                            </li>
                        </ul>
                        <a href="https://www.district.in/events/boomers-gaming-caf-2025-buy-tickets" target="_blank" rel="noopener noreferrer" className="inline-block text-center bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_-10px_rgba(249,115,22,0.6)] tracking-widest text-sm w-full md:w-auto">
                            BOOK NOW ON ZOMATO
                        </a>
                    </div>

                    {/* Visual Showcase */}
                    <div className="flex-1 w-full h-64 md:h-96 relative flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                        <img src="/images/happy-hour-interior.jpg" alt="Gaming Cafe Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none z-20">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                Premium Ambience
                            </div>
                            <div className="bg-orange-500/90 backdrop-blur-md text-black text-xs font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                1+1 Deals
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RefuelSection;
