"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '../store/useWorkspaceStore';


interface CanvasItemProps {
    id: string;
    removeFn: () => void;
    children: React.ReactNode;
    label: string;
    zIndexBase: number;
    initialPos?: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
        x?: string;
        y?: string;
    };
    scaleFocus?: number;
    className?: string;
}

export default function CanvasItem({
    id, removeFn, children, label, zIndexBase, initialPos, scaleFocus = 1.05, className
}: CanvasItemProps) {

    const { focusedItemId, setFocusedItemId } = useWorkspaceStore();
    const isFocused = focusedItemId === id;

    return (
        <motion.div
            key={id}
            drag
            dragMomentum={false}
            onPointerDown={() => setFocusedItemId(id)}
            onClick={(e) => {
                e.stopPropagation();
                setFocusedItemId(id);
            }}
            // --- Animation(SWAP) ---
            initial={{ opacity: 0, scale: 0.8, y: 20 }}

            // --- ANIMASI STATUS (NORMAL vs FOCUS) ---
            animate={{
                opacity: 1,
                y: 0,
                scale: isFocused ? scaleFocus : 1,
                boxShadow: isFocused
                    ? "0 0 0 4px #3b82f6, 0 0 20px 5px rgba(59, 130, 246, 0.2)"
                    : "0 0 0 0px rgba(59, 130, 246, 0)",
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                boxShadow: { duration: 0.15 }
            }}
            className={`absolute cursor-grab active:cursor-grabbing will-change-transform p-4 rounded-3xl ${className}`}
            style={{
                zIndex: isFocused ? 1000 : zIndexBase,
                position: 'absolute',
                ...initialPos
            }}
        >
            <AnimatePresence mode="wait">
                {isFocused && (
                    <motion.button
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                        onClick={(e) => { e.stopPropagation(); removeFn(); }}
                        className="absolute -top-10 left-1/2 bg-red-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase shadow-2xl z-[1001] active:scale-90 transition-transform"
                    >
                        X Remove
                    </motion.button>
                )}
            </AnimatePresence>

            <div className="pointer-events-none flex items-center justify-center">
                {children}
            </div>
        </motion.div>
    );
}