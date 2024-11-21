import React from 'react'
import { FaListAlt, FaRocket, FaUsers } from 'react-icons/fa'; // React icons for each item

const ExploreAside = () => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
    <h3 className="font-semibold text-lg text-white bg-green-500 p-3 rounded w-full">Explore</h3>
    <ul className="mt-4 space-y-3">
      <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 shadow-md">
        <FaListAlt className="text-blue-500" />
        <span className="text-gray-700 font-medium">All</span>
      </li>
      <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 shadow-md">
        <FaRocket className="text-blue-500" />
        <span className="text-gray-700 font-medium">Kickstarters</span>
      </li>
      <li className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 shadow-md">
        <FaUsers className="text-blue-500" />
        <span className="text-gray-700 font-medium">Collaborators</span>
      </li>
    </ul>
  </div>
  )
}

export default ExploreAside