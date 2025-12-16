import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / App Name */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Blood Donation</h2>
          <p>Donate blood, save lives, and help those in need.</p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link  className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Phone: +880 123 456 789</p>
          <p>Email: info@blooddonation.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-gray-200">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-200">
              Twitter
            </a>
            <a href="#" className="hover:text-gray-200">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-red-400 pt-4 text-sm">
        &copy; {new Date().getFullYear()} Blood Donation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
