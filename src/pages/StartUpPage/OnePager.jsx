import React, { useState, useEffect } from 'react';
import { FaPlus, FaLinkedin } from 'react-icons/fa'; // Import LinkedIn icon
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom'; // Assuming you're passing the startup ID in the URL

const OnePager = () => {
  const { startupId } = useParams(); // Get the startupId from the URL
  const [startupData, setStartupData] = useState({
    startupName: '',
    startupDesc: '',
    stage: '',
    valuation: '',
    category: '',
    location: '',
    age: '',
    mission: '',
    problemStatement: '',
    solution: '',
    keyMetrics: '',
    marketOpportunity: '',
    logoUrl: '',
    coverPhotoUrl: '',
    linkedIn: '',  // Add LinkedIn field
  });

  const db = getFirestore();

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const docRef = doc(db, 'startups', startupId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStartupData({
            startupName: data.startupName,
            startupDesc: data.startupDesc,
            stage: data.stage || '',
            valuation: data.valuation || '',
            category: data.category || '',
            location: data.location || '',
            age: data.age || '',
            mission: data.mission || '',
            problemStatement: data.problemStatement || '',
            solution: data.solution || '',
            keyMetrics: data.keyMetrics || '',
            marketOpportunity: data.marketOpportunity || '',
            logoUrl: data.logoUrl || '',
            coverPhotoUrl: data.coverPhotoUrl || '',
            linkedIn: data.linkedin || '',  // Fetch LinkedIn data
            externalLink: data.externalLink || ''
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching startup data:', error);
      }
    };

    fetchStartupData();
  }, [startupId, db]);

  return (
    <div className="p-2 bg-gray-100 w-full flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex items-start mb-6">
          {/* Profile Photo */}
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
            {startupData.logoUrl ? (
              <img
                src={startupData.logoUrl}
                alt="Startup Logo"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            )}
          </div>
          {/* Startup Name and Description */}
          <div>
            <h2 className="text-xl font-semibold">{startupData.startupName}
            </h2>

            <p className="text-gray-600">
              {startupData.startupDesc || 'Description not available.'}
              {startupData.linkedIn && (
                <a
                  href={startupData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-2 text-blue-600"
                >
                  <FaLinkedin size={32} className="mr-2" />
                </a>
              )}
            </p>
            {/* Display LinkedIn Icon as clickable link */}

          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex">
          {/* Left Section */}
          <div className="w-1/2 flex flex-col justify-center items-center">
            <div className="w-48 h-48 bg-gray-300 mb-4">
              {startupData.coverPhotoUrl ? (
                <img
                  src={startupData.coverPhotoUrl}
                  alt="Cover Photo"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-300"></div>
              )}
            </div>
            <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full">
              <FaPlus className="text-gray-600" />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/2 pl-8">
            <div className="mb-4">
              <strong>Stage:</strong> {startupData.stage || 'N/A'} &nbsp;&nbsp;&nbsp;
              <strong>Valuation:</strong> {startupData.valuation || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Category:</strong> {startupData.category || 'N/A'} &nbsp;&nbsp;&nbsp;
              <strong>Location:</strong> {startupData.location || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Age:</strong> {startupData.age || 'N/A'} &nbsp;&nbsp;&nbsp;
              <strong>Key Metrics:</strong> {startupData.keyMetrics || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Mission:</strong> {startupData.mission || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Problem Statement:</strong> {startupData.problemStatement || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Solution:</strong> {startupData.solution || 'N/A'}
            </div>
            <div className="mb-4">
              <strong>Market Opportunity:</strong> {startupData.marketOpportunity || 'N/A'}
            </div>
            <div className="mb-4">

            </div>
          </div>

        </div>
        <div className='mt-2 p-4 shadow-sm'>
        <strong className="mr-2">External Link:</strong>
        {startupData.externalLink !== 'N/A' ? (
          <a
            href={startupData.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {/* Directly slice the string here */}
            {startupData.externalLink && startupData.externalLink.length > 20 ? `${startupData.externalLink.slice(0, 30)}...` : startupData.externalLink}
          </a>
        ) : (
          <span>N/A</span>
        )}
        </div>

        {/* Post Button */}
        <div className="flex justify-end mt-6">
          <button className="bg-green-800 text-white px-6 py-2 rounded-full">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnePager;
