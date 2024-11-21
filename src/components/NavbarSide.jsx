import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger and Close icons from React Icons
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/firebase';
import HomeStartUpCard from '../pages/HomePage/HomeStartUpCard';
import { useNavigate } from 'react-router-dom';
import StartupCard from './StartupCard';
import { IoMdAddCircle } from "react-icons/io";

const NavbarSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [startups, setStartups] = useState([]);
  const [profileData, setProfileData] = useState({ profilePicUrl: '', name: '' });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Fetch startups created by the user
          const q = query(
            collection(db, 'startups'),
            where('creatorUid', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const startupList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStartups(startupList);

          // Fetch user profile data (name and profile picture)
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setProfileData(userDocSnap.data());
          }
        }
      } catch (error) {
        console.error('Error fetching startups or profile data:', error);
      }
    };

    fetchStartups();
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle the drawer
  };

  return (
    <>
      {showCard && (<StartupCard setShowCard={setShowCard} showCard={showCard} />)}
      {/* Hamburger Icon */}
      <div className="fixed top-8 left-6 z-20">
        <FaBars
          className="text-3xl cursor-pointer text-white-800"
          color="white"
          onClick={toggleNavbar}
        />
      </div>

      {/* Sidebar / Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white text-green-800 z-10 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <FaTimes className="text-2xl cursor-pointer" onClick={toggleNavbar} />
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col items-center p-4 cursor-pointer " onClick={() => navigate('/profile')}>
          <img
            src={profileData.profilePicUrl || "/default-profile-pic.jpg"} // Fallback if no profile picture
            alt="Profile"
            className="rounded-full h-36 w-36 object-cover mb-2 border-2 border-green-600 shadow-md hover:shadow-lg transition-shadow"
          />
          <h2 className="text-2xl font-bold">{profileData.name || 'User Name'}</h2>
        </div>

        {/* Sidebar Content */}
        <h1 className="font-bold text-center text-2xl my-4 pl-4 mx-auto ">My Startup Page's</h1>
        <div className="overflow-y-auto">
          {startups.map((startup) => (
            <HomeStartUpCard key={startup.id} startup={startup} toggleNavbar={toggleNavbar} />
          ))}
        </div>
        <div className="flex  justify-center items-center p-4">
          <IoMdAddCircle onClick={() => setShowCard(!showCard)} size={40} color="green" className='cursor-pointer' />
        </div>

      </div>

    

      {/* Overlay when sidebar is open */ }
  {
    isOpen && (
      <div
        className="fixed inset-0 bg-black opacity-50 z-5"
        onClick={toggleNavbar}
      ></div>
    )
  }
    </>
  );
};

export default NavbarSide;
