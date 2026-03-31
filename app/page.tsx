"use client";

import { useState } from "react";
import { useLocation } from "./context/LocationContext";
import Preloader from "./components/Preloader";
import LocationSelector from "./components/LocationSelector";
import LandingSection from "./components/sections/LandingSection";
import RefuelSection from "./components/sections/RefuelSection";
import GamingSection from "./components/sections/GamingSection";
import FoodSection from "./components/sections/FoodSection";
import EventSection from "./components/sections/EventSection";
import ArsenalSection from "./components/sections/ArsenalSection";
import MerchSection from "./components/sections/MerchSection";
import FooterSection from "./components/sections/FooterSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { location, setLocation, setIsReady } = useLocation();

  const handleLocationSelect = (loc: 'pune' | 'coimbatore') => {
    setLocation(loc);
    setIsReady(true);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Step 1: Preloader */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
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
