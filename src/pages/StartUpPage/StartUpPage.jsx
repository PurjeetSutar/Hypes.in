import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import NavbarSide from '../../components/NavbarSide';
import ProgressBar from '../../components/ProgressBar';
import PostCreation from '../../components/PostCreation';
import OnePager from './OnePager';
import Communities from './Communities';
import Collabration from './Collabration';
import Fund from './Fund';
import Profile from './Profile';
import { db, auth } from '../../Firebase/firebase';

const StartupPage = () => {
  const { startupId } = useParams();
  const [activeTab, setActiveTab] = useState('1 Pager');
  const navigate = useNavigate();
  const [startupData, setStartupData] = useState({
    startupName: '',
    startupDesc: '',
    logoUrl: '',
    coverPhotoUrl: '',
  });
  const [logo, setLogo] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const docRef = doc(db, 'startups', startupId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStartupData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching startup data:', error);
      }
    };

    fetchStartupData();
  }, [startupId]);

  // Automatically save changes to Firestore
  const handleChange = async (field, value) => {
    const updatedData = { ...startupData, [field]: value };
    setStartupData(updatedData);

    try {
      const startupDocRef = doc(db, "startups", startupId);
      await setDoc(startupDocRef, updatedData);
    } catch (error) {
      console.error('Error updating startup data:', error);
    }
  };

  // Upload a file to Firebase Storage and return its URL
  const uploadFile = async (file, folderName) => {
    const fileRef = ref(storage, `${folderName}/${startupId}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const logoUrl = await uploadFile(file, 'startupProfile');
      handleChange('logoUrl', logoUrl);
    }
  };

  const handleCoverPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const coverPhotoUrl = await uploadFile(file, 'startupCover');
      handleChange('coverPhotoUrl', coverPhotoUrl);
    }
  };


  return (
    <>
      <Navbar />
      <NavbarSide />
      <div className="flex h-screen">
        <aside className="w-1/6 bg-gray-200 p-4">
          <div className="text-center">
            <button onClick={() => navigate('/profile')}><p className="mt-2">Profile</p></button>
          </div>
        </aside>

        <main className="w-3/4 bg-white p-8">
          <div className="relative">
            {/* Cover Photo */}
            <img
              src={startupData.coverPhotoUrl || '/default-cover-photo.jpg'}
              alt="Cover"
              className="w-full h-40 object-cover"
            />
            <label className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded-lg cursor-pointer">
              Edit
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPhotoChange}
              />
            </label>
          </div>

          {/* Logo and Name in one line */}
          <div className="flex items-center mt-4">
            <div className="relative">
              <img
                src={startupData.logoUrl || "/default-logo.jpg"}
                alt="Logo"
                className="rounded-full h-32 w-32 object-cover border-4 border-white"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-full cursor-pointer">
                Edit
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            <h1 className="text-3xl font-bold ml-4">
              <input
                type="text"
                value={startupData.startupName}
                onChange={(e) => handleChange('startupName', e.target.value)}
                className="bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500 text-3xl font-bold"
                placeholder="Enter startup name"
              />
            </h1>
          </div>

          {/* Description below logo and name */}
          <div className="mt-4">
            <textarea
              value={startupData.startupDesc}
              onChange={(e) => handleChange('startupDesc', e.target.value)}
              className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500 text-lg"
              placeholder="Enter startup description"
            />
          </div>

          {/* Progress bar */}
          <ProgressBar startupId={startupId} />


          <div className="flex gap-4 mb-8">
            <button
              className={`py-2 px-4 rounded ${activeTab === 'Profile' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
              onClick={() => setActiveTab('Profile')}
            >
              Profile
            </button>
            <button
              className={`py-2 px-4 rounded ${activeTab === '1 Pager' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
              onClick={() => setActiveTab('1 Pager')}
            >
              1 Pager
            </button>
            <button
              className={`py-2 px-4 rounded ${activeTab === 'Posts' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
              onClick={() => setActiveTab('Posts')}
            >
              Posts
            </button>
            <button
              className={`py-2 px-4 rounded ${activeTab === 'Communities' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
              onClick={() => setActiveTab('Communities')}
              disabled
            >
              Communities
            </button>
            <button
              className={`py-2 px-4 rounded ${activeTab === 'Collaborations' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
              onClick={() => setActiveTab('Collaborations')}
              disabled
            >
              Collaborations
            </button>
            <button
              className={`py-2 px-4 rounded ${activeTab === 'Funds' ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
              onClick={() => setActiveTab('Funds')}
              disabled
            >
              Funds
            </button>
          </div>

          <div className="bg-gray-100 p-8 h-auto">
            {activeTab === 'Profile' && <Profile startupId={startupId} />}
            {activeTab === '1 Pager' && <OnePager startupId={startupId} />}
            {activeTab === 'Posts' && <PostCreation startupId={startupId} />}
            {activeTab === 'Communities' && <Communities startupId={startupId} />}
            {activeTab === 'Collaborations' && <Collabration startupId={startupId} />}
            {activeTab === 'Funds' && <Fund startupId={startupId} />}
          </div>


        </main >
      </div >
    </>
  );
};

export default StartupPage;
