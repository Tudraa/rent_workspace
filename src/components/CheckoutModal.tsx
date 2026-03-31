"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '../store/useWorkspaceStore';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
    const {
        desk, chair, monitors, accessories, otherItems
    } = useWorkspaceStore();

    // Kalkulasi Harga
    const corePrice = (desk?.price || 0) + (chair?.price || 0) +
        monitors.reduce((s, m) => s + m.price, 0) +
        accessories.reduce((s, a) => s + a.price, 0);

    const totalOtherPrice = otherItems.reduce(
        (acc, item) => acc + (item.product.price * item.quantity), 0
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Overlay Gelap */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Konten Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <h2 className="text-2xl font-black italic uppercase tracking-tight text-gray-900">
                                Order Summary
                            </h2>
                            <p className="text-gray-400 text-sm font-medium">Review your dream workspace setup</p>
                        </div>

                        {/* List Barang */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">

                            {/* Section 1: Core Furniture */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded">
                                    Core Setup
                                </h3>

                                <div className="space-y-3">
                                    {desk && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-gray-700">{desk.name} <span className="text-gray-400 font-normal ml-1">(Desk)</span></span>
                                            <span className="font-mono font-bold">${desk.price}</span>
                                        </div>
                                    )}

                                    {chair && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-gray-700">{chair.name} <span className="text-gray-400 font-normal ml-1">(Chair)</span></span>
                                            <span className="font-mono font-bold">${chair.price}</span>
                                        </div>
                                    )}

                                    {monitors.map((m, i) => (
                                        <div key={m.id} className="flex justify-between items-center text-sm">
                                            <span className="font-bold text-gray-700">Monitor {i + 1}: {m.name}</span>
                                            <span className="font-mono font-bold">${m.price}</span>
                                        </div>
                                    ))}

                                    {accessories.map((acc) => (
                                        <div key={acc.id} className="flex justify-between items-center text-sm">
                                            <span className="font-medium text-gray-500">{acc.name}</span>
                                            <span className="font-mono font-bold text-gray-500">${acc.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Lifestyle Items */}
                            {otherItems.length > 0 && (
                                <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded">
                                        Extra Lifestyle
                                    </h3>
                                    <div className="space-y-3">
                                        {otherItems.map((item) => (
                                            <div key={item.product.id} className="flex justify-between items-center text-sm">
                                                <span className="font-bold text-gray-700">
                                                    {item.product.name} <span className="text-gray-400 font-medium ml-1">x{item.quantity}</span>
                                                </span>
                                                <span className="font-mono font-bold">${item.product.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer: Total & Actions */}
                        <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Total Monthly Payment</p>
                                    <p className="text-4xl font-black text-blue-600 tracking-tighter">
                                        ${corePrice + totalOtherPrice}
                                    </p>
                                </div>
                                <p className="text-[10px] text-gray-400 italic font-medium">VAT & Tax included</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={onClose}
                                    className="py-4 rounded-2xl font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition-all active:scale-95"
                                >
                                    Back to Design
                                </button>
                                <button
                                    onClick={() => alert("Checkout Successful!")}
                                    className="py-4 rounded-2xl font-bold bg-black text-white shadow-xl shadow-gray-200 hover:bg-gray-800 transition-all active:scale-95"
                                >
                                    Confirm Order
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}