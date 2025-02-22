'use client'
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [isDoubleDropdownOpen, setIsDoubleDropdownOpen] = useState(false);
  
  const mainDropdownRef = useRef(null);
  const doubleDropdownRef = useRef(null);

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (mainDropdownRef.current && !mainDropdownRef.current.contains(event.target)) {
        setIsMainDropdownOpen(false);
      }
      if (doubleDropdownRef.current && !doubleDropdownRef.current.contains(event.target)) {
        setIsDoubleDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Escape key to close dropdowns
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape') {
        setIsMainDropdownOpen(false);
        setIsDoubleDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  return (
    <div>
      <nav className="bg-white border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="images/logo.png"
              className="h-10 "
              alt="Logo"
            />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              HyperNauts
            </span> */}
          </a>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-multi-level"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navigation menu */}
          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto`}
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 mr-5 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              
              {/* Main dropdown */}
              <li ref={mainDropdownRef}>
                <button
                  onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto  focus:text-white "
                >
                  Resources
                  <svg
                    className={`w-2.5 h-2.5 ms-2.5 transform ${isMainDropdownOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Main dropdown menu */}
                <div
                  className={`${
                    isMainDropdownOpen ? 'block' : 'hidden'
                  } absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 `}
                >
                  <ul className="py-2 text-sm text-gray-700 ">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100  hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    
                    {/* Double dropdown */}
                    <li ref={doubleDropdownRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDoubleDropdownOpen(!isDoubleDropdownOpen);
                        }}
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100  hover:text-white"
                      >
                        Dropdown
                        <svg
                          className={`w-2.5 h-2.5 ms-2.5 transform ${isDoubleDropdownOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      
                      {/* Double dropdown menu */}
                      <div
                        className={`${
                          isDoubleDropdownOpen ? 'block' : 'hidden'
                        } absolute left-full top-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 `}
                      >
                        <ul className="py-2 text-sm text-gray-700 ">
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100  text-gray-200 hover:text-white">
                              Overview
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100  text-gray-200 hover:text-white">
                              My downloads
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100  text-gray-200 hover:text-white">
                              Billing
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100  text-gray-200 hover:text-white">
                              Rewards
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100  hover:text-white">
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-white">
                      Sign out
                    </a>
                  </div>
                </div>
              </li>

              {/* Regular nav items */}
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0   hover:text-white ">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  hover:text-white ">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0   hover:text-white ">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}