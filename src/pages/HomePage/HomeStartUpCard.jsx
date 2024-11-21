import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeStartUpCard = ({ startup, toggleNavbar }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the startup page with the startup.id
    navigate(`/startup/${startup.id}`);
    toggleNavbar();
  };

  return (
    <div
      className="bg-white shadow-md p-4 rounded-lg mb-4 cursor-pointer hover:shadow-lg transition-shadow w-11/12 mx-auto mt-8"
      onClick={handleClick}
    >
      <div className="flex items-center">
        {/* Profile Picture on the left */}
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          {startup.logoUrl ? (
            <img
              src={startup.logoUrl}
              alt="Startup Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>

        {/* Text Section with Startup Name and Description */}
        <div>
          <h3 className="text-xl font-bold text-green-600">{startup.startupName}</h3>
          <p className="text-gray-600">{startup.startupDesc}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeStartUpCard;
