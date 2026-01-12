import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  {
    image:"https://i.ibb.co.com/JWHJB2FW/pexels-lazymonkey-1164531.jpg",
    title: "One Drop Can Save A Life",
    subtitle: "Your generous donation today gives someone a tomorrow",
  },
  {
    image: "https://i.ibb.co.com/s4htbxP/pexels-rsapmech-13009643.jpg",
    title: "Be The Real Hero",
    subtitle: "Donate blood — make miracles possible",
  },
  {
    image: "https://i.ibb.co.com/99DTRWYH/pexels-karola-g-6629369.jpg",
    title: "Every Donor Matters",
    subtitle: "Together, we save lives",
  },
];

const Hero = () => {
  return (
    <section className="relative w-full h-[65vh] min-h-[480px] max-h-[720px] overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000, // 5 seconds per slide
          disableOnInteraction: false, // User swipe করলেও পরে আবার auto চালু থাকবে
        }}
        loop={true} // Infinite smooth loop
        speed={800} // Transition smooth
        spaceBetween={0}
        slidesPerView={1}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
                loading={index === 0 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

              <div className="absolute inset-0 flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 }}
                  className="text-center max-w-3xl"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-xl"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 font-medium drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link
                      to="/register"
                      className="px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg hover:shadow-red-700/40 transition-all duration-300"
                    >
                      Become a Donor
                    </Link>

                    <Link
                      to="/search"
                      className="px-7 py-3 bg-white/15 backdrop-blur-md border border-white/40 hover:bg-white/25 text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300"
                    >
                      Find Donors
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
      >
        <span className="text-white/70 text-sm mb-1">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-center justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
