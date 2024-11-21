import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from '../../Firebase/firebase';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profilePicUrl: '',
    coverPhotoUrl: ''
  });

  const [profilePic, setProfilePic] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicUrl: previewUrl });
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhoto(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, coverPhotoUrl: previewUrl });
    }
  };

  // Function to upload a file to Firebase Storage
  const uploadFile = async (file, folderName) => {
    const user = auth.currentUser;
    if (user) {
      const fileRef = ref(storage, `${folderName}/${user.uid}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    try {
      if (user) {
        // Upload profile pic to storage
        if (profilePic) {
          const profilePicUrl = await uploadFile(profilePic, 'profilePics');
          if (profilePicUrl) {
            formData.profilePicUrl = profilePicUrl;
          }
        }

        // Upload cover photo to storage
        if (coverPhoto) {
          const coverPhotoUrl = await uploadFile(coverPhoto, 'coverPhotos');
          if (coverPhotoUrl) {
            formData.coverPhotoUrl = coverPhotoUrl;
          }
        }

        // Save data to Firestore
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, formData);

        navigate("/home");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Cover Photo */}
          <div className="relative">
            <img
              src={formData.coverPhotoUrl || "/default-cover-photo.jpg"}
              alt="Cover"
              className="w-full h-40 object-cover"
            />
            <label className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 rounded-lg cursor-pointer">
              Change Cover
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPhotoChange}
              />
            </label>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center p-6 -mt-12">
            <div className="relative">
              <img
                src={formData.profilePicUrl || "/default-profile-pic.jpg"}
                alt="Profile"
                className="rounded-full h-32 w-32 object-cover border-4 border-white"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-full cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
                Edit
              </label>
            </div>
            <h1 className="text-xl font-bold mt-4">{formData.name}</h1>
            <p className="text-gray-600">{formData.bio}</p>
          </div>

          {/* Edit Profile Section */}
          <div className="p-6 space-y-6">
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-bold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-bold">Bio</label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => navigate('/home')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
