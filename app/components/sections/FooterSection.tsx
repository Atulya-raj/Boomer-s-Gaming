"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(contentRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom bottom",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: containerRef });

    return (
        <footer ref={containerRef} className="relative w-full min-h-[60svh] flex flex-col justify-end bg-black">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/images/footer.jpeg"
                    alt="Lounge area"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-80 saturate-150 contrast-125 brightness-125"
                />
                {/* Overlay gradient - fades from black at top to let image show, then black at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/80"></div>
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-color-dodge"></div>
            </div>

            <div ref={contentRef} className="relative z-10 w-full container mx-auto px-8 pb-8 pt-32">
                {/* Partners / High-End Brands */}
                <div className="flex flex-col items-center justify-center mb-20 border-b border-white/10 pb-16">
                    <div className="text-cyan-500/60 tracking-[0.4em] text-xs font-bold mb-8 uppercase text-center w-full relative">
                        <span className="bg-black px-4 relative z-10">Powered By Elite Setups</span>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500">
                        <h3 className="text-2xl tracking-widest font-bold text-gray-400 hover:text-green-500 transition-colors">NVIDIA</h3>
                        <h3 className="text-2xl tracking-widest font-bold text-gray-400 hover:text-blue-500 transition-colors">LOGITECH G</h3>
                        <h3 className="text-2xl tracking-widest font-bold text-gray-400 hover:text-orange-500 transition-colors">ROG</h3>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-sm text-gray-400 gap-10 md:gap-8 w-full">
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
                        <h4 className="text-white font-bold mb-3 md:mb-2 tracking-wider">LOCATIONS</h4>
                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=Boomers+Gaming+Cafe,+Viman+Nagar,+Pune" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block hover:text-cyan-400 transition-colors cursor-pointer"
                        >
                            Viman Nagar, Pune
                        </a>
                        <a 
                            href="https://www.google.com/maps/search/?api=1&query=Boomers+Gaming+Cafe,+Coimbatore,+TN" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block hover:text-cyan-400 transition-colors cursor-pointer mt-2 md:mt-1"
                        >
                            Coimbatore, TN
                        </a>
                    </div>

                    <div className="flex-1 flex flex-col items-center text-center w-full">
                        <h2 className="text-2xl font-black tracking-tighter text-white mb-1 md:mb-2">BOOMER&apos;S</h2>
                        <span className="text-xs tracking-[0.2em] text-cyan-500">GAMING & CAFE</span>
                        <p className="mt-4 text-[10px] md:text-xs text-gray-500 max-w-[200px] md:max-w-none">
                            &copy; {new Date().getFullYear()} Boomer&apos;s Gaming. All rights reserved.
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right w-full">
                        <h4 className="text-white font-bold mb-3 md:mb-2 tracking-wider">CONNECT</h4>
                        <div className="flex flex-col gap-2 items-center md:items-end">
                            <a 
                                href="https://www.instagram.com/boomersgamingcafe_official/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                                </svg>
                                Instagram
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
