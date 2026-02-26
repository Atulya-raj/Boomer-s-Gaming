'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ArsenalSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Removed ScrollTrigger fade animations since visibility is now 
        // controlled at the parent (ScrollSequence) level via currentFrame.
        // We'll just run a simple entrance animation when mounted.
        gsap.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        gsap.fromTo(gridRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full flex flex-col items-center justify-center p-8 pointer-events-auto">
            <h2
                ref={titleRef}
                className="text-5xl md:text-8xl font-black text-white mb-16 mix-blend-difference text-center"
            >
                THE ARSENAL
            </h2>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                {/* Hardware Card 1 */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-cyan-500/50 transition-colors duration-300 group">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-2 group-hover:text-cyan-300">RTX 4090 SUPER</h3>
                    <p className="text-gray-300 text-sm">
                        Uncompromised frames. 4K Ray Tracing at 240Hz. Experience visuals as the developers intended.
                    </p>
                </div>

                {/* Hardware Card 2 */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-purple-500/50 transition-colors duration-300 group">
                    <h3 className="text-2xl font-bold text-purple-400 mb-2 group-hover:text-purple-300">PS5 PRO ZONE</h3>
                    <p className="text-gray-300 text-sm">
                        DualSense Haptics. 8K Output. Exclusive titles in a dedicated lounge environment.
                    </p>
                </div>

                {/* Hardware Card 3 */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-green-500/50 transition-colors duration-300 group">
                    <h3 className="text-2xl font-bold text-green-400 mb-2 group-hover:text-green-300">240Hz OLED</h3>
                    <p className="text-gray-300 text-sm">
                        Zero latency displays for competitive dominance. Every millisecond counts.
                    </p>
                </div>

                {/* Hardware Card 4 */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-xl hover:border-pink-500/50 transition-colors duration-300 group">
                    <h3 className="text-2xl font-bold text-pink-400 mb-2 group-hover:text-pink-300">HYPERX CLOUD III</h3>
                    <p className="text-gray-300 text-sm">
                        Spatial Audio. Noise Cancellation. Hear the enemy before they see you.
                    </p>
                </div>
            </div>

            <button className="mt-16 px-8 py-4 bg-white text-black font-bold tracking-widest hover:bg-cyan-400 hover:text-white transition-all duration-300 skew-x-[-10deg]">
                <span className="skew-x-[10deg] inline-block">VIEW FULL SPECS</span>
            </button>

        </section>
    );
};

export default ArsenalSection;
