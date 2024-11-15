import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame } from 'lucide-react';

interface HeaderProps {
  isSpicy: boolean;
}

export function Header({ isSpicy }: HeaderProps) {
  const Icon = isSpicy ? Flame : Heart;
  
  return (
    <motion.div 
      className="flex items-center justify-center space-x-3"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2
        }}
      >
        <Icon className={`w-8 h-8 ${isSpicy ? 'text-red-500' : 'text-pink-500'}`} />
      </motion.div>
      <h1 className="text-3xl font-bold text-gray-800">
        AI Pickup Lines
      </h1>
    </motion.div>
  );
}