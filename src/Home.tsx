import { useState, useMemo, useEffect } from 'react';
import { Share2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { PickupLine } from './components/PickupLine';
import { ActionButton } from './components/ActionButton';
import { CategoryToggle } from './components/CategoryToggle';
import { BackgroundEmoji } from './components/BackgroundEmoji';
import { regularLines, spicyLines } from './data/pickupLines';
import { Link } from 'react-router-dom';

function Home() {
  const [isSpicy, setIsSpicy] = useState(false);
  const [currentLine, setCurrentLine] = useState(() => 
    regularLines[Math.floor(Math.random() * regularLines.length)]
  );
  const [isSparkling, setIsSparkling] = useState(false);
  const [lineCount, setLineCount] = useState(() => {
    const savedCount = localStorage.getItem('lineCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('lineCount', lineCount.toString());
  }, [lineCount]);

  const generateNewLine = () => {
    if (lineCount >= 20) {
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 opacity-0 transition-opacity duration-500';
      toast.textContent = 'You have reached the limit of 20 free pickup lines.';
      document.body.appendChild(toast);
      toast.style.transform = 'translateY(1000px) translate-x(-50%)';
      requestAnimationFrame(() => {
        toast.classList.remove('opacity-0');
        toast.classList.add('opacity-100');
        toast.style.transition = 'transform 0.5s ease-out';
        toast.style.transform = 'translateY(0px) translate-x(-50%)';
      });
      setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
        toast.style.transform = 'translateY(1000px)';
        setTimeout(() => toast.remove(), 500);
      }, 2000);
      return;
    }
    setIsSparkling(true);
    const lines = isSpicy ? spicyLines : regularLines;
    let newLine;
    do {
      newLine = lines[Math.floor(Math.random() * lines.length)];
    } while (newLine === currentLine);
    setCurrentLine(newLine);
    setLineCount(prevCount => prevCount + 1);
    setTimeout(() => setIsSparkling(false), 500);
  };

  const shareLine = async () => {
    try {
      await navigator.share({
        title: 'AI Pickup Line',
        text: currentLine,
      });
    } catch (err) {
      await navigator.clipboard.writeText(currentLine);
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = 'Pickup line copied to clipboard! 📋';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  };

  const toggleCategory = () => {
    setIsSpicy(!isSpicy);
    generateNewLine();
  };

  // Background emoji configuration
  const backgroundEmojis = useMemo(() => {
    return isSpicy 
      ? ['💋', '🔥', '😘', '💦', '🥵', '🤤', '👙', '🍷', '🍆', '🍑']
      : ['💫', '⭐', '💝', '🌟', '💕', '✨', '🌸', '🦋', '🌈', '💫'];
  }, [isSpicy]);

  // Pre-calculate emoji positions to prevent them from changing
  const emojiPositions = useMemo(() => {
    return backgroundEmojis.map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
  }, [backgroundEmojis]);
    
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center justify-center p-4 overflow-hidden transition-colors duration-500 ${
        isSpicy 
          ? 'bg-gradient-to-br from-red-600 via-pink-600 to-purple-600'
          : 'bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500'
      } relative`} // Added relative positioning
    >
      <div style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}} className={`backdrop-blur-md flex items-center justify-between w-[80%] rounded-full mt-[15px] px-8 py-4 fixed top-0 left-1/2 transform -translate-x-1/2 z-20 shadow-black ${
        isSpicy ? 'bg-black/30' : 'bg-white/30'
      }`}>
        <a href="#" className={`text-lg font-semibold ${
          isSpicy ? 'text-red-300' : 'text-purple-300'
        }`}>
          Home
        </a>
        <Link to="/next-move" className={`text-lg font-semibold ${
          isSpicy ? 'text-red-300' : 'text-purple-300'
        }`}>
          Next Move
        </Link>
      </div>


      {/* Animated Background Emojis */}
      <AnimatePresence>
        {backgroundEmojis.map((emoji, index) => (
          <motion.div
            key={`${emoji}-${index}`}
            className={`absolute`}
            style={{ ...emojiPositions[index], textShadow: '0 0 1px rgba(0, 0, 0, 0.5)' }}
          >
            <BackgroundEmoji emoji={emoji} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        className="max-w-md w-full relative z-10"
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <div className={`backdrop-blur-md flex items-center w-[70%] min-w-[300px] left-1/2 transform -translate-x-1/2 justify-center relative max-h-[10px] mb-[30px] rounded-2xl shadow-xl p-3 ${
          isSpicy ? 'bg-black/30' : 'bg-white/30'
        }`}>
          <h1 className="text-6xl absolute translate-y-[-10px] font-bold mb-[10px] text-center" style={{
            color: isSpicy ? '#FF416C' : '#8E2DE2',
            textShadow: isSpicy ? '0 0 1px #FF416C, 0 0 3px #FF416C, 0 0 6px #FF416C' : '0 0 1px #8E2DE2, 0 0 3px #8E2DE2, 0 0 6px #8E2DE2'
          }}>
            Flirt Fuel
          </h1>
        </div>
        <div className={`backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-8 ${
          isSpicy ? 'bg-black/30' : 'bg-white/30'
        }`}>
          <Header isSpicy={isSpicy} />
          
          <div className="flex justify-center">
            <CategoryToggle isSpicy={isSpicy} onToggle={toggleCategory} />
          </div>

          <PickupLine line={currentLine} lineCount={lineCount} isSparkling={isSparkling} isSpicy={isSpicy} />
          
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className={`text-lg font-medium ${
              isSpicy ? 'text-red-300' : 'text-purple-300'
            }`}>
              Chances left: {20 - lineCount}
            </span>
          </motion.div>

          <div className="flex gap-4">
            <ActionButton
              onClick={generateNewLine}
              icon={RefreshCw}
              label="New Line"
              variant={isSpicy ? "spicy" : "primary"}
              fullWidth
            />
            <ActionButton
              onClick={shareLine}
              icon={Share2}
              label="Share"
              variant="secondary"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


export default Home;