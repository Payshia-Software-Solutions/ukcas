"use client";

import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-300 ${
        isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className={`fixed top-0 overflow-auto right-0 h-screen w-3/4 max-w-sm bg-white text-black shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="sr-only">Close menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center py-4">
          <Image src="/assets/images/samplelogo.png" alt="Logo" width={250} height={250} className="h-auto w-1/2" />
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-4">
         
          <Link href="/about" className="block py-1 text-lg font-medium transition hover:text-green-400"> About Us</Link>
          <Link href="/services" className="block py-1 text-lg font-medium transition hover:text-green-400">Services</Link>
          <Link href="/assessment" className="block py-1 text-lg font-medium transition hover:text-green-400">Assessment</Link>
              <Link href="/verification" className="block py-1 text-lg font-medium transition hover:text-green-400">Verification</Link>
              <Link href="/partnerships" className="block py-1 text-lg font-medium transition hover:text-green-400">Partnerships</Link>
              <Link href="/contact" className="block py-1 text-lg font-medium transition hover:text-green-400">Contact Us</Link>


          {/* <div className="md:flex justify-between items-center mt-5">
            <div className="text-white text-center flex justify-around gap-2">
              <button className="bg-[#00b67d] text-lg py-2 px-4 rounded-full h-auto">Request Info</button>
              <button className="bg-[#00b67d] text-lg py-2 px-4 rounded-full h-auto">Apply</button>
            </div>
          </div> */}
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
