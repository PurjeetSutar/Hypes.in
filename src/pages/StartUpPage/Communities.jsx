import React, { useState } from 'react';

const Communities = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      // Add logic to store email or send it to backend if necessary
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Join Our Community</h2>
      <p className="text-gray-700 mb-6 text-center">
        Be part of a growing community of innovators, entrepreneurs, and startup enthusiasts! Join our newsletter and stay updated with the latest news, events, and exclusive content.
      </p>

      {joined ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-500 mb-4">Thank You for Joining!</h3>
          <p className="text-gray-700">You’ve successfully subscribed to our newsletter.</p>
        </div>
      ) : (
        <form onSubmit={handleJoin} className="text-center">
          <label className="block mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter your email"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            Join the Community
          </button>
        </form>
      )}

      {/* Community Benefits */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Why Join Us?</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Get access to exclusive community events and meetups.</li>
          <li>Receive regular updates on startup resources and news.</li>
          <li>Engage with a network of like-minded individuals.</li>
          <li>Participate in discussions, forums, and group activities.</li>
        </ul>
      </div>
    </div>
  );
};

export default Communities;
