import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NextMove() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      console.log(file);
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      alert('Please upload an image first!');
      return;
    }

    setIsLoading(true);

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
      console.log('OCR Result:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 text-white p-4">
      <div style={{boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}} className="backdrop-blur-md flex items-center justify-between w-[80%] rounded-full mt-[15px] px-8 py-4 fixed top-0 left-1/2 transform -translate-x-1/2 z-20 shadow-black bg-white/30">
        <Link to="/" className="text-lg font-semibold text-purple-300">
          Home
        </Link>
        <a href="#" className="text-lg font-semibold text-purple-300">
          Next Move
        </a>
      </div>
      <h1 className="text-2xl mb-4">Image to Text Extraction</h1>
      <form>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
      </form>
      {selectedImage && (
        <div className="flex flex-col items-center">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded Preview"
            style={{ maxWidth: '300px', margin: '20px 0' }}
          />
          <button
            onClick={handleExtractText}
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Extracting...' : 'Extract Text'}
          </button>
        </div>
      )}
      {isLoading && (
        <div className="mt-4">
          <div className="loader"></div> {/* Spinner for loading */}
          <p>Please wait...</p>
        </div>
      )}
    </div>
  );
}

export default NextMove;
