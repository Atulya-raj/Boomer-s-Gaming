'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import LandingSection from './sections/LandingSection';
import ArsenalSection from './sections/ArsenalSection';
import RefuelSection from './sections/RefuelSection';

interface ScrollSequenceProps {
    onLoadingComplete?: () => void;
}

const ScrollSequence: React.FC<ScrollSequenceProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const section1Ref = useRef<HTMLDivElement>(null);
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);
    const frameCount = 121;

    useGSAP(() => {
        if (!videoRef.current) return;
        const video = videoRef.current;

        // Ensure video is somewhat loaded so we have a duration
        const setupScroll = () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.1, // Highly responsive scroll feeling
                    pin: false, // The video wrapper is already fixed, no need to pin which causes DOM clones
                    markers: false, // Set to true for debugging
                }
            });

            timeline.fromTo(video,
                { currentTime: 0 },
                {
                    currentTime: video.duration || 8, // scrub to end of video
                    ease: "none",
                    onUpdate: function () {
                        if (video.duration) {
                            // Map progress to equivalent frame (0 to 120) for overlay trigger logic
                            const progress = video.currentTime / video.duration;
                            const frame = Math.round(progress * (frameCount - 1));

                            // Direct DOM manipulation - NO React state re-renders (this makes the scrolling insanely smooth)
                            if (section1Ref.current) {
                                section1Ref.current.style.opacity = frame > 20 ? '0' : '1';
                                section1Ref.current.style.pointerEvents = frame > 20 ? 'none' : 'auto';
                            }
                            if (section2Ref.current) {
                                const isVisible = frame >= 35 && frame <= 65;
                                section2Ref.current.style.opacity = isVisible ? '1' : '0';
                                section2Ref.current.style.pointerEvents = isVisible ? 'auto' : 'none';
                            }
                            if (section3Ref.current) {
                                const isVisible = frame >= 85 && frame <= 121;
                                section3Ref.current.style.opacity = isVisible ? '1' : '0';
                                section3Ref.current.style.pointerEvents = isVisible ? 'auto' : 'none';
                            }
                        }
                    }
                }
            );
        };

        if (video.readyState >= 1) { // loaded metadata
            setupScroll();
        } else {
            video.addEventListener('loadedmetadata', setupScroll);
            return () => video.removeEventListener('loadedmetadata', setupScroll);
        }

        return () => {
            // Clean up ScrollTrigger instances if needed
            ScrollTrigger.getAll().forEach(t => t.kill());
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: '350vh' }}>
            {/* Framed Container */}
            <div className="fixed top-4 md:top-8 left-4 md:left-8 right-4 md:right-8 bottom-4 md:bottom-8 z-0 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_-15px_rgba(139,92,246,0.4)] border border-purple-500/30">
                <video
                    ref={videoRef}
                    src="/4Gg Final.mp4"
                    className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                    style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                    muted
                    playsInline
                    preload="auto"
                />

                {/* Premium Overlay Effects inside the frame */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-blue-900/10 mix-blend-soft-light pointer-events-none"></div>
            </div>

            {/* Scroll Content Placeholders - To be extracted to separate components later */}
            <div className="absolute top-0 left-0 w-full z-10 pointer-events-none flex flex-col items-center">
                {/* Section 1: Landing (Always visible initially) */}
                <div ref={section1Ref} className="transition-opacity duration-500 delay-100 opacity-100 pointer-events-auto">
                    <section className="h-screen flex items-center justify-center">
                        <LandingSection />
                    </section>
                </div>

                {/* Section 2: Arsenal (Frame 43+) */}
                <div ref={section2Ref} className="fixed inset-0 flex items-center justify-center transition-opacity duration-[800ms] opacity-0 pointer-events-none">
                    <ArsenalSection />
                </div>

                {/* Section 3: Refuel (Frame 94+) */}
                <div ref={section3Ref} className="fixed inset-0 flex items-center justify-center transition-opacity duration-[800ms] opacity-0 pointer-events-none">
                    <RefuelSection />
                </div>
            </div>
        </div>
    );
};

export default ScrollSequence;
