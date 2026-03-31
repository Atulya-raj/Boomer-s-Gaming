'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Location = 'pune' | 'coimbatore';

interface LocationContextType {
    location: Location | null;
    setLocation: (loc: Location) => void;
    isReady: boolean; // true once the user has selected a location and the site is shown
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

    return (
        <LocationContext.Provider value={{ location, setLocation, isReady, setIsReady }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => useContext(LocationContext);
