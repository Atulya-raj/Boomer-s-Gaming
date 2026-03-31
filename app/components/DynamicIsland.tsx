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
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center w-full max-w-[95vw] md:max-w-2xl pointer-events-none">
            <div
                onMouseEnter={() => setIsExpanded(true)}
                onMouseLeave={() => setIsExpanded(false)}
                onClick={() => setIsExpanded(!isExpanded)}
                className={`
                    relative overflow-hidden cursor-pointer pointer-events-auto
                    transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                    bg-black/90 backdrop-blur-xl border border-white/10
                    shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] rounded-[32px]
                    ${isExpanded ? 'w-full md:w-[520px]' : 'w-32 md:w-40 delay-100'}
                `}
                style={{ height: isExpanded ? '340px' : '40px' }}
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
                    className={`absolute inset-0 p-6 flex flex-col transition-all duration-300 ${isExpanded ? 'opacity-100 delay-200 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    {/* Region Selector */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-white/50 text-[10px] sm:text-xs font-bold tracking-widest uppercase">Location</span>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => handleRegionSwitch(e, 'pune')}
                                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${location === 'pune'
                                    ? 'bg-cyan-500 text-black scale-105 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                PUNE
                            </button>
                            <button
                                onClick={(e) => handleRegionSwitch(e, 'coimbatore')}
                                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${location === 'coimbatore'
                                    ? 'bg-purple-500 text-white scale-105 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                COIMBATORE
                            </button>
                        </div>
                    </div>

                    <span className="text-white/50 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3">Jump To Section</span>

                    <div className="grid grid-cols-3 gap-2">
                        {/* Happy Hours / Zomato */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('refuel'); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 rounded-xl p-2 sm:p-3 flex flex-col items-start transition-all group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400 mb-1.5 group-hover:scale-110 transition-transform hidden sm:block"><path d="M11 15H6l7-14v8h5l-7 14v-8z" /></svg>
                            <span className="text-white text-[10px] sm:text-xs font-bold group-hover:text-orange-400 transition-colors">Happy Hours</span>
                        </button>

                        {/* Gaming */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('gaming'); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 rounded-xl p-2 sm:p-3 flex flex-col items-start transition-all group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 mb-1.5 group-hover:scale-110 transition-transform hidden sm:block"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>
                            <span className="text-white text-[10px] sm:text-xs font-bold group-hover:text-cyan-400 transition-colors">Games</span>
                        </button>

                        {/* Cafe */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('food'); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-pink-500/30 rounded-xl p-2 sm:p-3 flex flex-col items-start transition-all group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-400 mb-1.5 group-hover:scale-110 transition-transform hidden sm:block"><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" y1="2" x2="6" y2="4" /><line x1="10" y1="2" x2="10" y2="4" /><line x1="14" y1="2" x2="14" y2="4" /></svg>
                            <span className="text-white text-[10px] sm:text-xs font-bold group-hover:text-pink-400 transition-colors">Cafe</span>
                        </button>

                        {/* Book a Party */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('events'); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 rounded-xl p-2 sm:p-3 flex flex-col items-start transition-all group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400 mb-1.5 group-hover:scale-110 transition-transform hidden sm:block"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            <span className="text-white text-[10px] sm:text-xs font-bold group-hover:text-purple-400 transition-colors">Book Party</span>
                        </button>

                        {/* Arsenal */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('arsenal'); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green-500/30 rounded-xl p-2 sm:p-3 flex flex-col items-start transition-all group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 mb-1.5 group-hover:scale-110 transition-transform hidden sm:block"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>
                            <span className="text-white text-[10px] sm:text-xs font-bold group-hover:text-green-400 transition-colors">Arsenal</span>
                        </button>

                        {/* Buy Merch */}
                        <button onClick={(e) => { e.stopPropagation(); scrollTo('merch'); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 rounded-xl p-2 sm:p-3 flex flex-col items-start transition-all group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 mb-1.5 group-hover:scale-110 transition-transform hidden sm:block"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                            <span className="text-white text-[10px] sm:text-xs font-bold group-hover:text-emerald-400 transition-colors">Merch</span>
                        </button>
                    </div>

                    {/* Back to Top */}
                    <button onClick={(e) => { e.stopPropagation(); scrollToTop(); }} className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/30 rounded-xl p-2 sm:p-3 flex items-center justify-center transition-all group mt-2">
                        <span className="text-white/60 text-xs font-bold group-hover:text-white transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform"><path d="m18 15-6-6-6 6" /></svg>
                            Back to Top
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DynamicIsland;
