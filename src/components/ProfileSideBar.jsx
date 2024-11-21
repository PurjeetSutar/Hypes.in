import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth,db } from '../Firebase/firebase';
import { FaEdit } from 'react-icons/fa'; // Import React Icons

const ProfileSideBar = ({ startupId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [startupDetails, setStartupDetails] = useState({
    age: '2 Years',
    valuation: '2 million',
    stage: 'Seed',
    category: 'EdTech',
    location: 'Mumbai',
    donations: '25 K',
    investorFunds: '1 Lakh',
    kickstarterProgress: 30 // in percentage
  });

  // Fetch startup data from Firestore
  useEffect(() => {
    const fetchStartupDetails = async () => {
      const docRef = doc(db, 'startups', startupId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStartupDetails(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchStartupDetails();
  }, [startupId]);

  // Update Firestore with new data
  const saveStartupDetails = async () => {
    const docRef = doc(db, 'startups', startupId);
    await setDoc(docRef, startupDetails, { merge: true });
    setIsEditing(false);
  };

  // Handle input changes for editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStartupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-8 max-w-md mx-auto">
      <div
        className="bg-white shadow-md rounded-lg p-4 mb-2 transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <strong>Startup Information</strong>
          <FaEdit onClick={() => setIsEditing(!isEditing)} className="cursor-pointer text-gray-600" />
        </div>

        {isEditing ? (
          <>
            <div className="mb-2">
              <strong>Startup Age:</strong>
              <input
                type="text"
                name="age"
                value={startupDetails.age}
                onChange={handleInputChange}
                className="border p-1 rounded ml-2"
              />
            </div>
            <div className="mb-2">
              <strong>Valuation:</strong>
              <input
                type="text"
                name="valuation"
                value={startupDetails.valuation}
                onChange={handleInputChange}
                className="border p-1 rounded ml-2"
              />
            </div>
            <div className="mb-2">
              <strong>Stage:</strong>
              <input
                type="text"
                name="stage"
                value={startupDetails.stage}
                onChange={handleInputChange}
                className="border p-1 rounded ml-2"
              />
            </div>
            <div className="mb-2">
              <strong>Category:</strong>
              <input
                type="text"
                name="category"
                value={startupDetails.category}
                onChange={handleInputChange}
                className="border p-1 rounded ml-2"
              />
            </div>
            <div className="mb-2">
              <strong>Location:</strong>
              <input
                type="text"
                name="location"
                value={startupDetails.location}
                onChange={handleInputChange}
                className="border p-1 rounded ml-2"
              />
            </div>
            <button
              onClick={saveStartupDetails}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <div className="mb-2">
              <strong>Startup Age:</strong> <span>{startupDetails.age}</span>
            </div>
            <div className="mb-2">
              <strong>Valuation:</strong> <span>{startupDetails.valuation}</span>
            </div>
            <div className="mb-2">
              <strong>Stage:</strong> <span>{startupDetails.stage}</span>
            </div>
            <div className="mb-2">
              <strong>Category:</strong> <span>{startupDetails.category}</span>
            </div>
            <div className="mb-2">
              <strong>Location:</strong> <span>{startupDetails.location}</span>
            </div>
          </>
        )}
      </div>

      <div
        className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl"
      >
        <h3 className="text-lg font-semibold mb-2">Manage Funds</h3>

        <div className="flex justify-between items-center mb-2">
          <span>Donations 👁️</span>
          {isEditing ? (
            <input
              type="text"
              name="donations"
              value={startupDetails.donations}
              onChange={handleInputChange}
              className="border p-1 rounded"
            />
          ) : (
            <span className="text-green-600 font-bold">{startupDetails.donations}</span>
          )}
        </div>

        <div className="flex justify-between items-center mb-2">
          <span>Investor Funds 👁️</span>
          {isEditing ? (
            <input
              type="text"
              name="investorFunds"
              value={startupDetails.investorFunds}
              onChange={handleInputChange}
              className="border p-1 rounded"
            />
          ) : (
            <span className="text-green-600 font-bold">{startupDetails.investorFunds}</span>
          )}
        </div>

        <div className="flex justify-between items-center mb-2">
          <span>Kick-Starter 👁️</span>
        </div>

        {/* Kickstarter Progress Bar */}
        <div className="relative pt-1 mb-2">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
            <div
              style={{ width: `${startupDetails.kickstarterProgress}%` }}
              className="bg-green-500 flex justify-center"
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-700 mt-1">
            <span>3 Lakh</span>
            <span>10 Lakh</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;
