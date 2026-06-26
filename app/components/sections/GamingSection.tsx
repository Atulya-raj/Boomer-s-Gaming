'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────

const pcSpecs = [
    { label: 'GPU', value: 'NVIDIA RTX 4090 SUPER' },
    { label: 'CPU', value: 'Intel Core i9-14900K' },
    { label: 'RAM', value: '32 GB DDR5 5600MHz' },
    { label: 'Monitor', value: '27" 240Hz OLED' },
    { label: 'Storage', value: '2TB NVMe SSD' },
    { label: 'Cooling', value: 'Custom Liquid Loop' },
];

const pcGames = [
    { name: 'Valorant', tag: 'F2P', image: '/images/games/valorant.png' },
    { name: 'Dota 2', tag: 'F2P', image: '/images/games/dota2.png' },
    { name: 'GTA 5', tag: 'P2P', image: '/images/games/gta5.png' },
    { name: 'CS2', tag: 'F2P', image: '/images/games/cs2.png' },
    { name: 'Apex Legends', tag: 'F2P', image: '/images/games/apex.png' },
];

const ps5Games = [
    { name: 'FIFA', image: '/images/games/fifa.png' },
    { name: 'WWE', image: '/images/games/wwe.png' },
    { name: 'Tekken', image: '/images/games/tekken.png' },
    { name: 'Mortal Kombat', image: '/images/games/mortalkombat.png' },
    { name: 'Dirt Race 5', image: '/images/games/dirtrace.png' },
];

const simGames = [
    'Forza', 'Horizon 5', 'F1', 'Gran Turismo', 'Euro Truck Simulator', 'Assetto Corsa',
];

// ─── Sub-Components ──────────────────────────────────────────

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

