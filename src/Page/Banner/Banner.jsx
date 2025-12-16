import { Link } from "react-router";


const Banner = () => {
  return (
    <div className="relative h-[80vh] w-full flex items-center justify-center text-center bg-black text-white">
      {/* Content */}
      <div className="max-w-3xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Donate Blood, Save Lives
        </h1>
        <p className="text-lg mb-8">
          Your small help can give someone a second chance to live.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold">
              Join as a Donor
            </button>
          </Link>

          <Link to="/search">
            <button className="px-6 py-3 bg-white text-red-600 hover:bg-gray-200 rounded-lg font-semibold">
              Search Donors
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
