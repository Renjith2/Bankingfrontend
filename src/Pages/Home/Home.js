import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Apicalls';
import HomeModal from './HomeModal';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Navigate=useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axiosInstance.get('/api/user/get-current-user', {
            headers: {
              Authorization: `Bearer ${token}`  // Add authorization header with token
            }
          });
          setUserData(response.data.data); // Store fetched user data in state
        } else {
          console.log('No token found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    fetchUser();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token')
  Navigate('/login')
  };

  return (
    <div>
      {/* Header Bar */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <div>
          {userData && (
            <>
              <div className="text-lg font-bold">{userData.firstName} {userData.surName}</div>
              <div className="text-sm">{userData.userName}</div>
            </>
          )}
        </div>
        <button className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100" onClick={handleLogout}>Logout</button>
      </div>

      {/* User Data Container */}
      <div className="container mx-auto mt-8 px-4">
        {userData && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <div className="font-bold">Email:</div>
              <div>{userData.email}</div>
            </div>
            <div className="mb-4">
              <div className="font-bold">Mobile Number:</div>
              <div>{userData.mobileNumber}</div>
            </div>
            <div className="mb-4">
              <div className="font-bold">Permanent Address:</div>
              <div>{userData.permanentAddress}</div>
            </div>
            <div className="mb-4">
              <div className="font-bold">Temporary Address:</div>
              <div>{userData.tempAddress}</div>
            </div>
            <div className="mb-4">
              <div className="font-bold">Aadhaar Details:</div>
              <div>{userData.aadhaarDetails}</div>
            </div>
            <div className="mb-4">
              <div className="font-bold">PAN Details:</div>
              <div>{userData.panDetails}</div>
            </div>
          </div>
        )}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Banking Services
      </button>
      {isModalOpen && <HomeModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Home;



