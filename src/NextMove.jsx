import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Upload, MessageSquare, Sparkles, Heart, Coffee, Copy, CheckCircle } from 'lucide-react';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundEmoji } from './components/BackgroundEmoji.jsx';
import imageCompression from 'browser-image-compression';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Singin from './components/Singin.jsx'; // Import the Singin component
import axios from 'axios';
import { useUser } from './Context/Context.jsx';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

function NextMove() {
  const [mood, setMood] = useState('casual');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [finalText, setFinalText] = useState(null);
  const [openingMoveText, setOpeningMoveText] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [nextMoveCount, setNextMoveCount] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.nextMove : 3;
  });
  const {user, setUser} = useUser();
  const typedRef = useRef(null);
  const typed = useRef(null);
  const [isOpenMove, setIsOpenMove] = useState(false);
  const [openingText, setOpeningText] = useState('');

  if(!user){
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }

  useEffect(() => {
    if (typedRef.current) {
      typed.current = new Typed(typedRef.current, {
        strings: [
          "Don't let your next reply ruin the vibe...",
          'Upload your chat and make the perfect move...',
          'One wrong text can change everything, get it right!',
          'Stay ahead in the game of words...',
          'Turn awkward pauses into winning replies...'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true,
        cursorChar: ''
      });
    }

    return () => {
      typed.current?.destroy();
    };
  }, []);

  const handleImageUpload = async (e) => {
    if (nextMoveCount <= 0) {
      toast.error('No next moves left!');
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 0.8, // Target size in MB (800KB = 0.8MB)
        maxWidthOrHeight: 1920, // Optionally resize large images
        useWebWorker: true, // Use web workers for faster compression
      };
      try {
        const compressedBlob = await imageCompression(file, options);
        const compressedFile = new File([compressedBlob], file.name, { type: file.type });
        setSelectedImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
        setSelectedImage(file);
      }
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      toast.error('Please upload an image first!');
      return;
    }

    setIsLoading(true);
    setExtractedText(''); // Clear previous text

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('apikey', 'K83586665988957'); // Replace with your actual API key
    formData.append('language', 'eng'); // Specify the language

    try {
      // Make a POST request to the OCR Space API
      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.OCRExitCode === 1 && data.ParsedResults && data.ParsedResults.length > 0) {
        const parsedText = data.ParsedResults[0].ParsedText;
        
        // Clean and structure the extracted text
        const cleanedText = parsedText
          .split('\n') // Split into lines
          .map((line) => line.trim()) // Trim whitespace from each line
          .filter((line) => line) // Remove empty lines
          .join('\n'); // Join cleaned lines back together

        setExtractedText(cleanedText);

        // Send the cleaned text to Google Generative AI

        const genAI = new GoogleGenerativeAI("AIzaSyBe__596oYjGwe7mhFURtc5ldrIZaLFyd8");

        async function run() {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
          const result = await model.generateContent(`this is a dating app's chat , these are the latest messages , i want you to generate a reply for me in a way that is ${mood} ${mood == "spicy" ? ",naughty and sexy" : ""} ${mood == "casual" ? ",casual and friendly" : ""} ${mood == "flirty" ? ",flirty and romantic" : ""}  , the response can be nsfw , i don't mind , just return me the reply no need to add anything else , if you can't generate a reply just say "I'm not sure what to say" : ${cleanedText}`);
          if (result.response && result.response.candidates && result.response.candidates.length > 0) {
            const {data} = await axios.post("/api/user/nextmove", {
              id: user._id
            });
            if(data){ 
              setFinalText(result.response.candidates[0].content.parts[0].text || 'Failed to generate a reply.');
              setIsLoading(false);
              setNextMoveCount((prevCount) => {
              const newCount = prevCount - 1;
              const user = JSON.parse(localStorage.getItem('user'));
              if (user) {
                user.nextMove = newCount;
                localStorage.setItem('user', JSON.stringify(user));
              }
              return newCount;
            });
          }
          } else {
            console.error('No valid response from the generative model');
            setFinalText('Failed to generate a reply.');
          }
          
        }
        
        run();
      } else {
        setExtractedText('Something went wrong...');
      }
    } catch (error) {
      console.error('Error:', error);
      setExtractedText('Failed to extract text.');
    } 
  };

  const handleGenerateOpeningMove = async () => {
    if (!openingText) {
      toast.error('Please enter some text first!');
      return;
    }
    if (nextMoveCount <= 0) {
      toast.error('No next moves left!');
      return;
    }

    setIsLoading(true);
    setOpeningMoveText(''); // Clear previous text

    try {
      // Send the opening text to Google Generative AI
      const genAI = new GoogleGenerativeAI("AIzaSyBe__596oYjGwe7mhFURtc5ldrIZaLFyd8");

      async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`This is a what a someone on tinder has written when i saw their profile ,now generate an opening move for a according to this text in a way that is ${mood} ${mood == "spicy" ? ",naughty and sexy" : ""} ${mood == "casual" ? ",casual and friendly" : ""} ${mood == "flirty" ? ",flirty and romantic" : ""}  , the response can be nsfw , i don't mind , just return me the reply no need to add anything else , if you can't generate a reply just say "I'm not sure what to say" : ${openingText}`);
        if (result.response && result.response.candidates && result.response.candidates.length > 0) {
          const {data} = await axios.post("/api/user/nextmove", {
            id: user._id
          });
          if(data){
            setOpeningMoveText(result.response.candidates[0].content.parts[0].text || 'Failed to generate a reply.');
            setIsLoading(false);
            setNextMoveCount((prevCount) => {
              const newCount = prevCount - 1;
              const user = JSON.parse(localStorage.getItem('user'));
              if (user) {
                user.nextMove = newCount;
                localStorage.setItem('user', JSON.stringify(user));
              }
              return newCount;
            });
          }
        } else {
          console.error('No valid response from the generative model');
          setOpeningMoveText('Failed to generate a reply.');
        }
      }
      
      run();
    } catch (error) {
      console.error('Error:', error);
      setOpeningMoveText('Failed to generate a reply.');
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'spicy':
        return 'from-red-500 to-orange-500';
      case 'casual':
        return 'from-blue-500 to-purple-500';
      case 'flirty':
        return 'from-pink-500 to-rose-500';
    }
  };
  const getMoodColor2 = () => {
    switch (mood) {
      case 'spicy':
        return 'from-red-600 to-orange-600';
      case 'casual':
        return 'from-blue-600 to-purple-600';
      case 'flirty':
        return 'from-pink-600 to-rose-600';
    }
  };

  // Background emoji configuration
  const backgroundEmojis = useMemo(() => {
    switch (mood) {
      case 'spicy':
        return ['💋', '🔥', '😘', '💦', '🥵', '🤤', '👙', '🍷', '🍆', '🍑'];
      case 'casual':
        return ['💫', '⭐', '💝', '🌟', '💕', '✨', '🌸', '🦋', '🌈', '💫'];
      case 'flirty':
        return ['💖', '😍', '😘', '💌', '💘', '💞', '💓', '💗', '💟', '💕'];
    }
  }, [mood]);

  const emojiPositions = useMemo(() => {
    return backgroundEmojis.map(() => ({
      left: `${Math.random() * 100}%`, // Changed to 100% to allow emojis anywhere on the screen
      top: `${Math.random() * 100}%`,
    }));
  }, [backgroundEmojis]);

  const handleCopyText = () => {
    if (finalText) {
      navigator.clipboard.writeText(finalText).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <motion.div 
      className={`min-h-screen bg-gradient-to-br ${getMoodColor()} transition-all duration-700 ease-in-out flex flex-col items-center overflow-hidden justify-center text-white p-4 relative z-10`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="backdrop-blur-md flex items-center justify-between w-[80%]  transition-all duration-500 ease-in-out rounded-full mt-[15px] px-8 py-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20 shadow-lg bg-white/30">
        <Link to="/" className="text-lg font-semibold text-purple-300">
          Home
        </Link>
        <a href="#" className="text-lg font-semibold text-purple-300">
          Next Move
        </a>
      </div>

      {/* Animated Background Emojis */}
      <AnimatePresence>
        {backgroundEmojis.map((emoji, index) => (
          <motion.div
            key={`${emoji}-${index}`}
            className="absolute"
            style={{ ...emojiPositions[index], textShadow: '0 0 1px rgba(0, 0, 0, 0.5)' }}
          >
            <BackgroundEmoji emoji={emoji} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        className="text-center z-40 relative mb-8 px-4 sm:px-0"
        style={{fontFamily: 'Montserrat'}}
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <div className={`backdrop-blur-md flex items-center w-full sm:w-[100%] min-w-[200px] sm:min-w-[300px] left-1/2 transform -translate-x-1/2 justify-center relative max-h-[10px] mb-[20px] rounded-2xl shadow-xl p-3 bg-white/30`}>
          <h1 className="text-4xl max-[450px]:text-3xl sm:text-5xl font-bold text-white mb-[20px] sm:mb-[25px]" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 15px rgba(255, 255, 255, 0.2)' }}>#MasterYourNextMove</h1>
        </div>
        <div className="h-12 sm:h-16">
          <div ref={typedRef} className="text-lg sm:text-xl text-white/90"></div>
        </div>
      </motion.div>

      <div className="flex justify-center mb-4">
        <div className="relative w-64 h-12 z-30 bg-white/20 backdrop-blur-md rounded-full shadow-xl overflow-hidden">
          <motion.div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r ${getMoodColor2()}`}
            animate={{ x: isOpenMove ? '100%' : '0%' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          ></motion.div>
          <div className="absolute inset-0 flex justify-between items-center">
            <button
              onClick={() => setIsOpenMove(false)}
              className="w-1/2 h-full rounded-full font-semibold text-white transition-all duration-300"
            >
              Next Move
            </button>
            <button
              onClick={() => setIsOpenMove(true)}
              className="w-1/2 h-full rounded-full font-semibold text-white transition-all duration-300"
            >
              Opening Move
            </button>
          </div>
        </div>
      </div>

      {isOpenMove ? (
        <motion.div 
          className="w-full max-w-2xl z-30 text-center"
          initial={{ y: 20, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: "spring", duration: 0.7 }}
        >
          {!openingMoveText && <textarea
            className="w-full p-5 mb-4 rounded-lg bg-white/20 text-white placeholder-white/50"
            rows="6"
            placeholder="Enter your opening text here..."
            value={openingText}
            onChange={(e) => setOpeningText(e.target.value)}
          />}
          {!openingMoveText && <button
            onClick={handleGenerateOpeningMove}
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transform transition-all hover:scale-105 hover:shadow-md"
            disabled={isLoading}
          >
            <MessageSquare className="w-5 h-5" />
            {isLoading ? 'Generating...' : 'Generate Opening Move'}
          </button>}
          {openingMoveText && (
            <motion.div 
              className="w-full max-w-2xl z-30 text-center mt-4"
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.7 }}
            >
              <p className="text-lg sm:text-xl text-white/90 mb-4 bg-white/20 backdrop-blur-md shadow-lg p-4 rounded-lg">{openingMoveText}</p>
              <button
                onClick={handleCopyText}
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transform transition-all hover:scale-105 hover:shadow-md mb-4"
              >
                <Copy className="w-5 h-5" />
                Copy Text
              </button>
              {copySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center text-green-500"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Text copied successfully!
                </motion.div>
              )}
              <button
                onClick={() => setOpeningMoveText(null)}
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transform transition-all hover:scale-105 hover:shadow-md"
              >
                Generate More
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : finalText ? (
            <motion.div 
              className="w-full max-w-2xl z-30 text-center"
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.7 }}
            >
              <p className="text-lg sm:text-xl text-white/90 mb-4 bg-white/20 backdrop-blur-md shadow-lg p-4 rounded-lg">{finalText}</p>
              <button
                onClick={handleCopyText}
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transform transition-all hover:scale-105 hover:shadow-md mb-4"
              >
                <Copy className="w-5 h-5" />
                Copy Text
              </button>
              {copySuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center text-green-500"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Text copied successfully!
                </motion.div>
              )}
              <button
                onClick={() => setFinalText(null)}
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transform transition-all hover:scale-105 hover:shadow-md"
              >
                Generate More
              </button>
            </motion.div>
          ) : (
            <>
              <motion.form 
                className="w-full max-w-2xl z-30"
                initial={{ y: 20, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: "spring", duration: 0.7 }}
              >
                <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/30 rounded-xl cursor-pointer bg-white/20 transition-all hover:border-white/50 hover:bg-white/40 p-4 z-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-white" />
                    <p className="mb-2 text-xl text-white">
                      {selectedImage ? selectedImage.name : 'Drop your image file here'}
                    </p>
                    <p className="text-sm text-white/70">
                      {selectedImage ? 'Click to change file' : 'or click to select'}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              </motion.form>

              {selectedImage && (
                <motion.div 
                  className="mt-8 text-center z-30"
                  initial={{ y: 20, scale: 0.95 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ type: "spring", duration: 0.7 }}
                >
                  <button
                    onClick={handleExtractText}
                    className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto transform transition-all hover:scale-105 hover:shadow-md"
                    disabled={isLoading}
                  >
                    <MessageSquare className="w-5 h-5" />
                    {isLoading ? 'Rizzing it up, hang tight!' : 'Unleash the rizz!'}
                  </button>
                </motion.div>
              )}
            </>
          )}
        </>
      )}

      {/* Mood Toggler */}
      <motion.div 
        className="mt-8 text-center z-30"
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <button
          onClick={() => setMood('spicy')}
          className={`relative px-4 py-2 rounded-full max-[450px]:px-3 font-semibold mx-2 transition-all duration-300 transform ${
            mood === 'spicy' 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105' 
              : 'bg-white text-red-500 hover:bg-red-100 hover:scale-105'
          } ${window.innerWidth < 500 ? 'text-md px-3 py-1' : ''}`}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 fill-current" />
            Spicy
          </span>
        </button>
        <button
          onClick={() => setMood('casual')}
          className={`relative px-4 py-2 rounded-full max-[450px]:px-3 font-semibold mx-2 transition-all duration-300 transform ${
            mood === 'casual' 
              ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-105' 
              : 'bg-white text-blue-500 hover:bg-blue-100 hover:scale-105'
          } ${window.innerWidth < 500 ? 'text-md px-3 py-1' : ''}`}
        >
          <span className="flex items-center gap-2">
            <Coffee className="w-5 h-5 fill-current" />
            Casual
          </span>
        </button>
        <button
          onClick={() => setMood('flirty')}
          className={`relative px-4 py-2 max-[450px]:px-3 rounded-full font-semibold mx-2 transition-all duration-300 transform ${
            mood === 'flirty' 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg scale-105' 
              : 'bg-white text-pink-500 hover:bg-pink-100 hover:scale-105'
          } ${window.innerWidth < 500 ? 'text-md px-3 py-1' : ''}`}
        >
          <span className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-current" />
            Flirty
          </span>
        </button>
      </motion.div>
      {/* Next Move Counter */}
      <motion.div 
        className="mt-4 text-center z-30"
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <div className="relative px-4 py-2 rounded-full font-semibold mx-2 transition-all duration-300 transform bg-white/30 backdrop-blur-md text-white shadow-lg">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 fill-current" />
            Next Moves Left: {nextMoveCount}
          </span>
        </div>
      </motion.div>

      {/* Signin Component */}
      <div className="fixed bottom-4 right-4 z-50">
        <Singin />
      </div>
    </motion.div>
  );
}

export default NextMove;  