'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Location = 'pune' | 'coimbatore';

interface LocationContextType {
    location: Location | null;
    setLocation: (loc: Location) => void;
    isReady: boolean;
    setIsReady: (ready: boolean) => void;
}

const LocationContext = createContext<LocationContextType>({
    location: null,
    setLocation: () => {},
    isReady: false,
    setIsReady: () => {},
});

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const storedLoc = localStorage.getItem('boomers-location') as Location;
        if (storedLoc) {
            setLocation(storedLoc);
            setIsReady(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSetLocation = (loc: Location) => {
        setLocation(loc);
        localStorage.setItem('boomers-location', loc);
    };

    // Removed mounted check to allow hydration with default state and eliminate flash
    return (
        <LocationContext.Provider value={{ location, setLocation: handleSetLocation, isReady, setIsReady }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
