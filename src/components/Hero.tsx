import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
} from "lucide-react";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.avif";
import hero3 from "../assets/hero3.jpeg";

const images = [hero1, hero2, hero3];

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="planner"
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#081d30] text-white"
    >
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="sync">
          <motion.img
            key={images[active]}
            src={images[active]}
            alt=""
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 1.4,
                ease: "easeInOut",
              },
              scale: {
                duration: 6,
                ease: "linear",
              },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 -z-10 bg-[#071b2d]/60" />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#061a2b]/80 via-[#0a2135]/45 to-[#061827]/95" />

      <motion.svg
        viewBox="0 0 1000 500"
        fill="none"
        className="pointer-events-none absolute right-0 top-0 -z-5 h-full w-full opacity-25"
      >
        <motion.path
          d="M-50 430 C150 180 260 470 450 270 C610 100 760 330 1050 70"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="7 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3.5,
            ease,
          }}
        />
      </motion.svg>

      {/* content */}
      <div className="relative z-10 flex min-h-screen w-full flex-col pt-32 sm:pt-36 md:pt-40">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="w-full p-6 md:p-14 lg:p-20 xl:p-24"
        >
          <h1 className="font-serif text-4xl md:text-7xl">
            Where do you want to go?
          </h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 0.6,
              ease,
            }}
            className="mt-6 max-w-2xl text-sm leading-6 text-white/70 sm:text-base md:text-lg"
          >
            Tell us your destination and we'll plan the complete journey across
            trains, flights, buses, metros and cabs.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease,
          }}
          className="w-full"
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.8,
              ease,
            }}
            className="w-full"
          >
            <motion.div
              whileHover={{
                y: -3,
                boxShadow: "0 30px 80px rgba(0,0,0,.25)",
              }}
              transition={{
                duration: 0.3,
              }}
              className="mx-auto w-[calc(100%-3rem)] max-w-7xl rounded-2xl border border-white/30 bg-white/90 p-4 shadow-xl backdrop-blur-xl md:p-8"
            >
              <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                {/* Input */}
                <div className="flex min-h-14 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                  <Sparkles className="h-5 w-5 shrink-0 text-[#3678a6]" />

                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="I need to reach Delhi tomorrow around 6 PM"
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#102942] outline-none placeholder:text-slate-400 sm:text-base"
                  />
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-3">
                  <Chip icon={<MapPin />} text="Delhi" />
                  <Chip icon={<CalendarDays />} text="Tomorrow" />
                  <Chip icon={<Clock3 />} text="6 PM" />
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#102942] p-4 text-sm font-semibold text-white lg:min-w-48"
                >
                  Plan Journey
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </motion.button>
              </div>

              <p className="mt-3 text-center text-[10px] text-slate-400 lg:text-left">
                Describe your journey naturally. YATRA handles the planning.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Image Indicators */}
        <div className="flex justify-center gap-2 py-6">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              animate={{
                width: active === index ? 32 : 7,
                opacity: active === index ? 1 : 0.45,
              }}
              transition={{
                duration: 0.3,
              }}
              className="h-1.5 rounded-full bg-white"
              aria-label={`Travel scene ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Chip = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.9,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    className="flex items-center gap-1.5 rounded-lg border border-[#d9e5e5] bg-[#edf3f3] p-2.5 text-[10px] font-medium text-[#426879]"
  >
    <span className="h-5 w-5 flex justify-center items-center flex-col">{icon}</span>

    {text}
  </motion.div>
);

export default Hero;
