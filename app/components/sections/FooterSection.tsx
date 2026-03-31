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
        <footer ref={containerRef} className="relative w-full min-h-[60vh] flex flex-col justify-end bg-black">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/images/footer.jpeg"
                    alt="Lounge area"
                    fill
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
                        <span className="bg-black px-4 relative z-10">Powered By Arsenal Leaders</span>
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent z-0"></div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-all duration-500">
                        <h3 className="text-2xl tracking-widest font-bold text-gray-400 hover:text-green-500 transition-colors">NVIDIA</h3>
                        <h3 className="text-2xl tracking-widest font-bold text-gray-400 hover:text-blue-500 transition-colors">LOGITECH G</h3>
                        <h3 className="text-2xl tracking-widest font-bold text-gray-400 hover:text-orange-500 transition-colors">ROG</h3>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-8">
                    <div className="text-center md:text-left">
                        <h4 className="text-white font-bold mb-2 tracking-wider">LOCATIONS</h4>
                        <p className="hover:text-cyan-400 transition-colors cursor-pointer">Viman Nagar, Pune</p>
                        <p className="hover:text-cyan-400 transition-colors cursor-pointer mt-1">Coimbatore, TN</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-2xl font-black tracking-tighter text-white mb-2">BOOMER'S</h2>
                        <span className="text-xs tracking-[0.2em] text-cyan-500">GAMING & CAFE</span>
                        <div className="mt-8">
                            © 2026 BOOMER'S. All Rights Reserved.
                        </div>
                    </div>

                    <div className="flex flex-col text-center md:text-right">
                        <h4 className="text-white font-bold mb-2 tracking-wider">CONNECT</h4>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="hover:text-pink-500 transition-colors">Instagram</a>
                            <a href="#" className="hover:text-red-500 transition-colors">YouTube</a>
                            <a href="#" className="hover:text-indigo-400 transition-colors">Discord</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
