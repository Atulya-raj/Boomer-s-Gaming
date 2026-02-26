import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const FoodSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

    }, { scope: containerRef });

    return (
        <section id="food" ref={containerRef} className="relative w-full min-h-[90vh] flex items-center justify-center py-20 px-4 md:px-8 bg-black">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/images/food.jpeg"
                    alt="Food and Cafe"
                    fill
                    className="object-cover saturate-150 contrast-110 brightness-110"
                />
                {/* Overlay gradient - significantly lighter */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60"></div>
            </div>

            {/* Content Card container - using glassmorphism */}
            <div className="relative z-10 w-full max-w-5xl mx-auto">
                <div ref={contentRef} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(236,72,153,0.15)] flex flex-col md:flex-row items-center gap-12">

                    <div className="flex-1 text-center md:text-left">
                        <span className="text-pink-400 font-bold tracking-widest uppercase mb-4 block">Fuel Up</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
                            THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">CAFE</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                            Level up your energy. From signature mocktails to loaded nachos, our Zomato District certified menu keeps you in the game without hitting pause.
                        </p>
                        <button className="px-8 py-4 bg-gradient-to-r from-pink-500 hover:from-pink-600 to-orange-500 hover:to-orange-600 text-white font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30">
                            VIEW MENU
                        </button>
                    </div>

                    <div className="flex-1 w-full aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                        {/* Mini showcase inside card - using same image or a different food close up if provided */}
                        <Image
                            src="/images/food.jpeg"
                            alt="Delicious gaming snacks"
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent pointer-events-none hover:opacity-0 transition-opacity duration-300"></div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FoodSection;
