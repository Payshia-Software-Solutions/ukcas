import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] dark:bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company info</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about">About </Link>
            </li>
            <li>
              <Link href="/ervices">Services</Link>
            </li>
            <li>
              <Link href="/contact">Contact us</Link>
            </li>
            <li>
              <Link href="/assessment">Assessment</Link>
            </li>
            <li>
              <Link href="#">Verification </Link>
            </li>

            <li>
              <Link href="/partnerships">Partnerships</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer service</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Return and refund policy</Link>
            </li>
            <li>
              <Link href="#">Intellectual property policy</Link>
            </li>
            <li>
              <Link href="#">Shipping info</Link>
            </li>
            <li>
              <Link href="#">Report suspicious activity</Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#">Support center & FAQ</Link>
            </li>
            <li>
              <Link href="#">Safety center</Link>
            </li>
            <li>
              <Link href="#">Temu purchase protection</Link>
            </li>
            <li>
              <Link href="#">Sitemap</Link>
            </li>
            <li>
              <Link href="#">Partner with Temu</Link>
            </li>
          </ul>
        </div>

        {/* Download the App */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Head Office</h4>

          <p>
            Ceylon Pharma College (PVT) LTD,
            <br />
            L35, West Tower, World Trade Center, Colombo 01, Sri Lanka
          </p>

          <div>
            <p className="mb-1">Customer Service: 011 74 94 335</p>

            <p>Email: info@phamacollege.lk</p>
          </div>

          <div className="my-2">
            <h1 className="text-lg font-semibold">Operation Branch</h1>

            <p>L35, West Tower, World Trade Center, Colombo 01, Sri Lanka</p>

            <p className="mb-2"> 0715 884 884</p>
          </div>
        </div>
      </div>

      {/* Security and Payment */}
      <div className="max-w-7xl mx-auto px-6 mt-10 border-t border-gray-700 pt-6 flex flex-wrap justify-between items-center">
        <div className="flex gap-4">
          <span className="text-sm">Security certification</span>
          <Image
            src="/images/security-logos.png"
            alt="Security"
            className="h-6"
            width={100}
            height={100}
          />
        </div>
        <div className="flex gap-4">
          <span className="text-sm">We accept</span>
          <Image
            src="/images/payment-logos.png"
            alt="Payment Methods"
            className="h-6"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-6 text-xl">
        <FaInstagram />
        <FaFacebook />
        <FaTwitter />
        <FaTiktok />
        <FaYoutube />
        <FaPinterest />
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © 2025 WhaleCo Inc. | <Link href="#">Terms of use</Link> |{" "}
        <Link href="#">Privacy policy</Link> |{" "}
        <Link href="#">Your privacy choices</Link> |{" "}
        <Link href="#">Ad Choices</Link>
      </div>
    </footer>
  );
};

export default Footer;
