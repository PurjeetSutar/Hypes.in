import React from 'react'
import { FaChevronDown } from 'react-icons/fa'; // Icon for dropdown
const FilterAside = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="font-semibold text-lg mb-4">Filter</h3>
    <div className="space-y-4">
      {['Region', 'Category', 'Time', 'Recents', 'Hyped'].map((filter) => (
        <div
          key={filter}
          className="flex justify-between items-center p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 shadow-md"
        >
          <span className="text-gray-700 font-medium">{filter}</span>
          <FaChevronDown className="text-gray-500" />
        </div>
      ))}
    </div>
  </div>
  )
}

export default FilterAside