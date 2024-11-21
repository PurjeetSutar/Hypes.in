import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import { collection,getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';
import NavbarSide from '../../components/NavbarSide';
import ExploreAside from '../../components/ExploreAside';
import FilterAside from '../../components/FilterAside';
const HomePage = () => {
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'startupposts'));
        const postData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <NavbarSide/>
      <div className="flex justify-center py-8">
        <aside className="w-1/5 bg-white rounded-lg shadow-md p-4">
        {/* Explore Section */}
        <ExploreAside/>
        <FilterAside/>
     
        </aside>

        <main className="w-3/5 mx-4">
          {/* Posts feed */}
          <div className="mt-6 space-y-6">
            {posts.length !== 0 ? (
              posts
                .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                .map((post) => (
                  <Post key={post.id} post={post} />
                ))
            ) : (
              <span>No posts</span>
            )}
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
    </div>
  );
};

export default HomePage;
