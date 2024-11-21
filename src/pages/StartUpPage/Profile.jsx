import { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaLinkedin, FaInstagram } from 'react-icons/fa';  // import LinkedIn and Instagram icons
import { db } from '../../Firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import ProfileSideBar from '../../components/ProfileSideBar';

const Profile = ({ startupId }) => {
    const [editingSection, setEditingSection] = useState(null);
    const [startupDetails, setStartupDetails] = useState({
        mission: '',
        problemStatement: '',
        solution: '',
        marketOpportunity: '',
        keyMetrics: '',
        linkedin: '',      // add LinkedIn field
        externalLink: '',     // external link
    });

    // Fetch existing data from Firestore for the startup
    useEffect(() => {
        const fetchData = async () => {
            try {
                const startupDoc = await getDoc(doc(db, 'startups', startupId));
                if (startupDoc.exists()) {
                    setStartupDetails(startupDoc.data());
                }
            } catch (error) {
                console.error('Error fetching startup data:', error);
            }
        };

        fetchData();
    }, [startupId]);

    // Handle edit mode
    const handleEdit = (section) => {
        setEditingSection(section);
    };

    // Handle save to Firestore
    const handleSave = async () => {
        try {
            const startupRef = doc(db, 'startups', startupId);
            await updateDoc(startupRef, startupDetails);
            setEditingSection(null);
            alert('Details saved successfully');
        } catch (error) {
            console.error('Error saving to Firestore:', error);
        }
    };

    // Handle input changes
    const handleChange = (e, field) => {
        setStartupDetails({ ...startupDetails, [field]: e.target.value });
    };

    return (
        <div className="flex flex-row p-6 bg-gray-100 min-h-screen">
            {/* Profile Section */}
            <div className="w-3/4 p-6 bg-white rounded-lg shadow-lg">
                {/* Mission */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Mission</h3>
                    {editingSection === 'mission' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.mission}
                                onChange={(e) => handleChange(e, 'mission')}
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.mission}</p>
                            <button onClick={() => handleEdit('mission')} className="text-gray-500">
                                <FaEdit size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Problem Statement */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Problem Statement</h3>
                    {editingSection === 'problemStatement' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.problemStatement}
                                onChange={(e) => handleChange(e, 'problemStatement')}
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.problemStatement}</p>
                            <button onClick={() => handleEdit('problemStatement')} className="text-gray-500">
                                <FaEdit size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Solution */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Solution</h3>
                    {editingSection === 'solution' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.solution}
                                onChange={(e) => handleChange(e, 'solution')}
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.solution}</p>
                            <button onClick={() => handleEdit('solution')} className="text-gray-500">
                                <FaEdit size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Market Opportunity */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Market Opportunity</h3>
                    {editingSection === 'marketOpportunity' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.marketOpportunity}
                                onChange={(e) => handleChange(e, 'marketOpportunity')}
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.marketOpportunity}</p>
                            <button onClick={() => handleEdit('marketOpportunity')} className="text-gray-500">
                                <FaEdit size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Key Metrics */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Key Metrics</h3>
                    {editingSection === 'keyMetrics' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.keyMetrics}
                                onChange={(e) => handleChange(e, 'keyMetrics')}
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.keyMetrics}</p>
                            <button onClick={() => handleEdit('keyMetrics')} className="text-gray-500">
                                <FaEdit size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* LinkedIn */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                    {editingSection === 'linkedin' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.linkedin}
                                onChange={(e) => handleChange(e, 'linkedin')}
                                placeholder="Enter LinkedIn URL"
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.linkedin}</p>
                            <div className="flex items-center gap-2">
                                <FaLinkedin size={24} className="text-blue-600" />
                                <button onClick={() => handleEdit('linkedin')} className="text-gray-500">
                                    <FaEdit size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Instagram */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">External Link</h3>
                    {editingSection === 'externalLink' ? (
                        <div className="flex items-start gap-2">
                            <textarea
                                className="w-full p-2 border rounded focus:outline-none"
                                value={startupDetails.externalLink}
                                onChange={(e) => handleChange(e, 'externalLink')}
                                placeholder="Enter ExternalLink URL"
                            />
                            <button onClick={handleSave} className="text-green-500">
                                <FaSave size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 leading-relaxed">{startupDetails.externalLink}</p>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit('externalLink')} className="text-gray-500">
                                    <FaEdit size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Component */}
            <ProfileSideBar startupId={startupId} />
        </div>
    );
};

export default Profile;
