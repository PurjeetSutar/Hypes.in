import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth ,db } from '../Firebase/firebase';

const stages = [
  'Ideation',
  'Validation',
  'MVP',
  'Growth',
  'Scale',
  'Unicorn'
];

const ProgressBar = ({ startupId }) => {
  const [currentStage, setCurrentStage] = useState('Ideation'); // Default to Ideation

  // Fetch the current stage from Firestore when the component mounts
  useEffect(() => {
    const fetchStage = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const startupDocRef = doc(db, 'startups', startupId);
          const docSnap = await getDoc(startupDocRef);

          if (docSnap.exists()) {
            const startupData = docSnap.data();
            if (startupData.stage) {
              setCurrentStage(startupData.stage); // Set current stage from Firestore
            }
          }
        }
      } catch (error) {
        console.error('Error fetching stage:', error);
      }
    };

    fetchStage();
  }, [startupId]);

  // Calculate the width of the progress bar based on the current stage
  const calculateProgress = () => {
    const stageIndex = stages.indexOf(currentStage);
    return `${((stageIndex + 1) / stages.length) * 100}%`;
  };

  // Update the stage in Firestore when the user changes the stage
  const handleStageChange = async (e) => {
    const newStage = e.target.value;
    setCurrentStage(newStage);

    try {
      const user = auth.currentUser;
      if (user) {
        const startupDocRef = doc(db, 'startups', startupId);
        await setDoc(startupDocRef, { stage: newStage }, { merge: true }); // Update the stage in Firestore
      }
    } catch (error) {
      console.error('Error updating stage:', error);
    }
  };

  return (
    <div className="w-full p-4">
      {/* Dropdown for changing the stage */}
      <div className="mb-6 p-4">
        <select
          id="stage-select"
          value={currentStage}
          onChange={handleStageChange}
          className="p-2 border rounded"
        >
          {stages.map((stage) => (
            <option key={stage} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      </div>

      {/* Progress bar with stages */}
      <div className="relative mb-4 pt-4">
        {/* Background progress bar */}
        <div className="bg-gray-200 h-2 relative">
          <div
            className="bg-green-500 h-2 absolute"
            style={{ width: calculateProgress() }}
          ></div>
        </div>

        {/* Stage labels and dots */}
        <div className="flex justify-between absolute w-full top-[-30px]">
          {stages.map((stage, index) => (
            <div key={index} className="relative flex flex-col items-end" style={{ width: `${100 / stages.length}%` }}>
              <p className={`text-sm mb-2 ${currentStage === stage ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                {stage}
              </p>
              <div
                className={`h-4 w-4 rounded-full ${currentStage === stage ? 'bg-green-600' : 'bg-gray-400'}`}
                style={{ marginTop: '10px', position: 'absolute', top: '30px' }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
