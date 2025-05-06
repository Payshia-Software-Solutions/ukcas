"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300 ${
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-white text-black shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <Image src="/assets/logo/mainlogo.png" alt="Logo" width={250} height={250} className="h-auto w-1/2" />
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-4">
          <Link href="/" className="block py-1 text-lg font-medium transition hover:text-green-400" onClick={handleLinkClick}>
            Home
          </Link>
          <Link href="/about" className="block py-1 text-lg font-medium transition hover:text-green-400" onClick={handleLinkClick}>
            About Us
          </Link>
          <Link href="/services" className="block py-1 text-lg font-medium transition hover:text-green-400" onClick={handleLinkClick}>
            Services
          </Link>

          {/* Dropdown */}
          <div className="space-y-1">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block py-1 text-lg font-medium transition hover:text-green-400 w-full text-left"
            >
              Verification {isDropdownOpen ? "▲" : "▼"}
            </button>
            {isDropdownOpen && (
              <div className="ml-4 space-y-2">
                <Link href="/certificate-verification" className="block text-base hover:text-green-400" onClick={handleLinkClick}>
                  Certificate Verification
                </Link>
                <Link href="/institute-verification" className="block text-base hover:text-green-400" onClick={handleLinkClick}>
                  Institute Verification
                </Link>
              </div>
            )}
          </div>

          <Link href="/Partnerships" className="block py-1 text-lg font-medium transition hover:text-green-400" onClick={handleLinkClick}>
            Partnerships
          </Link>
          <Link href="/contact" className="block py-1 text-lg font-medium transition hover:text-green-400" onClick={handleLinkClick}>
            Contact Us
          </Link>
          <Link href="/get-accredited" className="block py-2 text-lg font-semibold bg-[#7C2B33] text-white rounded text-center" onClick={handleLinkClick}>
            Get Accredited
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
