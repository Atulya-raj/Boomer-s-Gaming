'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useLocation } from '../../context/LocationContext';

gsap.registerPlugin(ScrollTrigger);

const RefuelSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const { location } = useLocation();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', people: '1', preference: 'PC' });
    const [copied, setCopied] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 }
        )
            .fromTo(cardRef.current,
                { scale: 0.8, opacity: 0, rotationX: -20 },
                { scale: 1, opacity: 1, rotationX: 0, duration: 1 },
                "-=0.5"
            );
    }, { scope: containerRef });

    const getTemplateMessage = () => {
        const locString = location === 'pune' ? 'Pune (Viman Nagar)' : 'Coimbatore';
        const currentDate = new Date().toLocaleDateString();
        return `Hi Boomer's Team! I'd like to book for Happy Hours.
Date: ${currentDate}
Location: ${locString}
Name: ${formData.name}
Number of People: ${formData.people}
Preference: ${formData.preference}
@8122210532`;
    };

    const handleContinue = () => {
        const message = getTemplateMessage();
        setCopied(true);
        
        const redirect = () => {
            window.location.href = 'https://chat.whatsapp.com/DgRDyrOC2EKGjypHWazXiF?mode=gi_t';
            setIsPopupOpen(false);
            setCopied(false);
        };

        const copyWithFallback = async () => {
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(message);
                    return;
                } catch (err) {
                    console.error('Clipboard API failed', err);
                }
            }
            
            // Fallback for older iOS / browsers
            const textArea = document.createElement("textarea");
            textArea.value = message;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        };

        copyWithFallback().finally(() => {
            setTimeout(redirect, 1500);
        });
    };

    return (
        <section id="refuel" ref={containerRef} className="w-full relative flex flex-col items-center justify-center p-8 md:py-24 pointer-events-auto">
            {/* Section Background */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
                <div className="absolute top-1/4 left-1/4 w-[30rem] md:w-[45rem] h-[30rem] md:h-[45rem] bg-fuchsia-600/30 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen"></div>
                <div className="absolute bottom-0 right-1/4 w-[25rem] md:w-[40rem] h-[25rem] md:h-[40rem] bg-purple-600/30 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen"></div>
                <Image src="/images/happy-hour-promo.jpg" alt="Happy Hours Promo" fill sizes="100vw" className="object-cover opacity-20 mix-blend-overlay blur-sm scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950/95"></div>
            </div>

            <div ref={titleRef} className="flex flex-col items-center mb-12 relative z-10">
                <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-500 text-center">
                    HAPPY HOURS
                </h2>
            </div>

            <div
                ref={cardRef}
                className="bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-2xl border border-purple-500/30 p-5 md:p-8 lg:p-12 rounded-3xl max-w-5xl w-full shadow-[0_0_80px_rgba(168,85,247,0.2)] relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                    <div className="flex-1">
                        <p className="text-gray-300/90 mb-8 text-lg md:text-xl leading-relaxed font-light tracking-wide">
                            Enjoy Happy Hours every Monday, Tuesday & Wednesday. Purchase 1 hour of gaming and get 1 extra hour FREE on both PC and Console gaming.
                        </p>
                        <ul className="space-y-4 text-sm md:text-base text-gray-300/80 mb-10 font-normal">
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">📅</span> 
                                Every Mon, Tue & Wed
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">🎮</span> 
                                Buy 1 Hour, Get 2 Hours
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">🕹️</span> 
                                PC & Console (1 to 4 Joysticks)
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">🎟️</span> 
                                Prices Starting at ₹100
                            </li>
                        </ul>
                        <button 
                            onClick={() => setIsPopupOpen(true)}
                            className="inline-block text-center bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_30px_-10px_rgba(192,38,211,0.6)] tracking-widest text-sm w-full md:w-auto"
                        >
                            BOOK HERE
                        </button>
                    </div>

                    <div className="flex-1 w-full h-64 md:h-[28rem] relative flex items-center justify-center rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                        <Image src="/images/happy-hour-interior.jpg" alt="Gaming Cafe Interior" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                        
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none z-20">
                            <div className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg">
                                1+1 Deals
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-purple-500/30 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
                        <button 
                            onClick={() => setIsPopupOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">Book Your Slot</h3>
                        <p className="text-center text-sm text-purple-400 font-bold tracking-widest mb-6">
                            SELECTED LOCATION: {location === 'pune' ? 'PUNE' : 'COIMBATORE'}
                        </p>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Number of People</label>
                                <input 
                                    type="number" 
                                    min="1"
                                    value={formData.people}
                                    onChange={(e) => setFormData({...formData, people: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="e.g. 2"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Preference</label>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setFormData({...formData, preference: 'PC'})}
                                        className={`flex-1 py-3 rounded-xl border font-bold transition-all ${formData.preference === 'PC' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        PC
                                    </button>
                                    <button 
                                        onClick={() => setFormData({...formData, preference: 'PS5'})}
                                        className={`flex-1 py-3 rounded-xl border font-bold transition-all ${formData.preference === 'PS5' ? 'bg-purple-600/20 border-purple-500 text-purple-400' : 'bg-black/50 border-white/10 text-gray-400 hover:border-white/30'}`}
                                    >
                                        PS5
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-xs text-gray-400 mb-4 px-2">
                                We will copy your details and open our WhatsApp group. Paste the message there! 
                                <br/><span className="text-purple-400 font-semibold mt-1 inline-block">Once you message, the team will reply in 10-15 mins.</span>
                            </p>
                            <button 
                                onClick={handleContinue}
                                disabled={!formData.name}
                                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                            >
                                {copied ? 'COPIED! OPENING WHATSAPP...' : 'CONTINUE TO WHATSAPP'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default RefuelSection;
