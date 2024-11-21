import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

// This component represents a single startup's data
const OnePagerFeed = ({ startup }) => {
  // Define stages and their associated progress values
  const stages = {
    "Ideation": 20,
    "Seed Round": 40,
    "Early Stage": 60,
    "Growth Stage": 80,
    "Expansion": 100
  };

  const progress = stages[startup.stage] || 0;

  return (
    <div className="p-2 bg-gray-100 w-full flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header Section */}
        <div className="flex items-start mb-6">
          {/* Profile Photo */}
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
            {startup.logoUrl ? (
              <img
                src={startup.logoUrl}
                alt="Startup Logo"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            )}
          </div>

          {/* Startup Name and Description */}
          <div>
            <h2 className="text-xl font-semibold">{startup.startupName}</h2>
            <p className="text-gray-600">
              {startup.startupDesc || 'Description not available.'}
              {startup.linkedin && (
              <a 
                href={startup.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center mt-2 text-blue-600"
              >
                <FaLinkedin size={32} className="mr-2" />
              </a>
            )}
            </p>
          </div>
        </div>



        {/* Main Content Section */}
        <div className="flex">
          {/* Left Section with Image and Links */}
          <div className="w-1/2 flex flex-col justify-center items-center">
            {startup.coverPhotoUrl ? (
              <img
                src={startup.coverPhotoUrl}
                alt="Startup Cover"
                className="w-48 h-48 mb-4 object-cover"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-300 mb-4"></div>
            )}

            <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full">
              <FaPlus className="text-gray-600" />
            </div>
          </div>

          {/* Right Section with Details */}
          <div className="w-1/2 pl-8">
            <div className="mb-4">
              <strong>Valuation:</strong> {startup.valuation || 'Not Available'}
            </div>
            <div className="mb-4">
              <strong>Category:</strong> {startup.category || 'Not Available'}
              &nbsp;&nbsp;&nbsp;
              <strong>Location:</strong> {startup.location || 'Not Available'}
            </div>
            <div className="mb-4">
              <strong>Experience:</strong> {startup.age || 'Not Available'} Years
              &nbsp;&nbsp;&nbsp;
              <strong>Certification:</strong> {startup.startupCertification || 'None'}
            </div>

            <div className="mb-4">
              <strong>Problem, Solution & Innovation</strong>
              <p className="text-gray-600">
                {startup.problemStatement || 'No problem statement provided.'}
              </p>
              <p className="text-gray-600">
                {startup.solution || 'No solution provided.'}
              </p>
            </div>

            <div className="mb-4">
              <strong>Team & Startup Backers:</strong> Not Provided
            </div>

            <div className="mb-4">
              <strong>More Details:</strong> Lean Canvas
            </div>

            <div>
              <strong>Links:</strong> Not Provided
            </div>


          </div>
        </div>
        {/* Progress Bar for Startup Stage */}

        <p className="mb-4"><strong>Stage:</strong> {startup.stage || 'Unknown'}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default OnePagerFeed;
