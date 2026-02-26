"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 699;

export default function HeroAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = `/frames/frame_${i}.webp`;
                    img.onload = () => resolve(img);
                    img.onerror = (e) => reject(e);
                    loadedImages[i - 1] = img; // Store in correct index (0-based)
                });
                promises.push(promise);
            }

            try {
                await Promise.all(promises);
                setImages(loadedImages);
                setImagesLoaded(true);
            } catch (error) {
                console.error("Failed to load images", error);
            }
        };

        loadImages();
    }, []);

    useGSAP(
        () => {
            if (!imagesLoaded || !canvasRef.current) return;

            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (!context) return;

            const updateCanvasSize = () => {
                const dpr = Math.max(window.devicePixelRatio || 1, 2);
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                context.scale(dpr, dpr);
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = 'high';
            };

            updateCanvasSize();

            const frame = { index: 0 };

            gsap.to(frame, {
                index: frameCount - 1,
                ease: "none",
                scrollTrigger: {
                    trigger: canvasRef.current.parentElement, // Trigger on the container
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0, // Smooth scrubbing
                    //   markers: true, // Debug markers
                },
                onUpdate: () => {
                    renderFrame(frame.index);
                },
            });

            function renderFrame(index: number) {
                const uniqueIndex = Math.round(index);
                const img = images[uniqueIndex];
                if (img) {
                    const canvasLogicalWidth = window.innerWidth;
                    const canvasLogicalHeight = window.innerHeight;
                    context!.clearRect(0, 0, canvasLogicalWidth, canvasLogicalHeight);
                    // Draw image to cover the canvas (like object-fit: cover)
                    const hRatio = canvasLogicalWidth / img.width;
                    const vRatio = canvasLogicalHeight / img.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const centerShift_x = (canvasLogicalWidth - img.width * ratio) / 2;
                    const centerShift_y = (canvasLogicalHeight - img.height * ratio) / 2;
                    context!.drawImage(
                        img,
                        0,
                        0,
                        img.width,
                        img.height,
                        centerShift_x,
                        centerShift_y,
                        img.width * ratio,
                        img.height * ratio
                    );
                }
            }

            // Render first frame initially
            renderFrame(0);

            const handleResize = () => {
                updateCanvasSize();
                renderFrame(frame.index);
            };
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };

        },
        { dependencies: [imagesLoaded], scope: canvasRef }
    );

    if (!imagesLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="relative h-[500vh] w-full bg-black"> {/* make container tall to scroll */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-6xl font-bold text-white uppercase mix-blend-difference">Boomer's Gaming</h1>
                </div>
            </div>
        </div>
    );
}
