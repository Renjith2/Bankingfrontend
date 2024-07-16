import React, { useState } from 'react';
import { registerService } from '../../Apicalls/Service';

function HomeModal({ onClose }) {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceId: '',
    requestType: '',
  });

  const [backendMessage, setBackendMessage] = useState('');

  const handleServiceChange = (e) => {
    const serviceName = e.target.value;
    let serviceId;

    switch (serviceName) {
      case 'net banking':
        serviceId = '198001';
        break;
      case 'mobile banking':
        serviceId = '198002';
        break;
      case 'UPI access':
        serviceId = '198003';
        break;
      case 'demat accounts':
        serviceId = '198004';
        break;
      default:
        serviceId = '';
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      serviceName,
      serviceId,
    }));
  };

  const handleRequestTypeChange = (e) => {
    const requestType = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      requestType,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await registerService(formData);
        if (response.message) {
          setBackendMessage(response.message);
        } else {
          setBackendMessage(response.error);
        }
      } catch (error) {
        setBackendMessage('Internal server error');
      }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Add Banking Services</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Service Name</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={formData.serviceName}
              onChange={handleServiceChange}
            >
              <option value="">Select a service</option>
              <option value="net banking">Net Banking</option>
              <option value="mobile banking">Mobile Banking</option>
              <option value="UPI access">UPI Access</option>
              <option value="demat accounts">Demat Accounts</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Service ID</label>
            <input
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="text"
              value={formData.serviceId}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Request Type</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={formData.requestType}
              onChange={handleRequestTypeChange}
            >
              <option value="">Select request type</option>
              <option value="register">Register</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeModal;
