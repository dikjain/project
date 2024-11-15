import { motion } from 'framer-motion';

interface BackgroundEmojiProps {
  emoji: string;
  className?: string;
}

export function BackgroundEmoji({ emoji, className = '' }: BackgroundEmojiProps) {
  return (
    <motion.div
      className={`absolute opacity-100 pointer-events-none z-10 select-none ${className}`} // Changed z-index from 50 to 10
      initial={{ scale: 0.1 }} // Changed initial opacity and scale to make it visible
      animate={{
        scale: [1, 3, 1],
        y: [0, -30, 0],
        x: [0, 30, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: Math.random() * 50 + 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {emoji}
    </motion.div>
  );
}