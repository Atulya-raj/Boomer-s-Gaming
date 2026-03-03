"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// ─── Game Data ───────────────────────────────────────────────

interface Game {
    name: string;
    description: string;
    color: string;
}

const f2pGames: Game[] = [
    { name: 'Valorant', description: 'Tactical 5v5 shooter by Riot Games', color: 'from-red-500 to-red-700' },
    { name: 'Dota 2', description: 'The ultimate MOBA experience', color: 'from-red-600 to-amber-600' },
    { name: 'CS2', description: 'Counter-Strike evolved — competitive FPS', color: 'from-amber-500 to-yellow-600' },
    { name: 'Apex Legends', description: 'Fast-paced battle royale', color: 'from-red-500 to-orange-500' },
    { name: 'Fortnite', description: 'Battle royale with building mechanics', color: 'from-blue-500 to-purple-600' },
    { name: 'League of Legends', description: 'Strategic team-based MOBA', color: 'from-blue-600 to-cyan-500' },
    { name: 'Warzone 2.0', description: 'Call of Duty free-to-play BR', color: 'from-green-600 to-emerald-700' },
    { name: 'Rocket League', description: 'Vehicular soccer madness', color: 'from-blue-500 to-orange-500' },
    { name: 'Path of Exile', description: 'Deep action RPG dungeon crawler', color: 'from-amber-700 to-red-800' },
    { name: 'Genshin Impact', description: 'Open-world action RPG adventure', color: 'from-cyan-400 to-blue-600' },
    { name: 'Team Fortress 2', description: 'Classic team-based FPS', color: 'from-orange-500 to-red-600' },
    { name: 'Destiny 2', description: 'Sci-fi FPS with MMO elements', color: 'from-slate-500 to-blue-700' },
];

const p2pGames: Game[] = [
    { name: 'GTA 5', description: 'Open-world crime action (Steam/Epic)', color: 'from-green-500 to-emerald-700' },
    { name: 'Cyberpunk 2077', description: 'Open-world RPG in Night City', color: 'from-yellow-400 to-cyan-500' },
    { name: 'Elden Ring', description: 'Open-world souls-like RPG', color: 'from-amber-600 to-yellow-700' },
    { name: 'Red Dead Redemption 2', description: 'Wild west open-world epic', color: 'from-red-800 to-amber-700' },
    { name: 'PUBG', description: 'Battle royale — the original', color: 'from-amber-500 to-orange-600' },
    { name: 'Minecraft', description: 'Build, explore, survive — infinite worlds', color: 'from-green-500 to-lime-600' },
    { name: 'Hogwarts Legacy', description: 'Open-world wizarding RPG', color: 'from-purple-700 to-amber-600' },
    { name: 'Baldur\'s Gate 3', description: 'Epic D&D RPG adventure', color: 'from-red-700 to-amber-600' },
    { name: 'God of War', description: 'Mythological action-adventure', color: 'from-blue-700 to-slate-600' },
    { name: 'It Takes Two', description: 'Co-op platformer adventure', color: 'from-pink-500 to-orange-400' },
    { name: 'FIFA 24', description: 'The beautiful game — PC edition', color: 'from-green-500 to-emerald-600' },
    { name: 'Forza Horizon 5', description: 'Open-world racing paradise', color: 'from-orange-500 to-yellow-500' },
];

// ─── Component ───────────────────────────────────────────────

export default function PCGamesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'f2p' | 'p2p'>('f2p');
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const currentGames = activeTab === 'f2p' ? f2pGames : p2pGames;

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
    }, { scope: containerRef, dependencies: [activeTab] });

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-4 md:left-8 z-[100] p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-full backdrop-blur-xl transition-all group flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:-translate-x-1 transition-transform group-hover:text-cyan-400">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="hidden md:block text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">Back</span>
            </button>

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px]" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-blue-900/8 rounded-full blur-[140px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-bold tracking-widest uppercase mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        NVIDIA RTX Powered
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                        PC{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                            GAMES
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-2">
                        From competitive esports to AAA blockbusters — all running on NVIDIA RTX-certified rigs at Boomer&apos;s Gaming.
                    </p>
                    <p className="text-gray-500 text-sm">
                        Peripherals co-powered by <strong className="text-cyan-400">Logitech</strong>
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('f2p')}
                            className={`px-6 md:px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'f2p'
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            🆓 Free to Play
                        </button>
                        <button
                            onClick={() => setActiveTab('p2p')}
                            className={`px-6 md:px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'p2p'
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            💰 Pay to Play
                        </button>
                    </div>
                </div>

                {/* Info banner */}
                <div className="max-w-2xl mx-auto mb-10">
                    <div className={`text-center px-6 py-3 rounded-2xl border backdrop-blur-md text-sm ${activeTab === 'f2p'
                            ? 'bg-green-500/5 border-green-500/20 text-green-300'
                            : 'bg-blue-500/5 border-blue-500/20 text-blue-300'
                        }`}>
                        {activeTab === 'f2p'
                            ? '🎮 These games are free to play — just walk in and start gaming!'
                            : '🛒 These games are purchased via Steam, Epic Games, etc. — all pre-installed on our rigs.'
                        }
                    </div>
                </div>

                {/* Games Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                    {currentGames.map((game) => (
                        <div
                            key={game.name}
                            className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Color banner top */}
                            <div className={`w-full h-32 bg-gradient-to-br ${game.color} relative`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h3 className="text-white font-black text-xl uppercase tracking-tight drop-shadow-lg text-center px-2">
                                        {game.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-5">
                                <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${activeTab === 'f2p'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                        }`}>
                                        {activeTab === 'f2p' ? 'Free to Play' : 'Premium'}
                                    </span>
                                    <span className="text-gray-600 text-xs">Available Now</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom branding */}
                <div className="text-center mt-16">
                    <div className="inline-flex flex-col items-center gap-3">
                        <p className="text-gray-500 text-sm">
                            All games run on NVIDIA RTX-certified hardware
                        </p>
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-8 h-[1px] bg-gray-700" />
                            <span className="text-xs tracking-widest uppercase">Peripherals by Logitech</span>
                            <div className="w-8 h-[1px] bg-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
