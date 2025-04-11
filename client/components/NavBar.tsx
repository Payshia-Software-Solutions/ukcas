"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import MobileMenu from "./MobileMenu";

const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showVerificationDropdown, setShowVerificationDropdown] = useState<boolean>(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (pathname !== "/") {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setShowVerificationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <header
        className={`fixed top-0 left-0 w-full bg-white shadow text-black z-50 transition-transform duration-300 ${
          isVisible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {/* Top Bar */}
        <div className="flex justify-center">
          <div className="bg-[#74323B] w-full text-sm py-2 px-4 flex sm:justify-start md:justify-center text-white">
            <div className="flex gap-6">
              <Link href={"#"} className="font-semibold">
                Partership
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href={"#"}>Portal</Link>
                <Link href={"#"}>Graduation</Link>
                <Link href={"#"}>Certificate</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-0 md:py-2 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-auto hidden md:flex justify-center md:justify-start mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-orange-500">
                <Image
                  src="/assets/logo/mainlogo.png"
                  className="h-24 w-auto object-cover"
                  alt="Logo"
                  width={150}
                  height={100}
                />
              </Link>
            </div>

            {/* Nav Section */}
            <nav className="hidden md:flex gap-8 md:gap-10 items-center" ref={dropdownRef}>
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/about" className="hover:text-gray-300">About Us</Link>
              <Link href="/services" className="hover:text-gray-300">Services</Link>

              {/* Clickable Dropdown for Verification */}
              <div className="relative">
                <button
                  className="hover:text-gray-300 focus:outline-none"
                  onClick={() => setShowVerificationDropdown(!showVerificationDropdown)}
                >
                  Verification
                </button>
                {showVerificationDropdown && (
                  <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                    <Link
                      href="/certificate-verification"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                      onClick={() => setShowVerificationDropdown(false)}
                    >
                      Certificate Verification
                    </Link>
                    <Link
                      href="/institute-verification"
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                      onClick={() => setShowVerificationDropdown(false)}
                    >
                      Institute Verification
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/Partnerships" className="hover:text-gray-300">Partnerships</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
            </nav>

            <div className="flex items-center justify-end gap-4">
              <button
                className="hover:text-gray-300 justify-end flex my-4 md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <IoMenu className="w-6 h-6" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button className="bg-[#7C2B33] text-white text-xl py-2 px-4 rounded-lg">
                <Link href="/get-accredited">Get Accredited</Link>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}
    </div>
  );
};

export default NavBar;
