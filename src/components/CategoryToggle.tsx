import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame } from 'lucide-react';

interface CategoryToggleProps {
  isSpicy: boolean;
  onToggle: () => void;
}

export function CategoryToggle({ isSpicy, onToggle }: CategoryToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300"
      style={{
        background: isSpicy 
          ? 'linear-gradient(to right, #FF416C, #FF4B2B)'
          : 'linear-gradient(to right, #8E2DE2, #4A00E0)',
        boxShadow: isSpicy 
          ? '0 4px 15px rgba(255, 65, 108, 0.3)'
          : '0 4px 15px rgba(142, 45, 226, 0.3)'
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{
          rotate: isSpicy ? [0, 360] : 0,
          scale: isSpicy ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.5 }}
      >
        {isSpicy ? (
          <Flame className="w-6 h-6 text-white" />
        ) : (
          <Heart className="w-6 h-6 text-white" />
        )}
      </motion.div>
      <span className="text-white font-medium text-lg">
        {isSpicy ? 'Spicy Mode' : 'Sweet Mode'}
      </span>
      
      {/* Animated background particles */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden rounded-full"
        animate={{
          background: isSpicy 
            ? 'radial-gradient(circle at center, rgba(255,65,108,0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(142,45,226,0.2) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  );
}