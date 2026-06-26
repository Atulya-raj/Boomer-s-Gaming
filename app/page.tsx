"use client";

import { useState, useEffect, useCallback } from "react";
import { useLenis } from 'lenis/react';
import { useLocation } from "./context/LocationContext";
import Preloader from "./components/Preloader";
import LocationSelector from "./components/LocationSelector";
import LandingSection from "./components/sections/LandingSection";
import dynamic from 'next/dynamic';

const RefuelSection = dynamic(() => import("./components/sections/RefuelSection"));
const GamingSection = dynamic(() => import("./components/sections/GamingSection"));
const FoodSection = dynamic(() => import("./components/sections/FoodSection"));
const EventSection = dynamic(() => import("./components/sections/EventSection"));
const ArsenalSection = dynamic(() => import("./components/sections/ArsenalSection"));
const MerchSection = dynamic(() => import("./components/sections/MerchSection"));
const FooterSection = dynamic(() => import("./components/sections/FooterSection"));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { location, setLocation, setIsReady } = useLocation();

  const handleLocationSelect = (loc: 'pune' | 'coimbatore') => {
    setLocation(loc);
    setIsReady(true);
  };

  const lenis = useLenis();

  // Pause smooth scrolling while preloader or location selector is active
  useEffect(() => {
    if (isLoading || !location) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isLoading, location, lenis]);

  const handlePreloaderComplete = useCallback(() => setIsLoading(false), []);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Step 1: Preloader */}
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Step 2: Location Selector (after loading, before site) */}
      {!isLoading && !location && (
        <LocationSelector onSelect={handleLocationSelect} />
      )}

      {/* Step 3: Main Site (after location is selected) */}
      {!isLoading && location && (
        <div className="flex flex-col w-full relative">
          {/* 1. Landing */}
          <LandingSection location={location} />

          {/* 2. Zomato District / Happy Hours — Main Highlight */}
          <RefuelSection />

          {/* 3. Gaming (PC Games, PS5 Games, Sim Racing, VR) */}
          <GamingSection />

          {/* 4. Food/Cafe */}
          <FoodSection />

          {/* 5. Booking/Event Section (Party Booking) */}
          <EventSection />

          {/* 6. Arsenal (NVIDIA Specs) */}
          <ArsenalSection />

          {/* 7. Merch */}
          <MerchSection />

          {/* 8. Footer */}
          <FooterSection />
        </div>
      )}
    </main>
  );
}
