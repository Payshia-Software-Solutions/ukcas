"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { IoMenu } from "react-icons/io5";

import MobileMenu from "./MobileMenu";



const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();






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
            {/* Links section */}
            <div className="flex gap-6">
              <Link href={"#"} className="font-semibold">
                Partership
              </Link>

              <div className="hidden md:flex gap-6">
                <Link href={"#"}>Portal</Link>
                <Link href={"#"}>Graduation</Link>
                <Link href={"#"}>Certificate</Link>
                {/* <Link href={"#"}>POS</Link> */}
              </div>
            </div>
          </div>
        </div>
        

        <div className="px-4 py-0 md:py-2 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-auto hidden md:flex justify-center md:justify-start mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-orange-500">

                <Image src="/assets/logo/mainlogo.png" className="h-24 w-auto object-cover" alt="Logo" width={150} height={100} />

              </Link>
            </div>

            

            
 


            <nav className="hidden md:flex gap-8 md:gap-10 items-center">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <Link href="/about" className="hover:text-gray-300"> About Us</Link>
              <Link href="/services" className="hover:text-gray-300">Services</Link>
              <Link href="/certificate-verification" className="hover:text-gray-300">Verification</Link>
              <Link href="/get-accredited" className="hover:text-gray-300">Get Accredited</Link>
              <Link href="/Partnerships" className="hover:text-gray-300">Partnerships</Link>
              <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
            </nav>

            <div className="flex items-center justify-end gap-4 ">
              <button className="hover:text-gray-300 justify-end flex my-4 md:hidden " onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <IoMenu className="w-6 h-6" />
              </button>
            </div>

            <div className="hidden md:flex">
              <button className="bg-[#7C2B33] text-white text-xl py-2 px-4 rounded-lg">
                <Link href="/get-accredited" target="">Get Accredited
                </Link>
              </button>
            </div>
          </div>
        </div>
      </header>

     

      {isMobileMenuOpen && <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />}

    </div>
  );
};

export default NavBar;
