import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const EventCards = [
    {
        title: "Normal Booking",
        description: "Book our premium gaming rigs or consoles for your personal time. Enjoy a distraction-free environment to climb the ranks or dive into your favorite solo adventure.",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", // Placeholder image
        type: "normal",
        color: "blue"
    },
    {
        title: "Party Booking",
        description: "Birthdays, Corporate Events, or just an epic gaming night with the squad. Book the ultimate immersive experience for your group today.",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop", // Placeholder image
        type: "party",
        color: "purple"
    }
];

const EventSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom center",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(contentRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );

        const cards = cardsRef.current?.children;
        if (cards) {
            tl.fromTo(cards,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.5)" },
                "-=0.4"
            );
        }

    }, { scope: containerRef });

    return (
        <section id="events" ref={containerRef} className="relative w-full min-h-[90vh] py-24 px-4 md:px-8 bg-black">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] rounded-full bg-purple-900/10 blur-[100px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] min-w-[400px] min-h-[400px] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                <div ref={contentRef} className="text-center mb-16 max-w-3xl">
                    <div className="inline-block mb-6 px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md">
                        <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">Host Your Event</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white uppercase tracking-tight leading-none text-shadow-lg shadow-black">
                        LEVEL UP <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">YOUR EXPERIENCE</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 font-light drop-shadow-md">
                        These events apply for both our centers in <span className="text-white font-bold">Pune</span> and <span className="text-white font-bold">Coimbatore</span>.
                    </p>
                </div>

                {/* Cards Container */}
                <div ref={cardsRef} className="w-full flex flex-col md:flex-row gap-8 justify-center items-stretch relative z-20">
                    {EventCards.map((card, index) => (
                        <Link href={`/event-checkout?type=${card.type}`} key={index} className="flex-1 max-w-lg w-full group">
                            <div className="h-full relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform border border-white/10 bg-white/5 backdrop-blur-sm group-hover:-translate-y-2 group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">

                                {/* Image Container */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={card.imageUrl}
                                        alt={card.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:saturate-150"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="relative p-8 -mt-20 z-10 flex flex-col h-[calc(100%-16rem)] min-h-[220px]">
                                    <h3 className={`text-3xl font-bold mb-4 ${card.color === 'blue' ? 'text-blue-400' : 'text-purple-400'} uppercase tracking-wider`}>
                                        {card.title}
                                    </h3>

                                    <p className="text-gray-300 flex-grow text-lg mb-6 line-clamp-4">
                                        {card.description}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm border-b border-transparent group-hover:border-white transition-all">
                                            Book Now
                                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 blur-sm ${card.color === 'blue' ? 'border-blue-500' : 'border-purple-500'}`}></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventSection;
