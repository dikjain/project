import React, { useState, useEffect } from 'react';
import { Heart, ThumbsDown, Trash2, Loader2, MessageSquare, PlusCircle, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useUser } from './Context/Context.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
import Singin from './components/Singin.jsx'; // Import Singin component


function UserLines() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLineContent, setNewLineContent] = useState('');
  const [sortOption, setSortOption] = useState('popular');

  const fetchAllLines = async () => {
    try {
      const response = await axios.get('/api/line/get');
      setLines(response.data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch all lines');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    fetchAllLines();
  }, [user, setUser]);


  const handleLikeDislike = async (lineId, action) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    try {
      let response;
      if (action === 'like') {
        response = await axios.post(`/api/line/like/${lineId}/${user._id}`);
      } else {
        response = await axios.post(`/api/line/dislike/${lineId}/${user._id}`);
      }
      setLines(lines.map(line => line._id === lineId ? response.data : line));
      toast.success(`Line ${action}d!`);
    } catch (err) {
      toast.error(`Failed to ${action} the line`);
    }
  };

  const handleDelete = async (lineId) => {
    if (!user) {
      navigate('/');
      return;
    }
    try {
      await axios.post(`/api/line/delete/${lineId}`);
      setLines(lines.filter(line => line._id !== lineId));
      toast.success('Line deleted!');
    } catch (err) {
      navigate('/');
    }
  };

  const handleCreate = async () => {
    if (!user) {
      navigate('/');
      return;
    }
    try {
      await axios.post('/api/line/create', { content: newLineContent, userid: user._id });
      fetchAllLines();
      toast.success('Line created!');
      setIsModalOpen(false);
      setNewLineContent('');
    } catch (err) {
      console.log(err);
      toast.error('Failed to create the line');
    }
  };

  const handleCopy = (lineContent) => {
    navigator.clipboard.writeText(lineContent);
    toast.success('Line copied to clipboard!');
  };

  const sortLines = (lines, option) => {
    switch (option) {
      case 'popular':
        return lines.sort((a, b) => b.likedBy.length - a.likedBy.length);
      case 'recent':
        return lines.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'disliked':
        return lines.sort((a, b) => b.dislikedBy.length - a.dislikedBy.length);
      case 'myline':
        if (!user) {
          navigate('/');
          return [];
        }
        return lines.filter(line => line.createdBy._id === user._id);
      default:
        return lines;
    }
  };



  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex flex-col items-center py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      
      <div style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}} className="backdrop-blur-md flex items-center justify-between w-[80%] rounded-full mt-[15px] px-8 py-4 absolute top-0 left-1/2 transform -translate-x-1/2 z-20 shadow-black bg-white/30">
        <Link to="/home" className="text-lg font-semibold text-purple-300">
          Home
        </Link>
        <Link to="/next-move" className="text-lg font-semibold text-purple-300">
          Next Move
        </Link>
        <Link to="/userlines" className="text-lg font-semibold text-purple-300">
          Lines
        </Link>
      </div>

      <motion.div 
        className="w-full max-w-4xl mt-[80px]"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Lines By Users</h1>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-white/80 hover:text-green-400 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Create</span>
              </button>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative w-[320px] h-12 z-30 bg-white/20 backdrop-blur-md rounded-full shadow-xl overflow-hidden">
              <motion.div
                className={`absolute top-0 h-full w-1/4 rounded-full bg-gradient-to-r ${sortOption === 'popular' ? 'from-blue-500 to-purple-500' : sortOption === 'recent' ? 'from-green-500 to-teal-500' : sortOption === 'disliked' ? 'from-red-500 to-orange-500' : 'from-yellow-500 to-orange-500'}`}
                animate={{ x: sortOption === 'popular' ? '0%' : sortOption === 'recent' ? '100%' : sortOption === 'disliked' ? '200%' : '300%' }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              ></motion.div>
              <div className="absolute inset-0 flex justify-between items-center">
                <button
                  onClick={() => setSortOption('popular')}
                  className="w-1/4 h-full rounded-full font-semibold text-white transition-all duration-300"
                >
                  Popular
                </button>
                <button
                  onClick={() => setSortOption('recent')}
                  className="w-1/4 h-full rounded-full font-semibold text-white transition-all duration-300"
                >
                  Recent
                </button>
                <button
                  onClick={() => setSortOption('disliked')}
                  className="w-1/4 h-full rounded-full font-semibold text-white transition-all duration-300"
                >
                  Disliked
                </button>
                <button
                  onClick={() => setSortOption('myline')}
                  className="w-1/4 h-full rounded-full font-semibold text-white transition-all duration-300"
                >
                  My Line
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          ) : lines.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MessageSquare className="w-12 h-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">No lines found. Start creating some!</p>
            </motion.div>
          ) : (
            <AnimatePresence>
              {sortLines(lines, sortOption).map((line, index) => (
                <motion.div 
                  key={line._id}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 mb-4 transform transition-all hover:bg-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, ease: "easeInOut" }}
                >
                  <p className="text-white font-semibold text-lg mb-2">{line.content}</p>
                  <p className="text-white/70 text-sm mb-2">Created by: {line.createdBy.username}</p>
                  <div className="flex items-center justify-end gap-4">
                    <button 
                      onClick={() => {
                        if (!line.likedBy.includes(user._id)) {
                          handleLikeDislike(line._id, 'like');
                        } else {
                          handleLikeDislike(line._id, 'dislike');
                        }
                      }}
                      className={`flex items-center gap-2 ${user && line.likedBy.includes(user._id) ? 'text-pink-400' : 'text-white/80'} hover:text-pink-400 transition-colors`}
                    >
                      <Heart className="w-5 h-5" />
                      <span>{line.likedBy.length}</span>
                    </button>
                    <button 
                      onClick={() => {
                        if (!line.dislikedBy.includes(user._id)) {
                          handleLikeDislike(line._id, 'dislike');
                        } else {
                          handleLikeDislike(line._id, 'like');
                        }
                      }}
                      className={`flex items-center gap-2 ${user && line.dislikedBy.includes(user._id) ? 'text-blue-400' : 'text-white/80'} hover:text-blue-400 transition-colors`}
                    >
                      <ThumbsDown className="w-5 h-5" />
                      <span>{line.dislikedBy.length}</span>
                    </button>
                    {user && user._id === line.createdBy._id && (
                      <button 
                        onClick={() => handleDelete(line._id)}
                      className="text-white/80 hover:text-red-400 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleCopy(line.content)}
                      className="text-white/80 hover:text-green-400 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl w-[90%] max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-white">Create New Line</h2>
            <textarea 
              className="w-full p-4 border border-gray-300 rounded mb-4 bg-white/20 text-white placeholder-white/50"
              rows="6"
              value={newLineContent}
              onChange={(e) => setNewLineContent(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-50">
        <Singin />
      </div>
    </motion.div>
  );
}

export default UserLines;