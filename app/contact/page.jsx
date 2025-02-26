'use client'
import React, { useState } from 'react';

export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    loading: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ ...formStatus, loading: true });
    
    // Simulate API call
    setTimeout(() => {
      // Success case
      setFormStatus({
        submitted: true,
        loading: false,
        error: null
      });
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          loading: false,
          error: null
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full mx-auto px-8 py-16   bg-blue-50  ">
      <div className="text-center mb-12">
        <h2 className="text-lg font-semibold text-blue-600 mb-2">GET IN TOUCH</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact <span className="text-blue-600">Our Experts</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our support team is here to help you with any questions about our Laboratory Information Management System
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left Column - Info Cards */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-transform hover:scale-[1.02] border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              How Can We Help You?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="ml-3 font-semibold">Technical Support</h4>
                </div>
                <p className="text-gray-600 text-sm pl-11">Get help with system setup and troubleshooting</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="ml-3 font-semibold">Sales Inquiries</h4>
                </div>
                <p className="text-gray-600 text-sm pl-11">Learn about pricing and system capabilities</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="ml-3 font-semibold">Partnership</h4>
                </div>
                <p className="text-gray-600 text-sm pl-11">Explore integration and partnership opportunities</p>
              </div>
              
              <div className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300 cursor-pointer">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="ml-3 font-semibold">Documentation</h4>
                </div>
                <p className="text-gray-600 text-sm pl-11">Access user guides and technical documentation</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <rect x="6" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
                <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
                <rect x="15" y="12" width="3" height="3" rx="0.5" fill="currentColor"/>
              </svg>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Schedule a Demo</h3>
            <p className="mb-6 max-w-md">See how our Laboratory Information Management System can transform your workflow and improve efficiency.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                </svg>
                <span>Watch Demo</span>
              </a>
              <a href="#" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <span>Book a Meeting</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative">
            {/* Badge notifications */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-md py-2 px-4 border border-gray-100">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium">24h Response Time</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Send Us a Message</h3>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you promptly</p>
            
            {formStatus.submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Message Sent Successfully!</h4>
                <p className="text-gray-600">Thank you for reaching out. One of our experts will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Sales Inquiry">Sales Inquiry</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Documentation">Documentation Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Please describe your question or issue in detail..."
                  ></textarea>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="text-gray-500">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to being contacted regarding my inquiry
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className={`w-full bg-blue-600 text-white py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center ${formStatus.loading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {formStatus.loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional Info Section */}
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Call Us</h4>
              <p className="text-gray-600 text-sm">Mon-Fri from 8am to 5pm</p>
              <a href="tel:+18005551234" className="text-blue-600 font-medium mt-1 block hover:underline">+1 (800) 555-1234</a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Email Us</h4>
              <p className="text-gray-600 text-sm">We'll respond within 24 hours</p>
              <a href="mailto:support@lims-example.com" className="text-blue-600 font-medium mt-1 block hover:underline">support@lims-example.com</a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex items-start">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1">Visit Us</h4>
              <p className="text-gray-600 text-sm">Come to our headquarters</p>
              <address className="text-blue-600 font-medium mt-1 block not-italic hover:underline">1234 Innovation Drive<br/>San Francisco, CA 94107</address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}