"use client"

import { useState } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function EquipmentRequestPage() {
  const [formData, setFormData] = useState({
    equipmentName: '',
    equipmentType: '',
    description: '',
    quantity: '',
    urgency: 'normal',
    requestDate: new Date().toISOString().split('T')[0]
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.equipmentName || !formData.equipmentType) {
        setMessage('Please fill in all required fields');
        return false;
      }
    } else if (step === 2) {
      if (!formData.quantity || !formData.urgency) {
        setMessage('Please fill in all required fields');
        return false;
      }
    }
    setMessage('');
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipmentName: formData.equipmentName,
          equipmentType: formData.equipmentType,
          description: formData.description,
          quantity: parseInt(formData.quantity, 10),
          urgency: formData.urgency,
          requestDate: formData.requestDate
        })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || 'Request submitted successfully');
        setFormData({
          equipmentName: '',
          equipmentType: '',
          description: '',
          quantity: '',
          urgency: 'normal',
          requestDate: new Date().toISOString().split('T')[0]
        });
        setStep(1);
      } else {
        setMessage(data.error || 'Error submitting request');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while processing your request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const equipmentTypes = [
    'Analytical Instrument',
    'Clinical Equipment',
    'Computer Hardware',
    'Consumables',
    'Diagnostic Equipment',
    'Laboratory Glassware',
    'Safety Equipment',
    'Other'
  ];

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <div className="text-sm font-medium text-blue-600">Basic Information</div>
          <div className="text-sm font-medium text-gray-400">Details & Specifications</div>
          <div className="text-sm font-medium text-gray-400">Review & Submit</div>
        </div>
        <div className="overflow-hidden rounded-full bg-gray-200 h-2">
          <div 
            className="h-2 bg-blue-500 transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Equipment Name <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-500">Enter the specific name of equipment</p>
                  </div>
                </div>
                <input
                  type="text"
                  name="equipmentName"
                  value={formData.equipmentName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g. Microscope XYZ-3000"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Equipment Type <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-500">Select the category this equipment belongs to</p>
                  </div>
                </div>
                <select
                  name="equipmentType"
                  value={formData.equipmentType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                >
                  <option value="">Select equipment type</option>
                  {equipmentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <p className="text-xs text-gray-500">Provide any additional details about the equipment</p>
                </div>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Include model, specifications, or any other relevant information"
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Quantity <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-500">Number of units requested</p>
                  </div>
                </div>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter quantity"
                />
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Urgency Level <span className="text-red-500">*</span></label>
                    <p className="text-xs text-gray-500">How soon do you need this equipment?</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-md p-3 cursor-pointer transition-all ${formData.urgency === 'low' ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, urgency: 'low'})}
                  >
                    <div className="flex justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.urgency === 'low' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-center text-sm font-medium">Low Priority</div>
                    <div className="text-center text-xs text-gray-500 mt-1">Within 30 days</div>
                  </div>
                  <div 
                    className={`border rounded-md p-3 cursor-pointer transition-all ${formData.urgency === 'normal' ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, urgency: 'normal'})}
                  >
                    <div className="flex justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.urgency === 'normal' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-center text-sm font-medium">Normal</div>
                    <div className="text-center text-xs text-gray-500 mt-1">Within 14 days</div>
                  </div>
                  <div 
                    className={`border rounded-md p-3 cursor-pointer transition-all ${formData.urgency === 'high' ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, urgency: 'high'})}
                  >
                    <div className="flex justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${formData.urgency === 'high' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464
                        0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="text-center text-sm font-medium">Urgent</div>
                    <div className="text-center text-xs text-gray-500 mt-1">Within 3 days</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Request Date</label>
                  <p className="text-xs text-gray-500">Date when this request is being made</p>
                </div>
              </div>
              <input
                type="date"
                name="requestDate"
                value={formData.requestDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </>
        );
      case 3:
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Review Your Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Equipment Name</p>
                <p className="text-base">{formData.equipmentName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Equipment Type</p>
                <p className="text-base">{formData.equipmentType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Quantity</p>
                <p className="text-base">{formData.quantity}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Urgency Level</p>
                <div className="flex items-center">
                  {formData.urgency === 'high' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
                      Urgent
                    </span>
                  )}
                  {formData.urgency === 'normal' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                      Normal
                    </span>
                  )}
                  {formData.urgency === 'low' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      Low Priority
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Request Date</p>
                <p className="text-base">{new Date(formData.requestDate).toLocaleDateString()}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-base">{formData.description || "No description provided."}</p>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    By submitting this request, you confirm that all information provided is accurate and the equipment is required for legitimate laboratory purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return (
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-md flex items-center transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center transition-colors duration-200"
          >
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md flex items-center transition-colors duration-200"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </>
            ) : (
              <>
                Submit Request
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SignedIn>
        <div className="bg-gray-50 rounded-xl shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-black">Laboratory</span>
              <span className="text-blue-500"> Equipment</span>
              <span className="text-black"> Request</span>
            </h1>
            <p className="text-gray-600 mt-2">Submit new equipment requests for lab operations</p>
          </div>
          
          {message && (
            <div className={`p-4 mb-6 rounded-md ${message.includes('error') || message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.includes('error') || message.includes('Error') ? (
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            </div>
          )}
          
          {renderProgressBar()}
          
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            {renderButtons()}
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Need help? Contact the lab management team at support@labsystem.com
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}