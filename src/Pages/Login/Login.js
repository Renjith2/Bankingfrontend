import React, { useState } from 'react';
import { loginUser } from '../../Apicalls/User';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    mobileNumber: '',
    otp: ''
  });

  const Navigate = useNavigate();
  const [backendMessage, setBackendMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.message) {
        setBackendMessage(response.message);
        localStorage.setItem('token',response.data)
        Navigate('/home');
      } else {
        setBackendMessage(response.error);
      }
    } catch (error) {
      setBackendMessage('Internal server error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"  // Changed to type="password"
            name="password"  // Changed name to "password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">OTP</label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        {backendMessage && (
          <p className="col-span-1 md:col-span-2 text-center text-red-500 mt-4">
            {backendMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;




