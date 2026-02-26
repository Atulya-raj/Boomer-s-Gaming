"use client";

import { useState } from "react";
import Preloader from "./components/Preloader";
import LandingSection from "./components/sections/LandingSection";
import GamingSection from "./components/sections/GamingSection";
import FoodSection from "./components/sections/FoodSection";
import EventSection from "./components/sections/EventSection";
import MerchSection from "./components/sections/MerchSection";
import FooterSection from "./components/sections/FooterSection";
import DynamicIsland from "./components/DynamicIsland";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {
        !isLoading && (
          <div className="flex flex-col w-full relative">
            <DynamicIsland />

            {/* 1. Landing (Photo 1) */}
            <LandingSection />

            {/* 2. Gaming/Arsenal (Photo 2) */}
            <GamingSection />

            {/* 3. Food/Cafe (Photo 3) */}
            <FoodSection />

            {/* 4. Booking/Event Section */}
            <EventSection />

            {/* 5. Merch */}
            <MerchSection />

            {/* 6. Footer (Photo 5) */}
            <FooterSection />
          </div>
        )
      }
    </main>
  );
}
