import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PickupLineProps {
  line: string;
  isSparkling: boolean;
  lineCount: number;
  isSpicy: boolean;
}

export function PickupLine({ line, isSparkling, lineCount, isSpicy }: PickupLineProps) {
  return (
    <div className={`relative rounded-xl p-6 min-h-[120px] flex items-center justify-center overflow-hidden ${
      isSpicy 
        ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20'
        : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20'
    }`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={line}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="w-full"
        >
          <p className="text-xl text-center font-medium text-white">
            {lineCount >= 20 ? '----------' : line}
          </p>
        </motion.div>
      </AnimatePresence>
      
      {isSparkling && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-2 right-2">
            <Sparkles className={`w-6 h-6 ${isSpicy ? 'text-red-400' : 'text-yellow-400'}`} />
          </div>
          <div className="absolute bottom-2 left-2">
            <Sparkles className={`w-4 h-4 ${isSpicy ? 'text-pink-400' : 'text-purple-400'}`} />
          </div>
          <div className="absolute top-1/2 left-2">
            <Sparkles className={`w-5 h-5 ${isSpicy ? 'text-orange-400' : 'text-blue-400'}`} />
          </div>
        </motion.div>
      )}
    </div>
  );
}