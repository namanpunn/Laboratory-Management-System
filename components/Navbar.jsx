'use client'
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from '@clerk/nextjs'

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
      <nav className="bg-white border-gray-200 shadow-sm border-b-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="images/logo.png"
              className="h-10"
              alt="Logo"
            />
          </a>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:order-2">
            {/* Auth buttons */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                {/* Optional: add redirectUrl prop if you want to control the landing page after sign in/up */}
                <SignInButton 
                  className="text-gray-900 hover:text-blue-700" 
                  /* redirectUrl="/dashboard"  // Uncomment and modify if needed */
                />
                <SignUpButton 
                  className="ml-3 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800" 
                  /* redirectUrl="/dashboard"  // Uncomment and modify if needed */
                />
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
            
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ml-2"
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
          </div>

          {/* Navigation menu */}
          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } w-full md:block md:w-auto md:order-1`}
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              
              {/* Main dropdown */}
              <div className="hidden">
              <li ref={mainDropdownRef}>
                <button
                  onClick={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                  className="hidden flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
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
                  } absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
                >
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-700"
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
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 hover:text-blue-700"
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
                        } absolute left-full top-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
                      >
                        <ul className="py-2 text-sm text-gray-700">
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-blue-700">
                              Overview
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-blue-700">
                              My downloads
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-blue-700">
                              Billing
                            </a>
                          </li>
                          <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-gray-700 hover:text-blue-700">
                              Rewards
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-700">
                        Earnings
                      </a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700">
                      Sign out
                    </a>
                  </div>
                </div>
              </li>
              </div>

              {/* Regular nav items */}
              <li>
                <Link href="/services" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}