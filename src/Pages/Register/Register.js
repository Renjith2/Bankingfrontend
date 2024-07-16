import React, { useState } from 'react';
import { validateAadhaar, validateEmail, validateMobileNumber, validatePAN, validatePassword } from '../Validation/Validation';
import { registerUser } from '../../Apicalls/User';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    surName: '',
    userName: '',
    password: '',
    mobileNumber: '',
    email: '',
    tempAddress: '',
    permanentAddress: '',
    panDetails: '',
    aadhaarDetails: ''
  });

  const [errors, setErrors] = useState({});
  const Navigate= useNavigate()

  const handleChange =  (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [backendMessage, setBackendMessage] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validatePAN(formData.panDetails)) {
      validationErrors.panDetails = "Invalid PAN number";
    }

    if (!validateAadhaar(formData.aadhaarDetails)) {
      validationErrors.aadhaarDetails = "Invalid Aadhaar number";
    }

    if (!validatePassword(formData.password)) {
      validationErrors.password = "Password must be at least 10 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }
    
    if (!validateMobileNumber(formData.mobileNumber)) {
      validationErrors.mobileNumber = "Mobile number must be 10 digits starting with 0-9";
    }

    if (!validateEmail(formData.email)) {
      validationErrors.email = "Email must be a valid Gmail address (e.g., example@gmail.com)";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } 
    
    
  else {
      setErrors({});
    console.log(formData);
  };
      
  try {
    const response = await registerUser(formData);
    if (response.message) {
      setBackendMessage(response.message);
      localStorage.setItem('token',response.data)
      Navigate('/home')
    } else {
      setBackendMessage(response.error);
    }
  } catch (error) {
    setBackendMessage('Internal server error');
  }


}


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-full max-w-4xl max-h-screen overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block text-gray-700">First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Sur Name:</label>
          <input 
            type="text" 
            name="surName" 
            value={formData.surName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">User Name:</label>
          <input 
            type="text" 
            name="userName" 
            value={formData.userName} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Mobile Number:</label>
          <input 
            type="text" 
            name="mobileNumber" 
            value={formData.mobileNumber} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
          {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Temporary Address:</label>
          <input 
            type="text" 
            name="tempAddress" 
            value={formData.tempAddress} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Permanent Address:</label>
          <input 
            type="text" 
            name="permanentAddress" 
            value={formData.permanentAddress} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">PAN Details:</label>
          <input 
            type="text" 
            name="panDetails" 
            value={formData.panDetails} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
            {errors.panDetails && <p className="text-red-500 text-sm">{errors.panDetails}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Aadhaar Details:</label>
          <input 
            type="text" 
            name="aadhaarDetails" 
            value={formData.aadhaarDetails} 
            onChange={handleChange} 
            className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
          />
            {errors.aadhaarDetails && <p className="text-red-500 text-sm">{errors.aadhaarDetails}</p>}
        </div>
        <div className="col-span-1 md:col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-700">
            Register
          </button>

          <Link to="/login" className="w-full">
    <button
      type="button"
      className="w-full bg-blue-100 text-blue-700 py-2 rounded mt-4 hover:bg-blue-200"
    >
      Already Registered? Login
    </button>
  </Link>
        </div>
        {backendMessage && <p className="col-span-1 md:col-span-2 text-center text-red-500 mt-4">{backendMessage}</p>}
      </form>
    </div>
  );
}

export default Register;
