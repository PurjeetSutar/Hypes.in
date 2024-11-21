import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db, auth } from '../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const StartupCard = ({ setShowCard, showCard }) => {
  const [startupName, setStartupName] = useState('');
  const [startupDesc, setStartupDesc] = useState('');

  const navigate = useNavigate();

  const saveStartupData = async () => {
    try {
      const user = auth.currentUser; // Get the current authenticated user
      if (user) {
        const { uid, displayName } = user; // Extract uid and displayName

        // Add startup data to Firestore including the creator's name and uid
        const docRef = await addDoc(collection(db, 'startups'), {
          startupName,
          startupDesc,
          createdBy: displayName || 'Anonymous', // Use displayName if available, or fallback
          creatorUid: uid, // Store the user's uid
          createdAt: new Date(), // Store the creation timestamp
        });

        console.log('Document written with ID: ', docRef.id);
        
        // Navigate to the startup page using the Firestore document ID
        navigate(`/startup/${docRef.id}`); // Pass the document ID directly to the navigate function
      } else {
        console.error('No user is signed in');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleCreateStartupPage = async () => {
    // Save data to Firestore and navigate to the startup page
    await saveStartupData();
  };

  const handleCancel = () => {
    setShowCard(false);
  };

  return (
    <>
      {showCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-20 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Create Your Startup</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Startup Name</label>
                <input
                  type="text"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#01a153]"
                  placeholder="Enter startup name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Startup Description</label>
                <textarea
                  value={startupDesc}
                  onChange={(e) => setStartupDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#01a153]"
                  placeholder="Enter startup description"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleCreateStartupPage}
                  className="bg-[#01a153] text-white py-2 px-4 rounded-lg hover:bg-[#029d47] transition-all duration-200"
                >
                  Create Startup Page
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StartupCard;
