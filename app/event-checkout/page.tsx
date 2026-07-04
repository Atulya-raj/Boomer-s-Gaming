"use client";

import React, { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useLocation } from '../context/LocationContext';

function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get('type');
    const { location } = useLocation();

    // Default item based on type
    const bookingType = type === 'party' ? 'Party Booking' : 'Corporate Booking';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        peopleCount: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const locString = location === 'pune' ? 'Pune (Viman Nagar)' : 'Coimbatore';
        const currentDate = new Date().toLocaleDateString();
        // Construct the WhatsApp message
        const message = `*New Event Booking Inquiry*\n\n` +
            `*Date:* ${currentDate}\n` +
            `*Location:* ${locString}\n` +
            `*Booking Type:* ${bookingType}\n` +
            `*Name:* ${formData.name}\n` +
            `*WhatsApp Number:* ${formData.phone}\n` +
            `*Total People:* ${formData.peopleCount}\n` +
            `*Description:* ${formData.description || 'N/A'}\n` +
            `@8122210532`;

        const whatsappUrl = "https://chat.whatsapp.com/DgRDyrOC2EKGjypHWazXiF?mode=gi_t";

        const redirect = () => {
            setIsSubmitting(false);
            window.location.href = whatsappUrl;
        };

        const copyWithFallback = async () => {
            if (navigator.clipboard && window.isSecureContext) {
                try {
                    await navigator.clipboard.writeText(message);
                    return;
                } catch (err) {
                    console.error('Clipboard API failed', err);
                }
            }
            
            // Fallback for older iOS / browsers
            const textArea = document.createElement("textarea");
            textArea.value = message;
            textArea.style.position = "fixed"; // Prevent scrolling to bottom
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        };

        copyWithFallback().finally(() => {
            setTimeout(redirect, 300);
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Complete Your <span className="text-purple-500">Booking</span></h1>
            <p className="text-gray-400 mb-6">You are inquiring about: <strong className="text-white">{bookingType}</strong></p>
            
            <p className="text-center text-sm text-purple-400 font-bold tracking-widest mb-8 border border-purple-500/20 bg-purple-500/10 py-3 rounded-xl">
                SELECTED LOCATION: {location === 'pune' ? 'PUNE' : 'COIMBATORE'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300">WhatsApp Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-colors"
                                placeholder="+91 9876543210"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="peopleCount" className="text-sm font-medium text-gray-300">Total Number of People</label>
                        <input
                            type="number"
                            id="peopleCount"
                            name="peopleCount"
                            required
                            min="1"
                            value={formData.peopleCount}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-colors"
                            placeholder="e.g., 5"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-300">Description (Optional)</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-colors resize-none"
                            placeholder="Any special requests or details about your event..."
                        ></textarea>
                    </div>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-start gap-4 mt-6">
                    <div className="text-purple-400 mt-0.5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">What happens next?</h4>
                        <p className="text-sm text-gray-400 text-justify">
                            Your booking details will be <strong className="text-purple-400">copied to your clipboard</strong>.
                            Clicking proceed will open our WhatsApp group where you can paste the message. Our team will reply in <strong className="text-purple-400">10-15 mins</strong>.
                        </p>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => router.push('/#events')}
                        className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? 'Redirecting...' : 'Proceed'}
                            {!isSubmitting && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function CheckoutPage() {
    const router = useRouter();
    return (
        <main className="min-h-screen bg-black text-white py-20 px-4 md:px-8 flex items-center justify-center relative overflow-hidden">
            {/* Fixed Back Button */}
            <button
                onClick={() => router.push('/#events')}
                className="fixed top-6 left-4 md:left-8 z-[100] p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-full backdrop-blur-xl transition-all group flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:-translate-x-1 transition-transform group-hover:text-cyan-400"><path d="m15 18-6-6 6-6" /></svg>
                <span className="hidden md:block text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">Back</span>
            </button>

            {/* Background elements */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <Image src="/images/booking-bg.png" alt="Gaming Setup Background" fill sizes="100vw" className="object-cover opacity-40 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
            </div>

            <div className="relative z-10 w-full mt-10">
                <Suspense fallback={
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                }>
                    <CheckoutForm />
                </Suspense>
            </div>
        </main>
    );
}
