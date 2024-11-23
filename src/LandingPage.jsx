import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import { motion } from 'framer-motion';
import { Menu, LogIn, UserPlus, Smile, ArrowRight } from 'lucide-react'; // Importing icons from lucide-react
import { Link } from 'react-router-dom';

function LandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [bgGradient, setBgGradient] = useState('from-red-500 via-yellow-500 to-green-500');
  const [headingOpacity, setHeadingOpacity] = useState(1);

  const gradients = [
    'from-red-500 via-yellow-500 to-green-500',
    'from-blue-500 via-purple-500 to-pink-500', 
    'from-green-500 via-teal-500 to-blue-500',
    'from-yellow-500 via-orange-500 to-red-500',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingOpacity(0);
      setTimeout(() => {
        setBgGradient((prevGradient) => {
          const currentIndex = gradients.indexOf(prevGradient);
          const nextIndex = (currentIndex + 1) % gradients.length;
          return gradients[nextIndex];
        });
        setHeadingOpacity(1);
      }, 500); // Change opacity to 0 for 0.5 seconds before changing gradient
    }, 5000); // Change gradient every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className='parent bg-[#070707] min-h-screen max-w-screen relative'>
      <div className="absolute top-0 left-0 m-4 z-30 p-2">
        <motion.div
          className="bg-transparent rounded-lg p-2 cursor-pointer flex items-center shadow-lg"
          onClick={toggleNav}
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="text-white glow" />
          <span className="text-white bg-transparent ml-2 glow">Menu</span>
        </motion.div>
        <motion.nav
          className="bg-black/30 backdrop-blur-md rounded-lg flex items-center mt-2 p-2 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={isNavOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/auth" className="text-white text-sm mx-2 hover:underline flex items-center glow">
            <LogIn className="mr-2 glow" /> Login
          </Link>
          <Link to="/home" className="text-white text-sm mx-2 hover:underline flex items-center glow">
            <Smile className="mr-2 glow" /> Free Try
          </Link>
        </motion.nav>
      </div>
      <div className="absolute top-0 w-full flex justify-center items-center pt-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 , }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className={`text-5xl md:text-7xl font-extrabold transition-all duration-500 text-transparent bg-clip-text bg-gradient-to-r ${bgGradient} drop-shadow-lg glow`} style={{ opacity: headingOpacity }}>
            Flirt
            <span className="text-gray-300 opacity-100 glow">Fuel</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl text-white/80 font-medium glow"
          >
            Spark Your Conversations with AI-Powered Charm ✨💬
          </motion.p>
          <motion.p className='mt-10 text-1xl text-white flex items-center justify-center rounded-lg p-2 font-semibold underline '>
            <Link to="/home" className="flex items-center bg-white/10 py-2 px-4 rounded-xl">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </motion.p>

        </motion.div>
      </div>
      <div id="pg1" className='flex items-center justify-center w-screen h-screen p-4 md:p-0'>
        <div id="midbox" className='flex mt-[150px] flex-wrap w-full md:w-[60vw] gap-[12px] items-center justify-center p-5 h-[60vh] rounded-xl'>
          <div id="box1" className='flex w-full md:w-[69%] h-1/2 z-20 rounded-xl bg-black box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg font-bold w-[99%] h-[98%] bg-black/60 boxin boxin1 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-white/70">
                <h2 className="text-white transition duration-300 text-2xl font-extrabold mb-2">Craft the Perfect Reply</h2>
                <p className="text-sm italic mb-4">📸 Upload Your Chat Screenshot, and Let Us Craft the Perfect Reply—Casual, Flirty, or Even Spicy! 🌶️</p>
              </div>
            </motion.div>
          </div>
          <div id="box2" className='flex w-full md:w-[29%] h-1/2 z-20 rounded-xl bg-black box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg p-5 font-bold w-[98%] h-[98%] bg-black/60 boxin boxin2 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[15px] text-white/70">
                <h2 className="text-white text-2xl font-extrabold mb-2">Instant Suggestions</h2>
                💬 Struggling to Reply? We’ve Got You Covered! Upload, Choose a Mood, and Get Instant Suggestions. 😌😉🔥
              </div>
            </motion.div>
          </div>
          <div id="box3" className='flex w-full md:w-[29%] h-1/2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg font-bold w-[98%] h-[98%] bg-black/60 boxin boxin3 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[15px] text-white/70">
                <h2 className="text-white text-2xl p-5 font-extrabold mb-2">AI-Powered Pickup Lines</h2>
                🤖 Let AI Be Your Wingman—Generate Pickup Lines That Match Your Mood, from Sweet to Bold! 💕
              </div>
            </motion.div>
          </div>
          <div id="box4" className='flex w-full md:w-[69%] h-1/2 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg p-5 font-bold w-[99%] h-[98%] bg-black/60 boxin boxin4 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[15px] text-white/70">
                <h2 className="text-white text-2xl font-extrabold mb-2">Transform Awkward Chats</h2>
                ✨ Transform Awkward Chats Into Memorable Conversations With AI-Powered Mood-Based Openers! 🥂
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default LandingPage;