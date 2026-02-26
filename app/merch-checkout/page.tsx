"use client";

import React, { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CheckoutForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const type = searchParams.get('type');

    // Default item based on type
    const itemOfInterest = type === 'build-pc' ? 'Custom PC Build' :
        type === 'tshirt' ? 'Exclusive T-Shirt' : 'Merch Item';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
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

        // Construct the WhatsApp message
        const message = `*New Merch Inquiry*\n\n` +
            `*Item:* ${itemOfInterest}\n` +
            `*Name:* ${formData.name}\n` +
            `*Phone:* ${formData.phone}\n` +
            `*Email:* ${formData.email}\n` +
            `*Description:* ${formData.description}`;

        // Replace with actual owner's WhatsApp API number later
        // Currently using a placeholder number 0000000000
        const whatsappNumber = "0000000000";

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Create WhatsApp API URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Adding slight delay for button animation effect before redirect
        setTimeout(() => {
            window.location.href = whatsappUrl;
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Complete Your <span className="text-cyan-400">Request</span></h1>
            <p className="text-gray-400 mb-8">You are inquiring about: <strong className="text-white">{itemOfInterest}</strong></p>

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
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-500 transition-colors"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-500 transition-colors"
                                placeholder="+91 9876543210"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address (Optional)</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-500 transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-300">Description / Specs</label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-500 transition-colors resize-none"
                            placeholder={type === 'build-pc' ? "e.g., I want a rig with RTX 4090 and i9 for 4K gaming..." : "e.g., Size L, Black color, etc..."}
                        ></textarea>
                    </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-4">
                    <div className="text-cyan-400 mt-0.5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-1">What happens next?</h4>
                        <p className="text-sm text-gray-400 text-justify">
                            Our team will revert you back under <strong className="text-cyan-400">24 hrs</strong>.
                            Clicking submit will redirect you to WhatsApp to send these details directly to our team.
                        </p>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? 'Redirecting...' : 'Submit & Proceed'}
                            {!isSubmitting && <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-black text-white py-20 px-4 md:px-8 flex items-center justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full">
                <Suspense fallback={
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
                    </div>
                }>
                    <CheckoutForm />
                </Suspense>
            </div>
        </main>
    );
}
