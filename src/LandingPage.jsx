import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';
import { motion } from 'framer-motion';
import { Menu, LogIn, UserPlus, Smile, ArrowRight, Heart, Zap, MessageCircle, Sparkles } from 'lucide-react'; // Added new icons
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LandingPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [bgGradient, setBgGradient] = useState('from-red-500 via-yellow-500 to-green-500');
  const [headingOpacity, setHeadingOpacity] = useState(1);
  const midbox2Ref = useRef(null);

  const gradients = [
    'from-red-500 via-yellow-500 to-green-500',
    'from-blue-500 via-purple-500 to-pink-500', 
    'from-green-500 via-teal-500 to-blue-500',
    'from-yellow-500 via-orange-500 to-red-500',
  ];
  useEffect(() => {
    gsap.fromTo(
      ".qt",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".luq",
          start: "30% 60%",
          end: "40% 40%",
          scrub: true
        }
      }
    );

    gsap.fromTo(
      ".iuoop",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        stagger: 0.5,
        scrollTrigger: {
          trigger: ".iuoop",
          start: "30% 40%",
          end: "40% 10%",
          scrub: true
        }
      }
    );
    gsap.fromTo(
      ".iuoop",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        stagger: 1,
        scrollTrigger: {
          trigger: ".iuoop",
          start: "30% 50%",
          end: "40% 15%",
          scrub: true,
        }
      }
    );
    gsap.fromTo(
      ".iuoop",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        stagger: 1,
        scrollTrigger: {
          trigger: ".iuoop",
          start: "30% 60%",
          end: "40% 20%",
          scrub: true,
        }
      }
    );
  }, []);


  
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
            className="mt-4 text-lg md:text-xl max-[500px]:text-sm text-white/80 font-medium glow"
          >
            Spark Your Conversations with <span className="text-yellow-400">AI-Powered</span> Charm ✨💬
          </motion.p>
          <motion.p className='mt-10 max-[500px]:mt-0 text-1xl text-white flex items-center justify-center rounded-lg p-2 font-semibold underline '>
            <Link to="/home" className="flex items-center bg-white/10 py-2 px-4 rounded-xl">
              Get Started <Zap className="ml-2 text-yellow-400" />
            </Link>
          </motion.p>

        </motion.div>
      </div>
      <div id="pg1" className='flex items-center justify-center w-screen h-screen min-h-fit overflow-hidden p-4 md:p-0'>
        <div id="midbox" className='flex mt-[150px] max-[500px]:mt-[100px] flex-wrap w-full md:w-[60vw] gap-[12px] items-center justify-center p-5  min-h-fit   rounded-xl'>
          <div id="box1" className='flex w-full md:w-[69%] h-1/2 z-20  max-[500px]:h-[130px]  rounded-xl bg-black box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg font-bold w-[99%] h-[98%] bg-black/60 boxin boxin1 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-white/70">
                <h2 className="text-white transition duration-300 text-2xl font-extrabold mb-2 max-[500px]:text-[22px] max-[500px]:p-0">Craft the Perfect Reply</h2>
                <p className="text-sm italic max-[500px]:text-xs  mb-4">📸 Upload Your Chat Screenshot, and Let Us Craft the Perfect Reply—Casual, Flirty, or Even Spicy! 🌶️</p>
              </div>
            </motion.div>
          </div>
          <div id="box2" className='flex w-full md:w-[29%] h-1/2 z-20  max-[500px]:h-[130px] rounded-xl bg-black box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg p-5 font-bold w-[98%] h-[98%] bg-black/60 boxin boxin2 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[15px] max-[500px]:text-xs  text-white/70">
                <h2 className="text-white text-2xl font-extrabold max-[500px]:text-[22px] max-[500px]:p-0 mb-2">Instant Suggestions</h2>
                💬 Struggling to Reply? We've Got You Covered! Upload, Choose a Mood, and Get Instant Suggestions. 😌😉🔥
              </div>
            </motion.div>
          </div>
          <div id="box3" className='flex w-full md:w-[29%] h-1/2  max-[500px]:h-[130px] rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg font-bold w-[98%] h-[98%] bg-black/60 boxin boxin3 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[15px] max-[500px]:text-xs  text-white/70">
                <h2 className="text-white text-2xl p-5 font-extrabold mb-2 max-[500px]:text-[22px] max-[500px]:p-0">AI-Powered Pickup Lines</h2>
                🤖 Let AI Be Your Wingman—Generate Pickup Lines That Match Your Mood, from Sweet to Bold! 💕
              </div>
            </motion.div>
          </div>
          <div id="box4" className='flex w-full md:w-[69%] h-1/2  max-[500px]:h-[130px] rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 box relative items-center justify-center'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-lg p-5 font-bold w-[99%] h-[98%] bg-black/60 boxin boxin4 rounded-xl flex items-center justify-center"
            >
              <div className="text-center text-[15px] max-[500px]:text-xs  text-white/70">
                <h2 className="text-white text-2xl font-extrabold mb-2 max-[500px]:text-[20px] max-[500px]:p-0">Transform Awkward Chats</h2>
                ✨ Transform Awkward Chats Into Memorable Conversations With AI-Powered Mood-Based Openers! 🥂
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div id="features" className='flex luq flex-col md:flex-row w-full justify-between items-center p-12'>
        <div className='flex flex-col qt items-center w-full md:w-1/3 p-5 text-center text-white'>
          <div className="flex items-center">
            <Heart className="text-red-500 mx-3 mb-2" size={32}  />
            <h3 className="text-xl font-bold mb-2"><span className="text-pink-400">Sweet</span> or <span className="text-red-400">Spicy</span>?</h3>
          </div>
          <p className="text-sm text-white/80">Need the perfect pickup line? Choose your mood—sweet or spicy—and let <span className="text-blue-400">FlirtMaster AI</span> craft a clever line to impress, charm, or add a little sizzle to your conversations!</p>
        </div>
        <div className='w-[1px] h-40 bg-white/20 hidden md:block'></div>
        <div className='w-full h-[1px] bg-white/20 hidden max-[768px]:block '></div>
        <div className='flex flex-col qt items-center w-full md:w-1/3 p-5 text-center text-white'>
          <div className="flex items-center">
            <MessageCircle className="text-green-500 mx-3 mb-2" size={32}  />
            <h3 className="text-xl font-bold mb-2"><span className="text-blue-400">AI-Powered</span> Suggestions</h3>
          </div>
          <p className="text-sm text-white/80">Stuck on what to say? Our AI analyzes your conversation and mood to provide <span className="text-yellow-400">tailored suggestions</span>, helping you keep the chat flowing smoothly and confidently.</p>
        </div>
        <div className='w-[1px] h-40 bg-white/20 hidden md:block'></div>
        <div className='w-full h-[1px] bg-white/20 hidden max-[768px]:block '></div>
        <div className='flex flex-col qt  items-center w-full md:w-1/3 p-5 text-center text-white'>
          <div className="flex items-center">
            <Sparkles className="text-yellow-500 mx-3 mb-2" size={32}  />
            <h3 className="text-xl font-bold mb-2"><span className="text-green-400">NextMove</span>: AI-Powered Replies</h3>
          </div>
          <p className="text-sm text-white/80">Upload your chat screenshot, pick a mood—sweet or spicy—and let <span className="text-green-400">NextMove</span> craft the perfect response to <span className="text-blue-400">elevate</span> your conversation game like never before!</p>
        </div>
      </div>
      <div id="pg3" className='w-screen min-h-screen bg-gradient-to-b from-[#070707] to-[#48235e] relative text-white overflow-hidden'>
        <div id="insidepg3" className='w-screen min-h-screen sticky top-0 flex flex-col items-center justify-center px-12 py-16'>
          <motion.h2 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold mb-12 text-center relative text-white"
            style={{ 
              fontFamily: "'Montserrat', sans-serif", // Changed to Montserrat for better readability and modern look
              letterSpacing: "-0.02em", // Added slight letter spacing adjustment
              textShadow: "0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)",
              color: "#fff"
            }}
          >
            Your <span style={{
              color: "#00c6ff",
              textShadow: "0 0 10px rgba(0,198,255,0.5), 0 0 20px rgba(0,198,255,0.3)"
            }} className="iuoop">AI Wingman</span> for Every <span style={{
              color: "#ff00c8", 
              textShadow: "0 0 10px rgba(255,0,200,0.5), 0 0 20px rgba(255,0,200,0.3)"
            }} className="iuoop">Conversation</span>
            <img src={'https://i.imghippo.com/files/YUCq1398Zfc.gif'} className='w-[80px] md:w-[100px] bg-transparent absolute top-0 translate-x-[-3vw] h-[80px] md:h-[100px] object-cover' />
          </motion.h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xl text-center lg:text-left"
            >
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Whether you're looking for <span style={{ color: "#ff6347", textShadow: "0 0 10px rgba(255,99,71,0.5), 0 0 20px rgba(255,99,71,0.3)", fontSize: "1.2em" }} className="iuoop">sweet compliments</span> or <span style={{ color: "#32cd32", textShadow: "0 0 10px rgba(50,205,50,0.5), 0 0 20px rgba(50,205,50,0.3)", fontSize: "1.2em" }} className="iuoop">spicy banter</span>, our <span style={{ color: "#1e90ff", textShadow: "0 0 10px rgba(30,144,255,0.5), 0 0 20px rgba(30,144,255,0.3)", fontSize: "1.2em" }} className="iuoop">AI-powered platform</span> helps you craft the perfect messages to keep your conversations <span style={{ color: "#ff1493", textShadow: "0 0 10px rgba(255,20,147,0.5), 0 0 20px rgba(255,20,147,0.3)", fontSize: "1.2em" }} className="iuoop">engaging</span> and <span style={{ color: "#ffa500", textShadow: "0 0 10px rgba(255,165,0,0.5), 0 0 20px rgba(255,165,0,0.3)", fontSize: "1.2em" }} className="iuoop">memorable</span>.
              </p>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                From <span style={{ color: "#8a2be2", textShadow: "0 0 10px rgba(138,43,226,0.5), 0 0 20px rgba(138,43,226,0.3)", fontSize: "1.2em" }} className="iuoop">clever pickup lines</span> to <span style={{ color: "#00ced1", textShadow: "0 0 10px rgba(0,206,209,0.5), 0 0 20px rgba(0,206,209,0.3)", fontSize: "1.2em" }} className="iuoop">thoughtful responses</span>, let <span className="text-blue-400 font-semibold iuoop" style={{ fontSize: "1.2em", textShadow: "0 0 10px rgba(0,0,255,0.5), 0 0 20px rgba(0,0,255,0.3)" }}>FlirtMaster AI</span> be your guide to more <span style={{ color: "#ff4500", textShadow: "0 0 10px rgba(255,69,0,0.5), 0 0 20px rgba(255,69,0,0.3)", fontSize: "1.2em" }} className="iuoop">confident</span> and <span style={{ color: "#7fff00", textShadow: "0 0 10px rgba(127,255,0,0.5), 0 0 20px rgba(127,255,0,0.3)", fontSize: "1.2em" }} className="iuoop">authentic connections</span>.
              </p>
            </motion.div>
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              src="https://i.imghippo.com/files/sBD1436ko.png"
              alt="AI Communication Assistant" 
              className='w-[60vw] md:w-[35vw] max-w-md object-cover hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 text-center max-[500px]:opacity-[0]"
          >
            <p className="text-2xl font-bold text-white  max-[500px]:opacity-[0]">
              Ready to transform your <span className='text-blue-400 iuoop' style={{textShadow: "0 0 10px rgba(0,0,255,0.5), 0 0 20px rgba(0,0,255,0.3)"}}>conversations</span>?
            </p>
          </motion.div>
        </div>
      </div>
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="text-center bg-gradient-to-t from-[#070707] to-[#48235e] flex flex-col items-center justify-center h-screen"
    >
      <h2 className="text-3xl font-bold text-white mb-8">
        Pricing
      </h2>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 w-full">
        <div className="max-w-xl text-center lg:text-left bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">
            #1 AI Dating Assistant Charges
          </h3>
          <p className="text-lg text-white/90 mb-4">
            Every time you generate a reply or opener or pickup line you spend 1 credit
          </p>
          <h4 className="text-xl font-semibold text-white mb-4">
            Weekly plans
          </h4>
          <ul className="text-lg text-white/90 mb-8 leading-relaxed">
            <li>😎 Match-winning openers</li>
            <li>💡 Chat reply suggestions</li>
            <li>✨ Generate personalised bios</li>
            <li>💪 Virtual dating skill practice</li>
            <li>😉 Banger pickup lines & icebreakers</li>
          </ul>
          <div className="text-lg text-white/90 mb-4">
            <p>₹149 <span className="line-through">₹49</span> for 30 credits</p>
            <p>₹299 <span className="line-through">₹99</span> for 70 credits</p>
            <p>₹499 <span className="line-through">₹199</span> for 160 credits</p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition duration-300">
            Get 70 credits for ₹99 now!
          </button>
        </div>
        <div className="max-w-xl text-center lg:text-left bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">
            🔥 LIMITED TIME OFFER for 1 week!
          </h3>
          <h4 className="text-xl font-semibold text-white mb-4">
            Unlimited Plan <span className="text-yellow-400">RECOMMENDED</span>
          </h4>
          <ul className="text-lg text-white/90 mb-8 leading-relaxed">
            <li>Everything in weekly plan, plus:</li>
            <li>⚡️ Faster replies</li>
            <li>🛠️ Quick support</li>
            <li>🌟 Early access for new features</li>
          </ul>
          <div className="text-lg text-white/90 mb-4">
            <p>₹2999 <span className="line-through">₹499</span> (SAVE 83%)</p>
            <p>Unlimited credits for a Month</p>
          </div>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 transition duration-300">
            Get unlimited Rizz now!
          </button>
        </div>
        </div>
      </motion.div>
    </div>
  );
}


export default LandingPage;