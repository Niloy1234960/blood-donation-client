import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* 1. Brand Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white tracking-tight">
            <span className="text-red-600">Blood</span> Donation
          </h2>
          <p className="text-sm leading-relaxed">
            Connecting heroes with those in need. Our platform makes blood donation simple, fast, and secure. Every drop counts!
          </p>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/ni.l.y.m.ndal" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              <FaFacebookF size={18} />
            </a>
           
            <a href="https://www.instagram.com/nilo.y472/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.linkedin.com/in/niloy-mondal-5244323a2/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* 2. Quick Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
            <li><Link to="/donation-requests" className="hover:text-red-500 transition-colors">Donation Requests</Link></li>
            <li><Link to="/search" className="hover:text-red-500 transition-colors">Search Donor</Link></li>
            <li><Link to="/blogs" className="hover:text-red-500 transition-colors">Latest Blogs</Link></li>
          </ul>
        </div>

        {/* 3. Contact Info */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-red-600" />
              <span>+880 18 341 320 80</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-red-600" />
              <span>info@blooddonation.com</span>
            </li>
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-red-600 mt-1" />
              <span>Mymensingh<br /> Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* 4. Newsletter */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6 relative inline-block">
            Newsletter
            <span className="absolute -bottom-1 left-0 w-8 h-1 bg-red-600 rounded-full"></span>
          </h3>
          <p className="text-sm mb-4">Subscribe to get updates on emergency blood needs.</p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-red-900/20">
              Subscribe Now
            </button>
          </form>
        </div>

      </div>

      {/* Copyright Bottom */}
      <div className="mt-16 border-t border-slate-800 pt-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} Blood Donation Platform. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors">Terms of Service</Link>
            <Link className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;