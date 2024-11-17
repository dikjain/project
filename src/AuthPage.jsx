import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus } from 'lucide-react';
import { BackgroundEmoji } from './components/BackgroundEmoji';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './Context/Context';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Autoplay]);

const AuthPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [confirmOtp, setConfirmOtp] = useState('');
  const [password, setPassword] = useState('');


useEffect(() => {
  if (user) {
    navigate('/home');
  }
  const userInfo = localStorage.getItem("user");
  if (userInfo) {
    setUser(JSON.parse(userInfo));
    navigate('/home');
  }
}, [navigate]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const sendOtp = async () => {
    if (isValidEmail(email)) {
      try {
        const response = await axios.post("/api/otp/send-otp", { email });
        setOtpSent(true);
        setOtp(response.data.otp);
        toast.success('OTP sent successfully!');
      } catch (error) {
        console.error('Error sending OTP:', error);
        toast.error(`Failed to send OTP. Please try again. ${error.response?.data?.message || error.message}`);
      }
    } else {
      toast.error('Please enter a valid email address.');
    }
  };

  const handleSignup = async () => {
    if (!username || !email || !password || !otp) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if(otp !== confirmOtp) {
      toast.error('Please enter the correct OTP.');
      return;
    }

    try {
      const response = await axios.post("/api/user/register", { username, email, password });
      toast.success('Signup successful! Please log in.');
      setOtp('');
      setConfirmOtp('');
      setIsLogin(true);
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(`Failed to sign up. Please try again. ${error.response?.data?.message || error.message}`);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post("/api/user/login", { email, password });
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/home');
      // Handle successful login, e.g., redirect to another page or update state
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(`Failed to log in. Please try again. ${error.response?.data?.message || error.message}`);
    }
  };

  const backgroundEmojis = useMemo(() => ['💋', '🔥', '😘', '💦', '🥵', '🤤', '🍷', '🍆', '🍑', '💫', '⭐', '💝', '🌟', '💕', '✨', '🌸', '💖', '😍', '💌', '💘', '💞', '💓'], []);

  const emojiPositions = useMemo(() => backgroundEmojis.map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
  })), [backgroundEmojis]);

  const inputClasses = "w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 font-sans";
  const buttonClasses = "w-full p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center flex-col p-4 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ToastContainer />
      {/* Animated Background Emojis */}
      <AnimatePresence>
        {backgroundEmojis.map((emoji, index) => (
          <motion.div
            key={`${emoji}-${index}`}
            className="absolute z-0"
            style={{ ...emojiPositions[index] }}
          >
            <BackgroundEmoji emoji={emoji} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div 
        className="backdrop-blur-md flex items-center w-[70%] min-w-[300px] max-w-fit justify-center relative max-h-[10px] mb-[40px] rounded-2xl shadow-xl p-3 bg-white/30 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <h1 className="text-5xl absolute translate-y-[-10px] font-bold mb-[10px] text-center" style={{
          color: '#FFFFFF',
          textShadow: '0 0 1px #FFFFFF, 0 0 3px #FFFFFF, 0 0 6px #FFFFFF'
        }}>
          Flirt Fuel
        </h1>
      </motion.div>

      <motion.div 
        className="max-w-md w-full relative z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <motion.div 
          className="backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-2 bg-white/20"
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center rounded-xl py-[2px]   text-white"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            {isLogin ? 'Welcome Back' : (
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                className="mySwiper"
              >
                <SwiperSlide><span className="text-white">Unleash Your Inner <span style={{ textShadow: '0 0 2px #eab308, 0 0 4px #eab308, 0 0 6px #eab308' }}>Rizz</span></span></SwiperSlide>
                <SwiperSlide>Flirt, <span className="text-[#fff]" style={{ textShadow: '0 0 2px #FF1493, 0 0 4px #FF1493, 0 0 6px #FF1493' }}>Rizz</span>, Repeat</SwiperSlide>
                <SwiperSlide><span className="text-white" style={{ textShadow: '0 0 2px #FF416C, 0 0 4px #FF416C, 0 0 6px #FF416C' }}>Rizz</span> Up the Vibe</SwiperSlide>
                <SwiperSlide>Charm with <span className="text-white" style={{ textShadow: '0 0 2px #8E2DE2, 0 0 4px #8E2DE2, 0 0 6px #8E2DE2' }}>Rizz</span></SwiperSlide>
              </Swiper>
            )}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2" // Decreased the space between inputs
          >
            {isLogin ? (
              <>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className={inputClasses} 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className={inputClasses}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <motion.button 
                  onClick={handleLogin}
                  className={`${buttonClasses} bg-gradient-to-r from-pink-500 to-purple-600 text-white`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
              </>
            ) : (
              <>
                <input 
                  type="text" 
                  placeholder="Username" 
                  className={inputClasses} 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className={inputClasses}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className={inputClasses}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="OTP" 
                    className={`${inputClasses} w-[60%]`} 
                    value={confirmOtp}
                    onChange={(e) => setConfirmOtp(e.target.value)}
                  />
                  <motion.button 
                    onClick={sendOtp}
                    className={`${buttonClasses} bg-gradient-to-r from-purple-500 to-pink-500 text-white w-[40%]`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </motion.button>
                </div>
                <motion.button 
                  onClick={handleSignup}
                  className={`${buttonClasses} bg-gradient-to-r from-pink-500 to-purple-600 text-white`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign Up
                </motion.button>
              </>
            )}
          </motion.div>
          
          <div className="relative h-4">
            <div className="absolute inset-0 flex items-center h-4">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-sm h-4">
              <span className="px-2 bg-transparent text-white/70">Or</span>
            </div>
          </div>

          <motion.button
            onClick={toggleAuthMode}
            className={`${buttonClasses} bg-white/20 text-white flex items-center justify-center gap-2`}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            {isLogin ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            {isLogin ? 'Create an Account' : 'Back to Login'}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;