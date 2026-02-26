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
        <section ref={containerRef} className="w-full flex flex-col items-center justify-center p-8 pointer-events-auto">
            <h2
                ref={titleRef}
                className="text-5xl md:text-8xl font-black text-orange-500 mb-12 mix-blend-difference text-center"
            >
                REFUEL
            </h2>

            <div
                ref={cardRef}
                className="bg-zinc-900/80 backdrop-blur-xl border border-orange-500/30 p-8 rounded-3xl max-w-4xl w-full shadow-[0_0_50px_rgba(249,115,22,0.2)]"
            >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h3 className="text-3xl font-bold text-white mb-4">The Zomato District</h3>
                        <p className="text-gray-300 mb-6">
                            Book your spot in the VIP lounge. Unlock exclusive happy hours, reserve PC blocks for your squad, and order gourmet fuel directly to your station.
                        </p>
                        <ul className="space-y-2 text-sm text-gray-400 mb-8">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Live Table Availability
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Exclusive App-Only Menu
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span> 1-Click Tournament Registration
                            </li>
                        </ul>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                            BOOK NOW ON ZOMATO
                        </button>
                    </div>

                    {/* Decorative mock UI element */}
                    <div className="flex-1 w-full h-64 bg-gradient-to-br from-gray-800 to-black rounded-xl border border-white/5 flex items-center justify-center overflow-hidden relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/1024px-Zomato_Logo.svg.png')] bg-center bg-no-repeat bg-contain"></div>
                        <span className="text-white/50 text-xs tracking-widest uppercase">Zomato Integration</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RefuelSection;