const GameCard = ({ name, tag, image, index }: { name: string; tag?: string; image: string; index: number }) => (
    <div
        className="game-card group relative rounded-2xl overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.15)] cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="relative w-full aspect-[3/4]">
            {/* Game cover image */}
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay — lighter on bottom for name readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 group-hover:from-black/80 group-hover:via-black/10 group-hover:to-transparent transition-colors duration-500" />
            {/* Game name at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {name}
                </h4>
            </div>
            {/* Tag badge */}
            {tag && (
                <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full backdrop-blur-md shadow-lg ${tag === 'F2P' ? 'bg-green-500/90 text-white' : 'bg-blue-500/90 text-white'}`}>
                        {tag}
                    </span>
                </div>
            )}
            {/* Hover border glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-white/20 rounded-2xl" />
        </div>
    </div>
);

// ─── Main Component ──────────────────────────────────────────

const GamingSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pcGamesRef = useRef<HTMLDivElement>(null);
    const ps5Ref = useRef<HTMLDivElement>(null);
    const simRef = useRef<HTMLDivElement>(null);
    const vrRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // PC Games
        if (pcGamesRef.current) {
            gsap.fromTo(pcGamesRef.current.querySelectorAll('.game-card'),
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
                    scrollTrigger: { trigger: pcGamesRef.current, start: "top 80%" }
                }
            );
        }

        // PS5
        if (ps5Ref.current) {
            gsap.fromTo(ps5Ref.current.querySelectorAll('.game-card'),
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
                    scrollTrigger: { trigger: ps5Ref.current, start: "top 80%" }
                }
            );
        }

        // Sim Racing
        gsap.fromTo(simRef.current,
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: simRef.current, start: "top 80%" }
            }
        );

        // VR2
        gsap.fromTo(vrRef.current,
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: vrRef.current, start: "top 80%" }
            }
        );

    }, { scope: containerRef });

    return (
        <section id="gaming" ref={containerRef} className="relative w-full bg-black">



            {/* ══════════════════════════════════════════════════════════
               2. PC GAMES SHOWCASE
            ══════════════════════════════════════════════════════════ */}
            <div ref={pcGamesRef} className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Full-section background — game art collage */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/games/pc-games-banner.png" alt="PC Games background" fill sizes="100vw" className="object-cover scale-110 blur-[2px]" />
                    <div className="absolute inset-0 bg-black/75" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-14">
                        <span className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs block mb-4">PC Gaming</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                            PC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Games</span>
                        </h2>
                        <p className="text-gray-300/80 max-w-xl mx-auto">
                            From competitive esports to open-world adventures — play the biggest titles on NVIDIA RTX-powered rigs.
                        </p>
                    </div>

                    {/* Game Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-10">
                        {pcGames.map((game, i) => (
                            <GameCard key={game.name} name={game.name} tag={game.tag} image={game.image} index={i} />
                        ))}
                    </div>

                    {/* See All Games CTA */}
                    <div className="text-center">
                        <a href="https://docs.google.com/spreadsheets/d/1YUhqsnEe7z2WygTlMWbrHNPG0nV_OoXINlzyKIkKWiY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-cyan-500/50 rounded-full backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                                <span className="text-white font-bold uppercase tracking-widest text-sm">See All Games</span>
                                <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </div>


            {/* ══════════════════════════════════════════════════════════
               3. PS5 GAMES SHOWCASE
            ══════════════════════════════════════════════════════════ */}
            <div ref={ps5Ref} className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Full-section background — PS5 game art collage */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image src="/images/games/ps5-games-banner.png" alt="PS5 Games background" fill sizes="100vw" className="object-cover scale-110 blur-[2px]" />
                    <div className="absolute inset-0 bg-black/75" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-14">
                        <span className="text-blue-400 font-bold tracking-[0.3em] uppercase text-xs block mb-4">Console Gaming</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                            PS5 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Games</span>
                        </h2>
                        <p className="text-gray-300/80 max-w-xl mx-auto">
                            DualSense haptics. 4K HDR. Exclusive titles in a dedicated lounge environment — the ultimate console experience.
                        </p>
                    </div>

                    {/* Game Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 mb-10">
                        {ps5Games.map((game, i) => (
                            <GameCard key={game.name} name={game.name} image={game.image} index={i} />
                        ))}
                    </div>

                    {/* See All Games CTA */}
                    <div className="text-center">
                        <a href="https://docs.google.com/spreadsheets/d/1YUhqsnEe7z2WygTlMWbrHNPG0nV_OoXINlzyKIkKWiY/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-blue-500/50 rounded-full backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                                <span className="text-white font-bold uppercase tracking-widest text-sm">See All Games</span>
                                <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>
            </div>


            {/* ══════════════════════════════════════════════════════════
               4. SPECIALIZED EXPERIENCES: SIM RACING & PS VR2
            ══════════════════════════════════════════════════════════ */}
            <div className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
                {/* Ambient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-900/15 rounded-full blur-[160px] -translate-y-1/2" />
                    <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[160px] -translate-y-1/2" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        
                        {/* Left: Sim Racing */}
                        <div ref={simRef} className="flex flex-col">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-bold tracking-widest uppercase mb-6 self-start">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                                </svg>
                                Logitech Simulation
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-[0.95]">
                                SIM <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-lime-400">Racing</span>
                            </h2>
                            <p className="text-gray-300 text-base mb-6">
                                Feel every corner, every gear shift. Our Logitech-powered simulation rigs deliver the most immersive racing experience outside a real cockpit.
                            </p>

                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video mb-6">
                                <Image src="/images/games/simracing.jpg" alt="Logitech Sim Racing Setup" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-5">
                                    <p className="text-white font-black text-lg uppercase tracking-wider mb-1">Cockpit Ready</p>
                                    <p className="text-gray-400 text-xs">Logitech G Pro Racing Wheel • Triple Monitor Setup</p>
                                </div>
                                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 -z-10 blur-sm" />
                            </div>

                            {/* Branch availability */}
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-gray-300 font-medium">Available at <strong className="text-white">Coimbatore</strong> &amp; <strong className="text-white">Pune</strong></span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    <span className="text-amber-300/80 font-medium">🚀 Cockpit Simulation coming to Coimbatore in 2-3 months!</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: PS VR2 */}
                        <div ref={vrRef} className="flex flex-col h-full">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-bold tracking-widest uppercase mb-6 self-start">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 10a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                    <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" />
                                    <path d="M6 8V6m12 2V6" />
                                </svg>
                                Virtual Reality
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4 leading-[0.95]">
                                Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">PS VR2</span>
                            </h2>
                            <p className="text-gray-300 text-base mb-6">
                                Step into worlds beyond imagination. PlayStation VR2 delivers the most immersive virtual reality experience with OLED HDR displays and eye tracking.
                            </p>

                            <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 aspect-video bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 mb-6 flex-grow min-h-[200px]">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl mb-3">🥽</div>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest px-4">No setup required — just pure, mind-blowing immersion.</p>
                                    </div>
                                </div>
                                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 -z-10 blur-md animate-pulse" />
                            </div>

                            {/* Feature pills */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {['OLED HDR', 'Eye Tracking', '3D Haptics', '110° FOV', '4K Resolution'].map((feat) => (
                                    <span key={feat} className="px-3 py-1.5 bg-white/5 border border-purple-500/20 text-purple-300 text-[10px] font-bold tracking-wider uppercase rounded-full backdrop-blur-md">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* ══════════════════════════════════════════════════════════
               6. LOGITECH PERIPHERALS BANNER
            ══════════════════════════════════════════════════════════ */}
            <div className="relative py-12 px-4 md:px-8 border-t border-b border-white/5">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                                <path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
                            </svg>
                            <span><strong className="text-white">Headphones</strong> by Logitech</span>
                        </div>
                        <div className="hidden md:block w-[1px] h-6 bg-white/10" />
                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h4m-2-2v4M15 13h.01M18 11h.01" />
                            </svg>
                            <span><strong className="text-white">Keyboards</strong> by Logitech</span>
                        </div>
                        <div className="hidden md:block w-[1px] h-6 bg-white/10" />
                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
                                <path d="M4 4a2 2 0 012-2h4l2 2h4a2 2 0 012 2v2" /><ellipse cx="12" cy="14" rx="8" ry="6" />
                            </svg>
                            <span><strong className="text-white">Mice</strong> by Logitech</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default GamingSection;
