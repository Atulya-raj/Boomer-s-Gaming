'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocation } from '../context/LocationContext';

const DynamicIsland = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { location, setLocation, isReady } = useLocation();
    const router = useRouter();
    const pathname = usePathname();

    const scrollTo = (id: string) => {
        setIsExpanded(false);
        if (pathname !== '/') {
            router.push(`/#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const scrollToTop = () => {
        setIsExpanded(false);
        if (pathname !== '/') {
            router.push('/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleRegionSwitch = (e: React.MouseEvent, region: 'pune' | 'coimbatore') => {
        e.stopPropagation();
        setLocation(region);
        // Scroll to top to see the change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Don't show the island until the user has selected a location and the site is visible
    if (!isReady) return null;

    return (
        <div className="fixed top-[max(1.5rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-[100] flex justify-center w-full max-w-[95vw] md:max-w-2xl pointer-events-none">
            <div
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                    relative overflow-hidden cursor-pointer pointer-events-auto
                    transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    bg-black/95 backdrop-blur-2xl border border-white/10
                    shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] rounded-[32px] sm:rounded-[36px]
                    ${isExpanded ? 'w-[92vw] sm:w-[95vw] md:w-[520px]' : 'w-36 md:w-40 delay-100'}
                `}
                style={{ height: isExpanded ? 'min(380px, 85vh)' : '48px' }}
            >
                {/* Collapsed Content */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}`}
                >
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${location === 'pune' ? 'bg-cyan-400' : 'bg-purple-400'}`}></div>
                        <span className="text-xs font-semibold tracking-widest text-white/90">BOOMER&apos;S</span>
                    </div>
                </div>

                {/* Expanded Content */}
                <div
                    className={`absolute inset-0 p-5 sm:p-6 flex flex-col transition-all duration-300 ${isExpanded ? 'opacity-100 delay-200 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    {/* Region Selector */}
                    <div className="flex justify-between items-center mb-5">
                        <span className="text-white/50 text-[11px] sm:text-xs font-bold tracking-widest uppercase">Location</span>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => handleRegionSwitch(e, 'pune')}
                                className={`px-4 py-3 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 ${location === 'pune'
                                    ? 'bg-cyan-500 text-black scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                PUNE
                            </button>
                            <button
                                onClick={(e) => handleRegionSwitch(e, 'coimbatore')}
                                className={`px-4 py-3 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 ${location === 'coimbatore'
                                    ? 'bg-purple-500 text-white scale-105 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                COIMBATORE
                            </button>
                        </div>
                    </div>

                    <span className="text-white/50 text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-3">Jump To Section</span>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 flex-grow">
                        {/* Happy Hours / Zomato */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('refuel'); }} className="bg-white/5 hover:bg-orange-500/20 border border-white/5 hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group">
                            <span className="text-white text-[12px] sm:text-sm font-bold group-hover:text-orange-400 transition-colors">Happy Hours</span>
                        </button>

                        {/* Gaming */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('gaming'); }} className="bg-white/5 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group">
                            <span className="text-white text-[12px] sm:text-sm font-bold group-hover:text-cyan-400 transition-colors">Games</span>
                        </button>

                        {/* Cafe */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('food'); }} className="bg-white/5 hover:bg-pink-500/20 border border-white/5 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group">
                            <span className="text-white text-[12px] sm:text-sm font-bold group-hover:text-pink-400 transition-colors">Cafe</span>
                        </button>

                        {/* Book a Party */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('events'); }} className="bg-white/5 hover:bg-purple-500/20 border border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group">
                            <span className="text-white text-[12px] sm:text-sm font-bold group-hover:text-purple-400 transition-colors">Book Party</span>
                        </button>

                        {/* Setup */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('setup'); }} className="bg-white/5 hover:bg-green-500/20 border border-white/5 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group">
                            <span className="text-white text-[12px] sm:text-sm font-bold group-hover:text-green-400 transition-colors">The Setup</span>
                        </button>

                        {/* Buy Merch */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('merch'); }} className="bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all duration-300 group">
                            <span className="text-white text-[12px] sm:text-sm font-bold group-hover:text-emerald-400 transition-colors">Merch</span>
                        </button>
                    </div>

                    {/* Back to Top */}
                    <button onClick={(e) => { e.stopPropagation(); scrollToTop(); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/30 rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-all group mt-3">
                        <span className="text-white/60 text-sm font-bold group-hover:text-white transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="m18 15-6-6-6 6" /></svg>
                            Back to Top
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicIsland;
