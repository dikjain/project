import { useState, useMemo, useEffect } from 'react';
import { Share2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { PickupLine } from './components/PickupLine';
import { ActionButton } from './components/ActionButton';
import { CategoryToggle } from './components/CategoryToggle';
import { BackgroundEmoji } from './components/BackgroundEmoji';
import { regularLines, spicyLines } from './data/pickupLines';
import { Link, useNavigate } from 'react-router-dom';
import Singin from './components/Singin'; // Import the Singin component
import { useUser } from './Context/Context';
import axios from 'axios';

function Home() {
  const [isSpicy, setIsSpicy] = useState(false);
  const [currentLine, setCurrentLine] = useState(() => 
    regularLines[Math.floor(Math.random() * regularLines.length)]
  );
  const { user, setUser } = useUser();
  const [isSparkling, setIsSparkling] = useState(false);
  const [lineCount, setLineCount] = useState(() => {
    const storedLineCount = localStorage.getItem("linecounter");
    return storedLineCount ? parseInt(storedLineCount, 10) : 5;
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, setUser]);

  useEffect(() => {
    if (user) {
      setLineCount(user.pickupline);
    }
  }, [user]);

  const generateNewLine = async () => {
    if (lineCount <= 0) {
      if (!user) {
        setShowPopup(true);
      } else {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 opacity-0 transition-opacity duration-500';
        toast.textContent = 'You have reached the limit of free pickup lines. Buy membership to increase lines.';
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
      }
      return;
    }
    const lines = isSpicy ? spicyLines : regularLines;
    let newLine;
    do {
      newLine = lines[Math.floor(Math.random() * lines.length)];
    } while (newLine === currentLine);
    if (user) {
      const response = await axios.post("/api/user/pickupline", {
        id: user._id
      });
      if (response.status === 200) {
        setIsSparkling(true);
        setCurrentLine(newLine);
        setLineCount(prevCount => prevCount - 1);
        const updatedUser = {
          ...user,
          pickupline: user.pickupline - 1
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } else {
      setIsSparkling(true);
      setCurrentLine(newLine);
      setLineCount(prevCount => {
        const newCount = prevCount - 1;
        localStorage.setItem("linecounter", newCount);
        return newCount;
      });
    }
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

  const toggleCategory = async () => {
    await generateNewLine();
    setIsSpicy(!isSpicy);
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
      <div style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}} className={`backdrop-blur-md flex items-center justify-between w-[80%] rounded-full mt-[15px] px-8 py-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20 shadow-black ${
        isSpicy ? 'bg-black/30' : 'bg-white/30'
      }`}>
        <Link to="/home" className={`text-lg font-semibold ${
          isSpicy ? 'text-red-300' : 'text-purple-300'
        }`}>
          Home
        </Link>
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
        className="max-w-md  w-full relative z-10 max-[500px]:mt-[80px]"
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
              Chances left: {lineCount}
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

      {/* Signin Component */}
      <div className="fixed bottom-4 right-4 z-50">
        <Singin />
      </div>

      {/* Popup for more lines */}
      {showPopup && (
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-4 text-white">Get More Pickup Lines</h2>
                <p className="mb-4 text-white">Login to get more lines for free!</p>
                <motion.button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 font-semibold rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Go to Login
                </motion.button>
                <motion.button
                  onClick={() => setShowPopup(false)}
                  className="bg-gradient-to-r from-gray-500 to-gray-700 text-white px-3 py-2 font-semibold rounded-lg ml-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

export default Home;