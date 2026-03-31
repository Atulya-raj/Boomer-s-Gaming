'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const pcSpecs = [
    { label: 'GPU', value: 'NVIDIA RTX 4090 SUPER' },
    { label: 'CPU', value: 'Intel Core i9-14900K' },
    { label: 'RAM', value: '32 GB DDR5 5600MHz' },
    { label: 'Monitor', value: '27" 240Hz OLED' },
    { label: 'Storage', value: '2TB NVMe SSD' },
    { label: 'Cooling', value: 'Custom Liquid Loop' },
];

const NvidiaCertifiedBadge = () => (
    <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(118,185,0,0.2)]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M9.5 9.426v5.394c0 .39.216.748.558.932l4.5 2.476c.334.184.742.184 1.076 0l4.5-2.476c.342-.184.558-.542.558-.932V9.426c0-.39-.216-.748-.558-.932l-4.5-2.476a1.073 1.073 0 00-1.076 0l-4.5 2.476A1.074 1.074 0 009.5 9.426z" fill="#76B900" />
            <path d="M3.5 6.426v5.394c0 .39.216.748.558.932l4.5 2.476c.334.184.742.184 1.076 0" stroke="#76B900" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div>
            <span className="text-green-400 font-black text-sm tracking-[0.2em] uppercase block">NVIDIA</span>
            <span className="text-green-300/80 text-[10px] tracking-[0.15em] uppercase font-bold">Certified Center</span>
        </div>
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 blur-sm -z-10 animate-pulse" />
    </div>
);

const LogitechBadge = () => (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-md text-cyan-400 text-xs font-bold tracking-widest uppercase">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
        </svg>
        Co-powered by Logitech
    </div>
);

const ArsenalSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(containerRef.current,
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
            }
        );
    }, { scope: containerRef });

    return (
        <section id="arsenal" className="relative w-full bg-black">
            <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-24 px-4 md:px-8 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/gaming.png" alt="Gaming Setup" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                    {/* NVIDIA green ambient glow */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/8 rounded-full blur-[150px]" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Branding */}
                        <div className="flex-1 text-center lg:text-left">
                            <NvidiaCertifiedBadge />
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mt-8 mb-6 text-white uppercase tracking-tight leading-[0.9]">
                                The{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400">
                                    Arsenal
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
                                Equipped with NVIDIA-certified hardware delivering uncompromised frame rates, 4K Ray Tracing, and absolute immersion. This is premium gaming — no compromises.
                            </p>
                            <LogitechBadge />
                        </div>

                        {/* Right: PC Specs Card */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                {/* Top glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                                <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-green-400 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    PC Specifications
                                </h3>
                                <div className="space-y-4">
                                    {pcSpecs.map((spec, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{spec.label}</span>
                                            <span className="text-white font-semibold text-sm">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>
                                        <span>Peripherals by <strong className="text-cyan-400">Logitech</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArsenalSection;
