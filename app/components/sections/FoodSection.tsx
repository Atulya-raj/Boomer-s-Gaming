import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Placeholder images for the gallery — user will provide real ones later
const cafeGalleryImages = [
    { src: "/images/food.jpeg", alt: "Cafe ambiance" },
    { src: "/images/food.jpeg", alt: "Signature dishes" },
    { src: "/images/food.jpeg", alt: "Fresh beverages" },
];

const FoodSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

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

        // Stagger the gallery images
        if (galleryRef.current) {
            gsap.fromTo(galleryRef.current.children,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top 85%",
                    }
                }
            );
        }

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
                        <Link href="/cafe-menu">
                            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 hover:from-pink-600 to-orange-500 hover:to-orange-600 text-white font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-pink-500/30">
                                VIEW MENU
                            </button>
                        </Link>
                    </div>

                    {/* Mini Gallery inside card */}
                    <div ref={galleryRef} className="flex-1 w-full grid grid-cols-2 gap-3">
                        {/* Large featured image */}
                        <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 shadow-2xl group">
                            <Image
                                src={cafeGalleryImages[0].src}
                                alt={cafeGalleryImages[0].alt}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
                        </div>
                        {/* Two smaller images */}
                        {cafeGalleryImages.slice(1).map((img, i) => (
                            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/5 shadow-xl group">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/15 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FoodSection;
