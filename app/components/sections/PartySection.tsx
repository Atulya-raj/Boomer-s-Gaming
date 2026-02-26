import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const PartySection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(contentRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
        );

    }, { scope: containerRef });

    return (
        <section id="party" ref={containerRef} className="relative w-full min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-black">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/images/party.jpeg"
                    alt="Party Booking"
                    fill
                    className="object-cover saturate-[1.3] brightness-125 contrast-110"
                />
                {/* Overlay gradient - strong gradient to make text readable but lighter overall */}
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/30 via-black/50 to-black/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
            </div>

            {/* Content Container */}
            <div ref={contentRef} className="relative z-10 w-full max-w-4xl mx-auto text-center">
                <div className="inline-block mb-6 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                    <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">Host Your Event</span>
                </div>

                <h2 className="text-5xl md:text-8xl font-black mb-6 text-white uppercase tracking-tight leading-none text-shadow-lg shadow-black">
                    LEVEL UP <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">YOUR PARTY</span>
                </h2>

                <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
                    Birthdays, Corporate Events, or just an epic gaming night with the squad. Book the ultimate immersive experience today.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                    <button className="flex-1 px-8 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                        BOOK A PRIVATE CABIN
                    </button>
                    <button className="flex-1 px-8 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl transition-all hover:bg-white/20 hover:border-white/50">
                        GET A QUOTE
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PartySection;
