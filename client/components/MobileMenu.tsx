"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [showVerificationDropdown, setShowVerificationDropdown] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setShowVerificationDropdown(false);
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

        {/* Nav Items */}
        <nav className="px-4 space-y-4">
          <Link href="/" onClick={handleLinkClick} className="block text-lg font-medium">
            Home
          </Link>
          <Link href="/about" onClick={handleLinkClick} className="block text-lg font-medium">
            About Us
          </Link>
          <Link href="/services" onClick={handleLinkClick} className="block text-lg font-medium">
            Services
          </Link>

          {/* Dropdown Menu */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer text-lg font-medium"
              onClick={() => setShowVerificationDropdown(!showVerificationDropdown)}
            >
              <span>Verification</span>
              <Image
                src="/assets/images/drop.png"
                alt="Dropdown"
                width={20}
                height={20}
                className={`transition-transform duration-300 ${showVerificationDropdown ? "rotate-180" : ""}`}
              />
            </div>
            {showVerificationDropdown && (
              <div className="ml-4 mt-2 space-y-2 text-base">
                <Link href="/certificate-verification" onClick={handleLinkClick} className="block hover:text-green-500">
                  Certificate Verification
                </Link>
                <Link href="/institute-verification" onClick={handleLinkClick} className="block hover:text-green-500">
                  Institute Verification
                </Link>
              </div>
            )}
          </div>

          <Link href="/Partnerships" onClick={handleLinkClick} className="block text-lg font-medium">
            Partnerships
          </Link>
          <Link href="/contact" onClick={handleLinkClick} className="block text-lg font-medium">
            Contact Us
          </Link>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/get-accredited"
              onClick={handleLinkClick}
              className="block text-center bg-[#7C2B33] text-white py-2 rounded-md font-semibold"
            >
              Get Accredited
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
