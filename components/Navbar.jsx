'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  // Function to check if the link is active
  const isActive = (href) => pathname === href ? 'text-blue-700 font-semibold' : 'text-gray-900';

  return (
    <div>
      <nav className="bg-white border-gray-200 shadow-sm border-b-2">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="images/logo.png" className="h-10" alt="Logo" />
          </Link>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:order-2">
            {/* Auth buttons */}
            <div className="flex items-center space-x-3">
              <SignedOut>
                <SignInButton className="text-gray-900 hover:text-blue-700" />
                <SignUpButton className="ml-3 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800" />
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
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto md:order-1`}>
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link href="/" className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${isActive('/')}`}>Home</Link>
              </li>
              <li>
                <Link href="/services" className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${isActive('/services')}`}>Services</Link>
              </li>
              <li>
                <Link href="/pricing" className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${isActive('/pricing')}`}>Pricing</Link>
              </li>
              <li>
                <Link href="/contact" className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${isActive('/contact')}`}>Contact</Link>
              </li>
              <li>
                <Link href="/issue" className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${isActive('/contact')}`}>Issue</Link>
              </li>
              <li>
                <Link href="/dashboard" className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 ${isActive('/contact')}`}>Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}