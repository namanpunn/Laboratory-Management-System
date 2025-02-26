export default function Footer() {
    return (
      <footer className="bg-gray-50 text-gray-800 border-t border-gray-200 shadow-md">
        <div className="w-full max-w-screen-xl mx-auto p-4">
          <div className="flex flex-wrap items-center justify-between">
            {/* Logo Section */}
            <a
              href="#home"
              className="flex items-center space-x-3 rtl:space-x-reverse mb-4 sm:mb-0"
            >
              <img 
                className="h-8"
                src="/images/logo.png"
                alt="LIMS Logo"
              />
            </a>
  
            {/* Navigation Links */}
            <ul className="flex flex-wrap items-center text-sm font-medium space-x-6 rtl:space-x-reverse">
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
  
          {/* Divider */}
          <hr className="my-4 border-gray-200" />
  
          {/* Copyright Section */}
          <div className="text-center text-sm text-gray-700">
            <span className="block">
              © 2025{" "}
              <a href="#" className="text-gray-900 hover:underline font-medium">
                LIMS™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    );
  }