import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

const LandingSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Subtle scale on background for a premium feel
        gsap.to(bgRef.current, {
            scale: 1.05,
            duration: 10,
            ease: "none",
            repeat: -1,
            yoyo: true
        });

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0, filter: 'blur(10px)' },
            { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: "power3.out" }
        )
            .fromTo(subtitleRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
                "-=1"
            )
            .fromTo(cardsRef.current,
                { y: 40, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
                "-=0.8"
            )
            .fromTo(indicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                "-=0.5"
            );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden py-16 xl:py-20">
            {/* Background Image Container */}
            <div ref={bgRef} className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/images/landing.png"
                    alt="Boomer's Gaming Lounge"
                    fill
                    className="object-cover brightness-105"
                    priority
                />
                {/* Lighter, softer Gradient Overlay for readability while keeping it bright */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-purple-900/40 to-black/80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4 lg:px-8 mt-12 mb-20 md:mt-16 md:mb-24">

                {/* Hero Text */}
                <div className="flex flex-col items-center mb-8 md:mb-16">
                    <h1
                        ref={titleRef}
                        className="text-6xl md:text-8xl lg:text-9xl font-black mb-2 md:mb-4 tracking-tighter text-center"
                        style={{
                            background: 'linear-gradient(to bottom right, #fff, #a0aec0, #cbd5e1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0px 4px 20px rgba(0,255,255,0.2))'
                        }}
                    >
                        BOOMER'S
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-lg md:text-2xl lg:text-3xl font-bold text-cyan-400 tracking-[0.2em] md:tracking-[0.3em] text-center"
                        style={{ textShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                    >
                        ENTER THE CLOUD
                    </p>
                </div>

                {/* Location Trailers Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 w-full max-w-6xl mx-auto">

                    {/* Pune Trailer Card */}
                    <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] hover:border-cyan-400/50 hover:-translate-y-2">
                        {/* Video Overlay Gradient to ensure text is readable */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-70"></div>

                        {/* The Video Element */}
                        <video
                            src="https://www.w3schools.com/html/mov_bbb.mp4"
                            className="w-full h-full object-cover aspect-video md:aspect-[16/10] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />

                        {/* Title and Overlay Info */}
                        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-20 transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
                                <h3 className="text-2xl md:text-4xl font-black text-white tracking-widest drop-shadow-md">PUNE</h3>
                            </div>
                            <p className="text-cyan-400 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase drop-shadow-sm ml-6 md:ml-[1.4rem]">Headquarters</p>
                        </div>
                    </div>

                    {/* Coimbatore Trailer Card */}
                    <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:border-purple-400/50 hover:-translate-y-2">
                        {/* Video Overlay Gradient to ensure text is readable */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-70"></div>

                        {/* The Video Element */}
                        <video
                            src="https://www.w3schools.com/html/mov_bbb.mp4"
                            className="w-full h-full object-cover aspect-video md:aspect-[16/10] opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />

                        {/* Title and Overlay Info */}
                        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 z-20 transform transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-1">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                                <h3 className="text-2xl md:text-4xl font-black text-white tracking-widest drop-shadow-md">COIMBATORE</h3>
                            </div>
                            <p className="text-purple-400 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase drop-shadow-sm ml-6 md:ml-[1.4rem]">New Arena</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div ref={indicatorRef} className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                <span className="text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest mb-3 md:mb-4 drop-shadow-md">DIVE IN</span>
                <div className="w-[1px] h-12 md:h-16 bg-cyan-900/50 overflow-hidden relative">
                    <div className="w-full h-1/2 bg-cyan-400 absolute top-0 left-0 animate-scroll-drop shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-drop {
                    0% { top: -50%; }
                    100% { top: 100%; }
                }
                .animate-scroll-drop {
                    animation: scroll-drop 1.5s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default LandingSection;
