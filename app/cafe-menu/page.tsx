"use client";

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// ─── Menu Data ───────────────────────────────────────────────
interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPercent: number;
    category: string;
    image: string; // placeholder path — user will provide later
    zomatoLink: string; // placeholder — user will provide later
}

const menuItems: MenuItem[] = [
    {
        id: 1,
        name: "Loaded Nachos",
        description: "Crispy tortilla chips topped with melted cheese, jalapeños, salsa & sour cream",
        price: 249,
        discountPercent: 15,
        category: "Snacks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 2,
        name: "Crispy Chicken Wings",
        description: "Golden fried wings tossed in our signature spicy-tangy sauce",
        price: 329,
        discountPercent: 10,
        category: "Snacks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 3,
        name: "Classic Smash Burger",
        description: "Double patty smashed burger with cheddar, pickles & special sauce",
        price: 299,
        discountPercent: 12,
        category: "Mains",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 4,
        name: "Peri-Peri Fries",
        description: "Thick-cut fries dusted with fiery peri-peri seasoning",
        price: 149,
        discountPercent: 15,
        category: "Snacks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 5,
        name: "Paneer Tikka Wrap",
        description: "Smoky tandoori paneer rolled in a soft tortilla with mint chutney",
        price: 219,
        discountPercent: 10,
        category: "Mains",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 6,
        name: "Iced Caramel Latte",
        description: "Smooth espresso with creamy caramel drizzle over ice",
        price: 179,
        discountPercent: 10,
        category: "Drinks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 7,
        name: "Mango Tango Smoothie",
        description: "Fresh alphonso mango blended with yogurt and a hint of cardamom",
        price: 159,
        discountPercent: 15,
        category: "Drinks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 8,
        name: "Margherita Pizza",
        description: "Thin crust pizza with San Marzano sauce, fresh mozzarella & basil",
        price: 349,
        discountPercent: 12,
        category: "Mains",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 9,
        name: "Chocolate Lava Cake",
        description: "Warm molten chocolate cake with a scoop of vanilla bean ice cream",
        price: 199,
        discountPercent: 10,
        category: "Desserts",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 10,
        name: "Gamer's Combo",
        description: "Burger + Fries + Drink — the ultimate refuel combo for non-stop gaming",
        price: 449,
        discountPercent: 15,
        category: "Combos",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 11,
        name: "Oreo Milkshake",
        description: "Thick creamy milkshake loaded with crushed Oreos and whipped cream",
        price: 189,
        discountPercent: 10,
        category: "Drinks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
    {
        id: 12,
        name: "Tandoori Chicken Momos",
        description: "Steamed momos stuffed with spiced chicken, charred on a tandoor",
        price: 199,
        discountPercent: 12,
        category: "Snacks",
        image: "/images/food.jpeg",
        zomatoLink: "#",
    },
];

const categories = ["All", "Snacks", "Mains", "Drinks", "Desserts", "Combos"];

// ─── Component ───────────────────────────────────────────────
export default function CafeMenuPage() {
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState("All");
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const offerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filteredItems = activeCategory === "All"
        ? menuItems
        : menuItems.filter(item => item.category === activeCategory);

    useGSAP(() => {
        // Header animation
        gsap.fromTo(headerRef.current,
            { y: -40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
        );

        // Offer banner
        gsap.fromTo(offerRef.current,
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
        );

        // Grid cards stagger
        if (gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power2.out",
                    delay: 0.7,
                }
            );
        }
    }, { scope: containerRef, dependencies: [activeCategory] });

    const getDiscountedPrice = (price: number, discountPercent: number) => {
        return Math.round(price - (price * discountPercent) / 100);
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* ── Floating Back Button ── */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-4 md:left-8 z-[100] p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 rounded-full backdrop-blur-xl transition-all group flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:-translate-x-1 transition-transform group-hover:text-pink-400">
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="hidden md:block text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">Back</span>
            </button>

            {/* ── Ambient Background ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-pink-900/15 rounded-full blur-[180px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-900/15 rounded-full blur-[160px]"></div>
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-rose-900/10 rounded-full blur-[140px]"></div>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20">

                {/* ── Header ── */}
                <div ref={headerRef} className="text-center mb-10">
                    <span className="text-pink-400 font-bold tracking-[0.3em] uppercase text-sm mb-3 block">Boomer&apos;s Kitchen</span>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
                        THE{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-orange-400">
                            CAFE MENU
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        Fuel your game session with our handcrafted bites and signature drinks. Order via Zomato District for exclusive discounts.
                    </p>
                </div>

                {/* ── Offer Zone Banner ── */}
                <div ref={offerRef} className="mb-12">
                    <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden">
                        {/* Animated border glow */}
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-pink-500 via-orange-400 to-pink-500 rounded-2xl opacity-70 blur-[1px] animate-pulse"></div>
                        <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl px-6 py-5 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl md:text-4xl">🔥</div>
                                <div>
                                    <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-wide">
                                        Offer Zone
                                    </h3>
                                    <p className="text-gray-300 text-sm md:text-base">
                                        Order via <strong className="text-orange-400">Zomato District</strong> &amp; get{" "}
                                        <strong className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 text-lg font-black">
                                            10-15% OFF
                                        </strong>{" "}
                                        on all items!
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <span className="px-5 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-sm rounded-full shadow-lg shadow-pink-500/25 animate-bounce">
                                    LIMITED TIME
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Category Filter Pills ── */}
                <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-2 md:gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 whitespace-nowrap
                                    ${activeCategory === cat
                                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/25 scale-105"
                                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-pink-500/30"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Menu Grid ── */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                    {filteredItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.zomatoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-pink-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10 cursor-pointer flex flex-col"
                        >
                            {/* Discount badge */}
                            <div className="absolute top-3 right-3 z-20">
                                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full shadow-lg shadow-pink-500/30">
                                    {item.discountPercent}% OFF
                                </span>
                            </div>

                            {/* Image */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-900">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Hover CTA overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-sm rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                        Order Now
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </span>
                                </div>

                                {/* Category tag */}
                                <div className="absolute bottom-3 left-3 z-10">
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/50 text-gray-300 border border-white/10 rounded-full backdrop-blur-md">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-pink-400 transition-colors duration-300">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                                    {item.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-black text-white">
                                            ₹{getDiscountedPrice(item.price, item.discountPercent)}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            ₹{item.price}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-xs font-bold">Zomato</span>
                                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* ── Bottom CTA ── */}
                <div className="text-center mt-16">
                    <div className="inline-flex flex-col items-center gap-3">
                        <p className="text-gray-500 text-sm">
                            Prices inclusive of all taxes • Discount applied on Zomato District
                        </p>
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="w-8 h-[1px] bg-gray-700"></div>
                            <span className="text-xs tracking-widest uppercase">Powered by Zomato District</span>
                            <div className="w-8 h-[1px] bg-gray-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
