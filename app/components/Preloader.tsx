'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const totalFrames = 121; // Total number of frames

    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        const updateProgress = () => {
            loadedCount++;
            const currentProgress = Math.round((loadedCount / totalFrames) * 100);
            setProgress(currentProgress);

            if (loadedCount === totalFrames) {
                // Add a small delay for the animation to finish
                setTimeout(() => {
                    onComplete();
                }, 500)
            }
        };

        // Preload all images
        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, '0');
            img.src = `/frames/ezgif-frame-${frameIndex}.jpg`;
            img.onload = updateProgress;
            img.onerror = updateProgress; // Continue even if error
            images.push(img);
        }

        // Cleanup if component unmounts (though for a preloader it likely won't until done)
        return () => {
            images.forEach(img => {
                img.onload = null;
                img.onerror = null;
            });
        }

    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <div className="text-4xl font-bold mb-4 tracking-widest animate-pulse text-neon-blue">
                BOOMER'S
            </div>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-blue-500 transition-all duration-75 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="mt-2 text-sm font-mono text-gray-400">
                LOADING SYSTEM... {progress}%
            </div>
        </div>
    );
};

export default Preloader;
