import { motion } from "framer-motion";
import { CarFront, MapPin, TrainFront } from "lucide-react";

const JourneyMap = () => (
  <section className="bg-[#f2f0e9] px-5 py-16 sm:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="grid overflow-hidden rounded-2xl bg-[#102942] lg:grid-cols-[.8fr_1.2fr]">

        <div className="p-7 text-white md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#79b4ca]">
            Living journey map
          </p>

          <h2 className="mt-3 font-serif text-3xl">
            See every connection.
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/55">
            Follow your complete journey from home to the
            final destination.
          </p>

          <div className="mt-8 space-y-3 text-xs text-white/70">
            <div className="flex items-center gap-3">
              <CarFront className="h-4 w-4 text-[#e49a32]" />
              First-mile connection
            </div>

            <div className="flex items-center gap-3">
              <TrainFront className="h-4 w-4 text-[#6fa8c7]" />
              Main journey
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#d87979]" />
              Final destination
            </div>
          </div>
        </div>

        <div className="relative min-h-[350px] overflow-hidden bg-[#0b2135]">
          <svg
            viewBox="0 0 700 400"
            className="absolute inset-0 h-full w-full"
          >
            <motion.path
              d="M70 320 C170 280 170 180 300 220 C430 260 430 100 630 75"
              fill="none"
              stroke="#75abc2"
              strokeWidth="4"
              strokeDasharray="10 9"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            />

            <circle cx="70" cy="320" r="9" fill="#4d8b72" />
            <circle cx="300" cy="220" r="9" fill="#e49a32" />
            <circle cx="430" cy="170" r="9" fill="#3678a6" />
            <circle cx="630" cy="75" r="10" fill="#d87979" />
          </svg>

          <motion.div
            animate={{
              x: [0, 90, 190, 290, 380, 500],
              y: [0, -30, -100, -140, -170, -245],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-[8%] top-[76%]"
          >
            <div className="rounded-full bg-white p-2 shadow-xl">
              <TrainFront className="h-4 w-4 text-[#3678a6]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default JourneyMap;