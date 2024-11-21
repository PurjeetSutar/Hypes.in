import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import NavbarSide from '../../components/NavbarSide';
import OnePagerFeed from '../../components/OnePagerFeed'; // Newly created OnePagerFeed component
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ExploreAside from '../../components/ExploreAside';
import FilterAside from '../../components/FilterAside';
const StartupFeedPage = () => {
  const [startups, setStartups] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'startups'));
        const startupsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStartups(startupsData);
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchStartups();
  }, [db]);

  return (
    <>
      <Navbar />
      <NavbarSide />
      <div className="flex justify-center py-8">
        <aside className="w-1/5 bg-white rounded-lg shadow-md p-4">
        <ExploreAside/>
        <FilterAside/>
        </aside>

        <main className="w-3/5 mx-4">
          {/* Posts feed */}
          <div className="mt-6 space-y-6">
            {startups.map(startup => (
              <OnePagerFeed key={startup.id} startup={startup} />
            ))}
          </div>
        </main>

        <aside className="w-1/5 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-blue-500">People You May Know</h3>
          <ul className="mt-4 space-y-4">
            <li className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/50"
                alt="Person"
              />
              <span className="ml-4">John Doe</span>
            </li>
            <li className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/50"
                alt="Person"
              />
              <span className="ml-4">Jane Smith</span>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default StartupFeedPage;
