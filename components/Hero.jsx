'use client'
import React, { useEffect, useState } from "react";
import { Database, Microscope, LineChart, ChevronRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Styles remain the same
const styles = `
.animate-float {
  animation: float 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-float-slow {
  animation: float 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 8s ease infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.show {
  opacity: 1;
  transform: translateY(0) !important;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
}
`;

const features = [
  { 
    icon: <Database className="w-5 h-5" />, 
    text: "Data Management", 
    desc: "Secure & Organized",
    color: "blue" 
  },
  { 
    icon: <Microscope className="w-5 h-5" />, 
    text: "Sample Tracking", 
    desc: "Real-time Updates",
    color: "indigo" 
  },
  { 
    icon: <LineChart className="w-5 h-5" />, 
    text: "Lab Analytics", 
    desc: "Smart Insights",
    color: "violet" 
  },
  { 
    icon: <Microscope className="w-5 h-5" />, 
    text: "Workflow Automation", 
    desc: "Efficient Process",
    color: "purple" 
  }
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            setIsLoaded(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
      styleSheet.remove();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0L30 30M0 30L30 30" stroke="url(#blue-gradient)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB"/>
            <stop offset="100%" stopColor="#4F46E5"/>
          </linearGradient>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="z-10 space-y-6 md:space-y-8 order-2 md:order-1">
            <div 
              className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full 
                         bg-blue-100/80 text-blue-600 text-xs md:text-sm font-medium 
                         backdrop-blur-sm animate-on-scroll opacity-0 transform 
                         translate-y-4 ease-out hover:bg-blue-100 hover:shadow-md 
                         transition-all duration-300"
              role="badge"
            >
              <Microscope className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" aria-hidden="true" />
              <span>Next-Gen Lab Management</span>
            </div>
            
            <h1 className="animate-on-scroll opacity-0 transform translate-y-4 transition duration-1000 ease-out delay-200">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight block">
                Laboratory
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                             text-transparent bg-clip-text animate-gradient block">
                Information
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight block">
                Management System
              </span>
            </h1>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6 pt-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="hover-card p-3 md:p-4 rounded-xl border border-gray-200/80 
                            animate-on-scroll opacity-0 transform translate-y-4
                            backdrop-blur-sm bg-white/80"
                  tabIndex={0}
                  role="article"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 md:p-2 rounded-lg bg-blue-100 text-blue-600 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm md:text-base">{feature.text}</p>
                      <p className="text-xs md:text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA section */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
            <Link href="/services" passHref>
              <button 
                className="group px-6 py-3 md:px-8 md:py-4 bg-blue-600 text-white rounded-xl 
                         text-sm md:text-base font-semibold transition-all duration-300 
                         hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2 w-full sm:w-auto"
                aria-label="Get Started Free"
              >
                <span className="flex items-center justify-center">
                  Get Started Free
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-2 transform 
                                         group-hover:translate-x-1 transition-transform" 
                               aria-hidden="true" />
                </span>
              </button>
              </Link>
              <Link href="/services" passHref>
              <button 
                className="group px-6 py-3 md:px-8 md:py-4 border-2 border-blue-600 
                         text-blue-600 rounded-xl text-sm md:text-base font-semibold 
                         transition-all duration-300 hover:bg-blue-50 
                         hover:-translate-y-1 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
                aria-label="Watch Demo"
              >
                <span className="flex items-center justify-center">
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" aria-hidden="true" />
                  Watch Demo
                </span>
              </button>
              </Link>
            </div>
          </div>

          {/* Image section */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[600px] order-1 md:order-2 -mx-4 sm:mx-0">
            <div className="absolute inset-0 bg-blue-600 rounded-none sm:rounded-2xl rotate-3 opacity-10 
                          animate-pulse-slow" aria-hidden="true"></div>
            <div className="absolute inset-0 rounded-none sm:rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-white opacity-75"></div>
              <Image
                fill
                className="object-cover"
                src="/images/hero-girl.jpg"
                alt="Laboratory professional using LIMS system"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="eager"
              />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -left-2 sm:-left-8 top-1/4 bg-white/90 backdrop-blur-sm p-3 md:p-4 
                          rounded-xl shadow-lg animate-float-slow z-10 hover:shadow-xl 
                          transition-shadow max-w-[160px] sm:max-w-none">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Database className="w-3 h-3 md:w-4 md:h-4 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-black">Real-time Analysis</p>
                  <p className="text-[10px] md:text-xs text-gray-500">Processing data</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -right-2 sm:-right-8 bottom-1/4 bg-white/90 backdrop-blur-sm p-3 md:p-4 
                          rounded-xl shadow-lg animate-float z-10 hover:shadow-xl 
                          transition-shadow max-w-[160px] sm:max-w-none">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Microscope className="w-3 h-3 md:w-4 md:h-4 text-green-600" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs md:text-sm font-semibold text-black">Sample Tracking</p>
                  <p className="text-[10px] md:text-xs text-gray-500">100% Accurate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}