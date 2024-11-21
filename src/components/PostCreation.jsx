import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { storage, db } from '../Firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, query, onSnapshot, orderBy, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { FaBold, FaItalic, FaUnderline, FaUpload, FaTrash } from 'react-icons/fa'; // Import FaTrash for delete icon

const PostCreation = ({ startupId }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fontStyle, setFontStyle] = useState({
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    fontSize: 16,
  });
  const [startupPosts, setStartupPosts] = useState([]);
  const [startupData, setStartupData] = useState(null); // Store the startup data

  const currentUser = getAuth().currentUser;

  // Fetch startup data using the startupId
  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        const startupDoc = await getDoc(doc(db, 'startups', startupId));
        if (startupDoc.exists()) {
          setStartupData(startupDoc.data());
        } else {
          console.log('No such startup!');
        }
      } catch (error) {
        console.error('Error fetching startup data:', error);
      }
    };

    if (startupId) {
      fetchStartupData();
    }
  }, [startupId]);

  // Fetch posts related to the startup
  useEffect(() => {
    const q = query(collection(db, 'startupposts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStartupPosts(posts);
    });

    return () => unsubscribe();
  }, []);

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let imageDownloadUrl = null;

        if (imageFile) {
          const imageRef = ref(storage, `startuppostimages/${uuidv4()}-${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          imageDownloadUrl = await getDownloadURL(imageRef);
        }

        await addDoc(collection(db, 'startupposts'), {
          content: values.content,
          imageUrl: imageDownloadUrl,
          createdAt: new Date(),
          userName: currentUser ? currentUser.displayName || currentUser.email : 'Anonymous',
          uid: currentUser ? currentUser.uid : null,
          startupId, // Storing startup ID
          startupName: startupData ? startupData.startupName : 'Unknown', // Storing startup info from fetched data
          startupProfileImage: startupData ? startupData.logoUrl : '', // Storing profile image from fetched data
        });

        resetForm();
        setImageUrl(null);
        setImageFile(null);
        console.log('Startup post saved successfully!');
        navigate('/home');
      } catch (error) {
        console.error('Error saving post:', error);
      }
    },
    validate: (values) => {
      const errors = {};
      if (values.content.length > 200) {
        errors.content = 'Content must be 200 characters or less';
      }
      return errors;
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'startupposts', postId));
      console.log('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <form onSubmit={formik.handleSubmit}>
          <textarea
            className="w-full bg-gray-200 p-4 rounded-lg focus:outline-none resize-none shadow-inner"
            rows="3"
            placeholder="What's on your mind?"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              fontWeight: fontStyle.fontWeight,
              fontStyle: fontStyle.fontStyle,
              textDecoration: fontStyle.textDecoration,
              fontSize: `${fontStyle.fontSize}px`,
            }}
          ></textarea>
          {formik.errors.content && <p className="text-red-500 text-sm">{formik.errors.content}</p>}
          {imageUrl && (
            <div className="mt-4 max-w-full">
              <img src={imageUrl} alt="Uploaded Preview" className="w-full rounded-lg shadow-md" />
            </div>
          )}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => setFontStyle({ ...fontStyle, fontWeight: fontStyle.fontWeight === 'bold' ? 'normal' : 'bold' })}
              className="p-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => setFontStyle({ ...fontStyle, fontStyle: fontStyle.fontStyle === 'italic' ? 'normal' : 'italic' })}
              className="p-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => setFontStyle({ ...fontStyle, textDecoration: fontStyle.textDecoration === 'underline' ? 'none' : 'underline' })}
              className="p-2 rounded-full hover:bg-gray-300 transition-all"
            >
              <FaUnderline />
            </button>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
            <label htmlFor="imageUpload" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition-all">
              <FaUpload />
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-all">
              Post
            </button>
          </div>
        </form>
      </div>

      {/* Mapping through the posts */}
      <div>
        {startupPosts.length === 0 ? (
          <p>No posts yet. Be the first to post!</p>
        ) : (
          // Filter posts that match the current startupId
          startupPosts
            .filter((post) => post.startupId === startupId)
            .map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-xl shadow-md mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={post.startupProfileImage || 'https://via.placeholder.com/50'}
                    alt="Profile"
                    className="w-12 h-12 rounded-full shadow"
                  />
                  <div>
                    <p className="font-semibold">{post.startupName}</p>
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="ml-auto p-2 rounded-full hover:bg-red-200 transition-all"
                    title="Delete Post"
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
                <p className="mt-4">{post.content}</p>
                {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full max-w-md h-auto rounded-lg shadow-md" />}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default PostCreation;
