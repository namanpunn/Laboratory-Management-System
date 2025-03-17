// components/Loader/Loader.jsx
import React, { useEffect, useState } from 'react';

const LabLoader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + Math.random() * 10, 100));
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-72 sm:w-96 flex flex-col items-center">
        {/* Main animation container */}
        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
          {/* Rotating outer circle */}
          <div className="absolute w-56 h-56 border-4 border-gray-100 rounded-full">
            <div className="absolute w-full h-full border-t-4 border-blue-600 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
          </div>
          
          {/* Dashed middle circle */}
          <div className="absolute w-40 h-40 border-2 border-dashed border-blue-400 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          
          {/* Lab flask in center */}
          <div className="relative w-20 h-32">
            {/* Flask outline */}
            <div className="absolute w-20 h-28 border-2 border-blue-600 rounded-b-full overflow-hidden">
              {/* Flask neck */}
              <div className="absolute top-0 left-4 w-12 h-4 bg-white border-2 border-blue-600 border-b-0"></div>
              
              {/* Animated liquid fill */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-300 ease-out"
                style={{ 
                  height: `${progress}%`,
                  opacity: 0.7,
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                }}
              ></div>
              
              {/* Bubbles */}
              {progress > 30 && (
                <>
                  <div className="absolute bottom-1/4 left-3 w-2 h-2 bg-white rounded-full animate-ping opacity-75" style={{ animationDuration: '1.5s' }}></div>
                  <div className="absolute bottom-2/4 left-6 w-1 h-1 bg-white rounded-full animate-ping opacity-75" style={{ animationDuration: '2s', animationDelay: '0.3s' }}></div>
                  <div className="absolute bottom-1/3 left-12 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75" style={{ animationDuration: '1.8s', animationDelay: '0.6s' }}></div>
                </>
              )}
            </div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute w-56 h-56 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute w-56 h-56 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute w-56 h-56 animate-spin" style={{ animationDuration: '10s' }}>
            <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Icon row */}
        <div className="flex justify-between w-64 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-blue-600 rounded-md mb-1 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 animate-pulse"></div>
            </div>
            <span className="text-xs text-gray-600">Analysis</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-blue-600 rounded-full mb-1 flex items-center justify-center">
              <div className="w-4 h-1 bg-blue-600 animate-pulse"></div>
            </div>
            <span className="text-xs text-gray-600">Processing</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-blue-600 rounded-md mb-1 flex items-center justify-center rotate-45">
              <div className="w-4 h-4 bg-blue-600 animate-pulse"></div>
            </div>
            <span className="text-xs text-gray-600">Data</span>
          </div>
        </div>
        
        {/* Text and progress */}
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          <span className="text-blue-600">Laboratory</span> Information Management System
        </h3>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 relative overflow-hidden">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          
          {/* Moving highlight effect */}
          <div 
            className="absolute top-0 h-full w-20 bg-white opacity-20 animate-pulse"
            style={{ 
              left: `${Math.min(progress - 10, 80)}%`,
              display: progress < 5 ? 'none' : 'block'
            }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-600 flex justify-between w-full">
          <span className="animate-pulse">Initializing system...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default LabLoader;