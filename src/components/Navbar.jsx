import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // For navigation
import { BsFillPersonFill } from "react-icons/bs";
import { GiBinoculars } from "react-icons/gi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { MdRocketLaunch } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { IoIosBug } from "react-icons/io";
import StartupCard from './StartupCard'; // Assuming you have this component
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; // For search

const Navbar = () => {
  const [showCard, setShowCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to handle search logic (you can replace with your own search logic)
  const handleSearch = async (e) => {
    e.preventDefault();
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const startupsRef = collection(db, "startups");

    const userQuery = query(usersRef, where("name", "==", searchTerm));
    const startupQuery = query(startupsRef, where("name", "==", searchTerm));

    const usersSnapshot = await getDocs(userQuery);
    const startupsSnapshot = await getDocs(startupQuery);

    usersSnapshot.forEach((doc) => {
      console.log('User:', doc.data());
      // Handle navigation or showing results
    });

    startupsSnapshot.forEach((doc) => {
      console.log('Startup:', doc.data());
      // Handle navigation or showing results
    });
  };

  return (
    <>
      <header className="bg-[#01a153] shadow-sm">
        <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => { navigate('/home') }}>
              <img src="/hypes2.png" alt="logo" width="40" height="50" />
              <span className='text-white'>Home</span>
            </button>
            <div className="flex gap-4">
              {/* Button layout updated for centering */}
              <button className="flex flex-col items-center text-white" onClick={() => navigate('/startupfeed')}>
                <MdRocketLaunch size={32} />
                <span>Startup Feed</span>
              </button>
              <button className="flex flex-col items-center text-white" onClick={() => navigate('/notification')}>
                <IoNotifications size={32} />
                <span>Notification</span>
              </button>
              <button className="flex flex-col items-center text-white" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSd6vBWaJMoeDRUtKgQmNbWTezBc7j-D2-bEBmURJ2owrvUGJw/viewform?vc=0&c=0&w=1&flr=0', '_blank')}>
                <IoIosBug size={32} />
                <span>Feedback</span>
              </button>
            </div>
          </div>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              className="bg-gray-100 px-4 py-2 rounded-lg border focus:outline-none"
              type="search"
              placeholder="Search for people, startups, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="ml-2 text-white bg-blue-500 px-4 py-2 rounded">Search</button>
          </form>
          <button className="flex flex-col items-center text-white" onClick={() => navigate('/')}>
            <RiLogoutBoxFill size={32} />
            <span>Logout</span>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
