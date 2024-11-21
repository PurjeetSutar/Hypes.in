import React, { useState } from 'react';

const Fund = () => {
  const [raisedAmount, setRaisedAmount] = useState(35000); // Example current raised amount
  const targetAmount = 100000; // Target funding goal
  const [donation, setDonation] = useState('');
  const [backers, setBackers] = useState(120); // Example backers count

  const handleDonation = (e) => {
    e.preventDefault();
    const donationAmount = parseFloat(donation);
    if (donationAmount > 0) {
      setRaisedAmount(raisedAmount + donationAmount);
      setBackers(backers + 1);
      setDonation('');
    }
  };

  // Calculate the percentage of the goal reached
  const calculateProgress = () => {
    return (raisedAmount / targetAmount) * 100;
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Funding Progress */}
      <h2 className="text-3xl font-bold mb-4">Support This Startup</h2>
      <p className="text-gray-700 mb-6">Help us reach our funding goal of <strong>${targetAmount.toLocaleString()}</strong> to bring this project to life!</p>
      
      <div className="relative mb-6">
        <div className="w-full bg-gray-200 h-4 rounded">
          <div
            className="bg-green-500 h-4 rounded"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>${raisedAmount.toLocaleString()} raised</span>
          <span>{calculateProgress().toFixed(2)}% funded</span>
        </div>
      </div>

      {/* Donation Form */}
      <form onSubmit={handleDonation} className="mb-6">
        <label className="block mb-2 font-semibold" htmlFor="donation">
          Enter your donation amount
        </label>
        <input
          type="number"
          id="donation"
          value={donation}
          onChange={(e) => setDonation(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter amount (e.g. 50)"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
        >
          Donate
        </button>
      </form>

      {/* Backers Info */}
      <div className="text-center">
        <p className="text-xl font-bold">{backers}</p>
        <p className="text-gray-700">Backers</p>
      </div>

      {/* Milestone Goals */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Milestone Goals</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Stretch goal at $50,000 - Launch beta version</li>
          <li>Stretch goal at $75,000 - Add premium features</li>
          <li>Final goal at $100,000 - Full public release</li>
        </ul>
      </div>
    </div>
  );
};

export default Fund;
