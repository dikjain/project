import { useState } from 'react';
import { User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../Context/Context'; // Assuming the context is in this path
import { useNavigate } from 'react-router-dom';

function Singin({ initialOpen = false }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const { user, setUser } = useUser(); // Access user context

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    localStorage.removeItem("user");
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/40 shadow-lg">
        <User className="w-6 h-6 text-white" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            className="absolute right-[50px] mt-[-40px] w-fit flex items-center justify-around bg-white/30 backdrop-blur-md rounded-md shadow-lg z-10"
          >
            {user ? (
              <>
                <button onClick={handleLogout} className="block px-4 py-2 text-white bg-white/20 hover:bg-white/40 rounded-md">
                  Logout
                </button>
                <Link to="/membership" className="block px-4 py-2 text-white hover:bg-white/40 rounded-md">
                  Membership
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="block px-4 w-[140px] py-2 text-white hover:bg-white/40 rounded-md">
                  Login | Signup
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 

export default Singin;