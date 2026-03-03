"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ─── Game Data ───────────────────────────────────────────────

interface Game {
    name: string;
    genre: string;
    color: string;
}

const ps5Games: Game[] = [
    { name: 'FIFA', genre: 'Sports', color: 'from-green-400 to-emerald-600' },
    { name: 'WWE 2K24', genre: 'Wrestling', color: 'from-red-500 to-red-700' },
    { name: 'Tekken 8', genre: 'Fighting', color: 'from-purple-500 to-indigo-600' },
    { name: 'Mortal Kombat 1', genre: 'Fighting', color: 'from-amber-500 to-red-600' },
    { name: 'Dirt Race 5', genre: 'Racing', color: 'from-orange-500 to-amber-600' },
    { name: 'Spider-Man 2', genre: 'Action-Adventure', color: 'from-red-600 to-blue-600' },
    { name: 'God of War Ragnarök', genre: 'Action-Adventure', color: 'from-blue-700 to-slate-600' },
    { name: 'Horizon Forbidden West', genre: 'Open World RPG', color: 'from-orange-500 to-green-600' },
    { name: 'Gran Turismo 7', genre: 'Racing', color: 'from-blue-500 to-cyan-500' },
    { name: 'Uncharted: Legacy of Thieves', genre: 'Action-Adventure', color: 'from-amber-600 to-yellow-700' },
    { name: 'Ratchet & Clank: Rift Apart', genre: 'Platformer', color: 'from-purple-500 to-pink-500' },
    { name: 'The Last of Us Part I', genre: 'Action-Adventure', color: 'from-green-700 to-emerald-800' },
    { name: 'Demon\'s Souls', genre: 'Action RPG', color: 'from-slate-500 to-blue-700' },
    { name: 'Returnal', genre: 'Roguelike Shooter', color: 'from-cyan-600 to-purple-700' },
    { name: 'Astro Bot', genre: 'Platformer', color: 'from-blue-400 to-indigo-500' },
    { name: 'NBA 2K24', genre: 'Sports', color: 'from-orange-500 to-red-500' },
];

// ─── Component ───────────────────────────────────────────────

export default function PS5GamesPage() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(headerRef.current,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );

        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.6, stagger: 0.06, ease: "power2.out", delay: 0.5,
                }
            );
        }
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-4 md:left-8 z-[100] p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-full backdrop-blur-xl transition-all group flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:-translate-x-1 transition-transform group-hover:text-blue-400">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="hidden md:block text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">Back</span>
            </button>

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px]" />
                <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-indigo-900/8 rounded-full blur-[140px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="6" y="11" width="12" height="7" rx="1" />
                            <path d="M12 11V7a3 3 0 00-3-3H9a3 3 0 00-3 3v4" />
                            <circle cx="9" cy="14.5" r="1" fill="currentColor" />
                            <circle cx="15" cy="14.5" r="1" fill="currentColor" />
                        </svg>
                        PlayStation 5
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                        PS5{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                            GAMES
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-2">
                        DualSense haptics. 4K HDR. The ultimate console gaming library at Boomer&apos;s Gaming — all in a dedicated PS5 lounge.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Peripherals co-powered by <strong className="text-cyan-400">Logitech</strong>
                    </p>
                </div>

                {/* Games count indicator */}
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        {ps5Games.length} Games Available
                    </span>
                </div>

                {/* Games Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                    {ps5Games.map((game) => (
                        <div
                            key={game.name}
                            className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
                        >
                            {/* Color banner top */}
                            <div className={`w-full h-36 bg-gradient-to-br ${game.color} relative`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white font-black text-xl uppercase tracking-tight drop-shadow-lg text-center px-2">
                                        {game.name}
                                    </h3>
                                </div>
                                {/* PS badge */}
                                <div className="absolute top-3 right-3">
                                    <span className="px-2 py-1 text-[9px] font-black uppercase tracking-wider bg-white/20 text-white rounded-full backdrop-blur-md">
                                        PS5
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                                        {game.genre}
                                    </span>
                                    <span className="text-gray-600 text-xs flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                        Available
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom branding */}
                <div className="text-center mt-16">
                    <div className="inline-flex flex-col items-center gap-3">
                        <p className="text-gray-500 text-sm">
                            PS5 Pro • DualSense Wireless Controller • 4K HDR OLED
                        </p>
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-8 h-[1px] bg-gray-700" />
                            <span className="text-xs tracking-widest uppercase">Gaming audio by Logitech</span>
                            <div className="w-8 h-[1px] bg-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
