import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
       <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
      >
        <div>
          <img
            src="https://i.ibb.co.com/Q7YVQpg7/8bcab941c5460529caf339ac1681692d.jpg"
            alt="Donate Blood"
            className="h-[500px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/TDLynXmX/663293dc010ee34e938ac0ec48d2bf74.jpg"
            alt="Save Lives"
            className="h-[500px] object-cover"
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co.com/gZfNLmPq/398e4090cd022d8bb53472186a232b4c.jpg"
            alt="Blood Donation"
            className="h-[500px] object-cover"
          />
        </div>
      </Carousel>

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
        <div className="max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Donate blood, save lives
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Your blood is precious: Donate, save a life, make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/register"} className="px-6 py-3 rounded-2xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition">
              Join as Donor
            </Link>
            <Link to={"/search"}  className="px-6 py-3 rounded-2xl bg-white text-red-600 font-semibold shadow hover:bg-gray-100 transition">
              Search Donors
            </Link>
          </div>
        </div>
      </div>
    </div>

     
  );
};

export default Banner;
