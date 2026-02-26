import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const MerchSection = () => {
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
        <section id="merch" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-black">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80"></div>
                {/* Subtle radial gradients to match the visual style */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
                <div ref={contentRef} className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-black mb-4 text-white uppercase tracking-tight">
                        Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Merch</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Elevate your setup and style with our premium custom PC builds and exclusive apparel.
                    </p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Card 1: Build your PC */}
                    <Link href="/merch-checkout?type=build-pc" className="group">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-orange-500/50 transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20">
                            <div className="relative w-full h-64 bg-black/50 overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                                    <svg className="w-20 h-20 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                </div>
                                {/* <Image src="/images/merch-pc-placeholder.jpg" alt="Build Your PC" fill className="object-cover group-hover:scale-105 transition-transform duration-700" /> */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full backdrop-blur-md inline-block mb-2">Hardware</span>
                                </div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">BUILD YOUR PC</h3>
                                <p className="text-gray-400 mb-6 font-medium">Custom rigs crafted for ultimate performance. Tell us your specs, and we will build your dream machine.</p>
                                <div className="mt-auto flex items-center text-orange-400 font-bold uppercase tracking-wide text-sm">
                                    <span>Get a Quote</span>
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: T-shirts */}
                    <Link href="/merch-checkout?type=tshirt" className="group">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-red-500/50 transition-all duration-500 h-full flex flex-col cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">
                            <div className="relative w-full h-64 bg-black/50 overflow-hidden">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                                    <svg className="w-20 h-20 opacity-50 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                {/* <Image src="/images/merch-tshirt-placeholder.jpg" alt="T-shirts" fill className="object-cover group-hover:scale-105 transition-transform duration-700" /> */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-4 left-6">
                                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded-full backdrop-blur-md inline-block mb-2">Apparel</span>
                                </div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">T-SHIRTS</h3>
                                <p className="text-gray-400 mb-6 font-medium">Rep the Boomer's Gaming brand. Premium quality cotton tees with exclusive esports designs.</p>
                                <div className="mt-auto flex items-center text-red-400 font-bold uppercase tracking-wide text-sm">
                                    <span>Grab Yours</span>
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MerchSection;
