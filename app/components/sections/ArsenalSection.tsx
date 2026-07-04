"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const puneSpecs = [
    { label: 'GPU', value: 'Up to NVIDIA RTX 4070 SUPER' },
    { label: 'CPU', value: 'Up to AMD Ryzen 7 9700X' },
    { label: 'RAM', value: '32 GB DDR5 5200MHz' },
    { label: 'Storage', value: '1TB Gen4 NVMe SSD' },
    { label: 'Monitor', value: '240Hz Refresh Rate' },
];

const coimbatoreSpecs = [
    { label: 'GPU', value: 'Up to NVIDIA RTX 3070' },
    { label: 'CPU', value: 'Up to AMD Ryzen 5 5600X' },
    { label: 'RAM', value: '16 GB DDR4 3600MHz' },
    { label: 'Storage', value: '512GB NVMe SSD' },
    { label: 'Monitor', value: '180Hz Refresh Rate' },
];

const NvidiaCertifiedBadge = () => (
    <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-md shadow-[0_0_30px_rgba(118,185,0,0.2)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#76B900" viewBox="0 0 16 16">
          <path d="M1.635 7.146S3.08 5.012 5.97 4.791v-.774C2.77 4.273 0 6.983 0 6.983s1.57 4.536 5.97 4.952v-.824c-3.23-.406-4.335-3.965-4.335-3.965M5.97 9.475v.753c-2.44-.435-3.118-2.972-3.118-2.972S4.023 5.958 5.97 5.747v.828h-.004c-1.021-.123-1.82.83-1.82.83s.448 1.607 1.824 2.07M6 2l-.03 2.017A7 7 0 0 1 6.252 4c3.637-.123 6.007 2.983 6.007 2.983s-2.722 3.31-5.557 3.31q-.39-.002-.732-.065v.883q.292.039.61.04c2.638 0 4.546-1.348 6.394-2.943.307.246 1.561.842 1.819 1.104-1.757 1.47-5.852 2.657-8.173 2.657a7 7 0 0 1-.65-.034V14H16l.03-12zm-.03 3.747v-.956a6 6 0 0 1 .282-.015c2.616-.082 4.332 2.248 4.332 2.248S8.73 9.598 6.743 9.598c-.286 0-.542-.046-.773-.123v-2.9c1.018.123 1.223.572 1.835 1.593L9.167 7.02s-.994-1.304-2.67-1.304a5 5 0 0 0-.527.031"/>
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
        <section id="setup" className="relative w-full bg-black">
            <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/gaming.png" alt="Gaming Setup" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
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
                                    Setup
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-8">
                                Equipped with NVIDIA-certified hardware delivering uncompromised frame rates, 4K Ray Tracing, and absolute immersion. This is premium gaming — no compromises.
                            </p>
                            <LogitechBadge />
                        </div>

                        {/* Right: PC Specs Cards */}
                        <div className="flex-1 w-full max-w-lg space-y-6">
                            {/* Pune Specs */}
                            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-green-400 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    Pune Specifications
                                </h3>
                                <div className="space-y-3">
                                    {puneSpecs.map((spec, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{spec.label}</span>
                                            <span className="text-white font-semibold text-sm text-right max-w-[70%]">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Coimbatore Specs */}
                            <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-cyan-400 mb-6 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                    Coimbatore Specifications
                                </h3>
                                <div className="space-y-3">
                                    {coimbatoreSpecs.map((spec, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{spec.label}</span>
                                            <span className="text-white font-semibold text-sm text-right max-w-[70%]">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5 pt-4 border-t border-white/5">
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
