'use client';

import React, { useEffect, useState } from 'react';


interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.floor(Math.random() * 15) + 5;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 400);
            }
            setProgress(currentProgress);
        }, 80);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white touch-none">
            <div className="text-4xl font-bold mb-4 tracking-widest animate-pulse text-cyan-400">
                BOOMER&apos;S
            </div>
            <div className="w-64 max-w-[80vw] h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-cyan-500 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-4 text-sm font-mono text-gray-400 tracking-widest">
                INITIALIZING... {progress}%
            </div>
        </div>
    );
};

export default Preloader;
