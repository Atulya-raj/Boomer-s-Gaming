import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const GamingSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(contentRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        if (cardsRef.current) {
            gsap.fromTo(cardsRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

    }, { scope: containerRef });

    return (
        <section id="gaming" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                {/* Parallax container could be added here if desired */}
                <Image
                    src="/images/gaming.png"
                    alt="Gaming Setup"
                    fill
                    className="object-cover fixed"
                    style={{ zIndex: -1 }} // Extremely hacky parallax but effective for pure CSS
                />
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div ref={contentRef} className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black mb-4 text-white uppercase tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Arsenal</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Equipped with the finest hardware to deliver uncompromised frame rates and absolute immersion.
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {/* Card 1 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 group">
                        <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                            <span className="text-cyan-400 font-bold text-xl">GPU</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">RTX 4090 SUPER</h3>
                        <p className="text-gray-400">4K Ray Tracing at 240Hz. Experience visuals as the developers intended.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 group">
                        <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                            <span className="text-purple-400 font-bold text-xl">PS5</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">PS5 PRO ZONE</h3>
                        <p className="text-gray-400">DualSense Haptics. 8K Output. Exclusive titles in a dedicated lounge.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 group">
                        <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                            <span className="text-green-400 font-bold text-xl">MON</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">240Hz OLED</h3>
                        <p className="text-gray-400">Zero latency displays for competitive dominance. Every millisecond counts.</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 transition-all duration-300 group">
                        <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6">
                            <span className="text-pink-400 font-bold text-xl">AUD</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">HYPERX CLOUD III</h3>
                        <p className="text-gray-400">Spatial Audio. Noise Cancellation. Hear the enemy before they see you.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GamingSection;
