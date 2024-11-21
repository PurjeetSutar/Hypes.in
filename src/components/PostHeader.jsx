import React from 'react';

const PostHeader = ({ profileImage, name, bio, time }) => {

    // Convert Firebase timestamp object to a readable date string
    const formatTime = (firebaseTimestamp) => {
        if (firebaseTimestamp && firebaseTimestamp.seconds) {
            const date = new Date(firebaseTimestamp.seconds * 1000); // Convert seconds to milliseconds
            return date.toLocaleDateString('en-US', {
                weekday: 'long', // "Monday"
                year: 'numeric',  // "2023"
                month: 'long',    // "November"
                day: 'numeric',   // "12"
                hour: '2-digit',  // "08"
                minute: '2-digit' // "30"
            });
        }
        return 'Unknown time';
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
            {/* Profile Image */}
            {profileImage && (
                <div className="w-16 h-16 flex-shrink-0">
                    <img
                        className="w-full h-full rounded-full object-cover border-2 border-gray-300 shadow-md"
                        src={profileImage}
                        alt="Profile"
                    />
                </div>
            )}

            {/* Name and Bio */}
            <div className="flex flex-col justify-center">
                {name && <h2 className="text-lg font-bold text-gray-900">{name}</h2>}
                {bio && <p className="text-sm italic text-gray-600">{bio}</p>}
                
                {/* Render formatted time */}
                {time && <span className="text-xs text-gray-500">{formatTime(time)}</span>}
            </div>
        </div>
    );
};

export default PostHeader;
