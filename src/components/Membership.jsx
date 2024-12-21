import React, { useState } from 'react';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap, Star, Gift, Crown } from 'lucide-react';

function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [upiUrl, setUpiUrl] = useState('');

  const handlePurchase = async () => {
    setIsPurchased(true);
  };

  const generateQRCode = async () => {
    const upiUrl = "upi://pay?pa=9811788821@paytm&pn=Dikshit Mahanot&am=75&cu=INR";
    setUpiUrl(upiUrl);
    try {
      const qrCode = await QRCode.toDataURL(upiUrl);
      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      alert("Error generating QR code.");
    }
  };

  const features = [
    { icon: MessageCircle, text: "100 Pickup Lines", color: "text-pink-500" },
    { icon: Zap, text: "100 Next Move Credits", color: "text-yellow-500" },
    { icon: Star, text: "Premium Features Access", color: "text-purple-500" },
    { icon: Gift, text: "Exclusive Content", color: "text-blue-500" },
    { icon: Crown, text: "VIP Support", color: "text-green-500" }
  ];

  return (
    <div>
      <button onClick={() => { setIsModalOpen(true); generateQRCode(); }} className="absolute top-[-100px] right-[100px] bg-blue-500 text-white py-2 px-4 rounded">
        Buy Membership
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 p-1 rounded-2xl shadow-lg w-[90%] max-w-md"
            >
              <div className="bg-white p-8 rounded-xl">
                {!isPurchased ? (
                  <>
                    <motion.h2 
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
                    >
                      Premium Membership
                    </motion.h2>

                    <div className="space-y-4 mb-6">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                        >
                          <feature.icon className={`w-6 h-6 ${feature.color}`} />
                          <span className="font-medium text-gray-700">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-center mb-6"
                    >
                      <span className="text-4xl font-bold text-purple-600">₹75</span>
                      <span className="text-gray-500 ml-2 line-through">₹299</span>
                    </motion.div>

                    {qrCodeUrl && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex justify-center mb-4"
                      >
                        <img src={qrCodeUrl} alt="UPI QR Code" className="w-48 h-48" />
                      </motion.div>
                    )}

                    <div className="mt-4">
                      <a href={upiUrl} className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity" onClick={handlePurchase}>
                        Pay ₹75
                      </a>
                    </div>

                    <div className="mt-4">
                      <label className="block mb-2 text-gray-700">Enter UPI ID used for payment:</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-center py-8"
                  >
                    <h2 className="text-2xl font-bold mb-4 text-purple-600">Purchase Confirmed!</h2>
                    <p className="text-gray-600">Your points will be added to your account within 24 hours.</p>
                  </motion.div>
                )}
                <div className="mt-4 text-right">
                  <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Membership;