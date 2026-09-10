import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  MapPin,
  Sparkles,
  TrainFront,
  Plane,
  WalletCards,
} from "lucide-react";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.avif";
import hero3 from "../assets/hero3.jpeg";

const images = [hero1, hero2, hero3];

const preferences = [
  { name: "Best Overall", icon: Sparkles },
  { name: "Fastest", icon: Clock3 },
  { name: "Cheapest", icon: WalletCards },
  { name: "Most Convenient", icon: MapPin },
];

const thinkingSteps = [
  "Understanding your request…",
  "Checking train availability…",
  "Checking flight options…",
  "Finding first & last-mile connectivity…",
  "Comparing 4 possible routes…",
  "Optimizing transfers…",
  "Building your door-to-door plan…",
];

const recommendations = [
  {
    name: "Best Overall",
    duration: "15h 05m",
    fare: "₹1,580",
    transfers: 2,
    departure: "5:10 PM",
    arrival: "8:15 AM",
    reason: "Best balance of time, fare & comfort",
    route: ["cab", "train", "metro"],
  },
  {
    name: "Fastest",
    duration: "12h 45m",
    fare: "₹2,180",
    transfers: 2,
    departure: "6:00 PM",
    arrival: "6:45 AM",
    reason: "Reach Delhi 2h 20m earlier",
    route: ["cab", "flight", "metro"],
  },
  {
    name: "Cheapest",
    duration: "17h 10m",
    fare: "₹890",
    transfers: 3,
    departure: "4:30 PM",
    arrival: "9:40 AM",
    reason: "Save ₹690 on your journey",
    route: ["cab", "train", "train", "metro"],
  },
  {
    name: "Most Convenient",
    duration: "16h 05m",
    fare: "₹1,720",
    transfers: 1,
    departure: "5:30 PM",
    arrival: "9:35 AM",
    reason: "Only one major transfer",
    route: ["cab", "train"],
  },
];

const modeConfig = {
  cab: { color: "#F59E0B", icon: CarFront },
  train: { color: "#3678A6", icon: TrainFront },
  flight: { color: "#8B5CF6", icon: Plane },
  metro: { color: "#22C55E", icon: MapPin },
};

const Hero = () => {
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [preference, setPreference] = useState("Best Overall");
  const [showOptions, setShowOptions] = useState(false);
  const [view, setView] = useState<"search" | "thinking" | "results">("search");
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveImage((current) => (current + 1) % images.length),
      5500,
    );

    return () => clearInterval(timer);
  }, []);

  const parsed = useMemo(() => {
    const text = query.toLowerCase();

    const destination =
      text
        .match(
          /\b(?:to|reach|reaching)\s+([a-zA-Z\s]+?)(?=\s+(?:tomorrow|today|at|around|by)\b|[,.]|$)/i,
        )?.[1]
        ?.trim() || "";

    const date = text.includes("tomorrow")
      ? "Tomorrow"
      : text.includes("today")
        ? "Today"
        : "";

    const time =
      text.match(
        /\b(?:around|at|by)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i,
      )?.[1] || "";

    return { destination, date, time };
  }, [query]);

  const chips = [
    parsed.destination && { label: parsed.destination, icon: MapPin },
    parsed.date && { label: parsed.date, icon: CalendarDays },
    parsed.time && { label: parsed.time, icon: Clock3 },
  ].filter(Boolean) as { label: string; icon: typeof MapPin }[];

  useEffect(() => {
    if (view !== "thinking") return;

    const timer = setInterval(() => {
      setStep((current) => {
        if (current >= thinkingSteps.length - 1) {
          clearInterval(timer);
          setTimeout(() => setView("results"), 350);
          return current;
        }

        return current + 1;
      });
    }, 650);

    return () => clearInterval(timer);
  }, [view]);

  const startPlanning = () => {
    if (!query.trim()) return;

    setStep(0);
    setView("thinking");
  };

  const selected =
    recommendations.find((item) => item.name === preference) ||
    recommendations[0];

  const openJourney = () => {
    navigate("/plan", {
      state: {
        query,
        from,
        destination: parsed.destination,
        date: parsed.date,
        time: parsed.time,
        preference,
      },
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#081d30] text-white">
      {/* Background images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={images[activeImage]}
            src={images[activeImage]}
            alt=""
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: "easeInOut" },
              scale: { duration: 6, ease: "linear" },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Image overlay */}
      <div className="absolute inset-0 bg-[#061a2b]/65" />

      <div className="absolute inset-0 bg-linear-to-b from-[#061a2b]/80 via-[#0a2135]/45 to-[#061827]/95" />

      {/* Animated route */}
      <motion.svg
        viewBox="0 0 1200 650"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
      >
        <motion.path
          d="M-50 540 C150 200 300 600 500 330 C680 90 870 430 1250 100"
          stroke="white"
          strokeWidth="1.2"
          strokeDasharray="7 11"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4 }}
        />
      </motion.svg>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center p-6 pt-32 md:p-10 md:pt-36">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="max-w-4xl font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">
            Where do you want to go?
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 sm:text-base md:text-lg">
            Tell us your destination and we'll plan the complete journey across
            trains, flights, buses, metros and cabs.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Search */}
          {view === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-10"
            >
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-[#fffdf7]/95 text-[#16294a] shadow-[0_30px_100px_rgba(0,0,0,.3)] backdrop-blur-xl">
                <div className="grid lg:grid-cols-[1.35fr_.65fr]">
                  {/* User command */}
                  <div className="p-5 md:p-7">
                    <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">
                      <Sparkles className="h-3.5 w-3.5 text-[#3678a6]" />
                      Tell YATRA what you need
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="I need to reach Delhi tomorrow around 6 PM"
                        className="h-24 w-full resize-none bg-transparent text-lg leading-7 outline-none placeholder:text-slate-300 md:text-xl"
                      />
                    </div>

                    {/* Secondary inputs */}
                    <AnimatePresence>
                      {query && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="mt-4 text-xs font-semibold text-[#3678a6]"
                          >
                            {showOptions
                              ? "− Hide journey preferences"
                              : "+ Add journey preferences"}
                          </button>

                          <AnimatePresence>
                            {showOptions && (
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="mt-3 grid gap-3 sm:grid-cols-2"
                              >
                                <label className="rounded-xl border border-slate-200 p-3">
                                  <span className="text-[9px] uppercase tracking-wider text-slate-400">
                                    Starting point
                                  </span>

                                  <input
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    placeholder="Current location"
                                    className="mt-1 w-full text-sm outline-none"
                                  />
                                </label>

                                <label className="rounded-xl border border-slate-200 p-3">
                                  <span className="text-[9px] uppercase tracking-wider text-slate-400">
                                    Preference
                                  </span>

                                  <select
                                    value={preference}
                                    onChange={(e) =>
                                      setPreference(e.target.value)
                                    }
                                    className="mt-1 w-full bg-transparent text-sm outline-none  cursor-pointer"
                                  >
                                    {preferences.map((item) => (
                                      <option key={item.name}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* AI parser */}
                  <div className="border-t border-slate-200 bg-[#f3f7f6] p-5 md:p-7 lg:border-l lg:border-t-0">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400">
                        YATRA understands
                      </span>

                      {query && (
                        <span className="flex items-center gap-1.5 text-[10px] text-[#4d8b72]">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4d8b72]" />
                          Parsing
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {chips.length ? (
                        chips.map(({ label, icon: Icon }) => (
                          <motion.div
                            key={label}
                            initial={{
                              opacity: 0,
                              x: 18,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              scale: 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                            className="flex items-center gap-3 rounded-xl border border-white bg-white p-3 shadow-sm"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e8f1ef] text-[#3678a6]">
                              <Icon className="h-4 w-4" />
                            </span>

                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-slate-400">
                                Detected
                              </p>

                              <p className="text-sm font-semibold">{label}</p>
                            </div>

                            <Check className="ml-auto h-4 w-4 text-[#4d8b72]" />
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 text-center text-xs leading-5 text-slate-400">
                          Start typing and YATRA will
                          <br />
                          extract your journey details.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between md:p-5">
                  <p className="text-[10px] text-slate-400">
                    Destination · Date · Time are detected as you type
                  </p>

                  <motion.button
                    onClick={startPlanning}
                    disabled={!query.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#16294a] p-3 px-6 text-sm font-semibold text-white disabled:opacity-40 cursor-pointer"
                  >
                    Plan my journey
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading/Thinking */}
          {view === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-10 rounded-3xl border border-white/20 bg-[#fffdf7]/95 p-6 text-[#16294a] shadow-[0_30px_100px_rgba(0,0,0,.3)] backdrop-blur-xl md:p-10"
            >
              <div className="flex flex-col gap-7 md:flex-row md:items-center">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e8f1ef]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#3678a6]"
                  />

                  <Sparkles className="h-7 w-7 text-[#3678a6]" />
                </div>

                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#3678a6]">
                    YATRA is thinking
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={thinkingSteps[step]}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      className="mt-2 text-xl font-semibold md:text-2xl"
                    >
                      {thinkingSteps[step]}
                    </motion.h2>
                  </AnimatePresence>

                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      animate={{
                        width: `${((step + 1) / thinkingSteps.length) * 100}%`,
                      }}
                      className="h-full rounded-full bg-[#3678a6]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recommendations */}
          {view === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10"
            >
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/45">
                  YATRA found 4 ways to get there
                </p>

                <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                  Choose what matters most.
                </h2>
              </div>

              {/* Preference selector */}
              <div className="mb-5 flex flex-wrap gap-2">
                {preferences.map((item) => {
                  const Icon = item.icon;
                  const active = preference === item.name;

                  return (
                    <motion.button
                      key={item.name}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPreference(item.name)}
                      className={`flex items-center gap-2 rounded-full p-2.5 px-4 text-xs font-semibold transition cursor-pointer ${
                        active
                          ? "bg-white text-[#16294a]"
                          : "border border-white/15 bg-white/10 text-white/65"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.name}
                    </motion.button>
                  );
                })}
              </div>

              {/* Cards */}
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {recommendations.map((item) => {
                  const active = preference === item.name;

                  return (
                    <motion.button
                      key={item.name}
                      layout
                      onClick={() => setPreference(item.name)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-2xl border p-5 text-left transition cursor-pointer ${
                        active
                          ? "border-white bg-white text-[#16294a] shadow-[0_20px_60px_rgba(0,0,0,.25)]"
                          : "border-white/15 bg-white/10 text-white backdrop-blur-md"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="winner"
                          className="absolute right-4 top-4 rounded-full bg-[#e8f1ef] p-1.5 text-[#4d8b72]"
                        >
                          <Check className="h-3 w-3" />
                        </motion.span>
                      )}

                      <p
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          active ? "text-[#3678a6]" : "text-white/50"
                        }`}
                      >
                        {item.name}
                      </p>

                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-semibold">
                            {item.duration}
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              active ? "text-slate-400" : "text-white/45"
                            }`}
                          >
                            {item.departure} → {item.arrival}
                          </p>
                        </div>

                        <p className="font-semibold">{item.fare}</p>
                      </div>

                      {/* Mini route */}
                      <div className="mt-5 flex items-center">
                        {item.route.map((mode, index) => {
                          const config =
                            modeConfig[mode as keyof typeof modeConfig];

                          const Icon = config.icon;

                          return (
                            <div
                              key={`${mode}-${index}`}
                              className="flex items-center"
                            >
                              <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg"
                                style={{
                                  backgroundColor: `${config.color}18`,
                                  color: config.color,
                                }}
                              >
                                <Icon className="h-4 w-4" />
                              </span>

                              {index < item.route.length - 1 && (
                                <span
                                  className={`w-5 border-t border-dashed ${
                                    active
                                      ? "border-slate-200"
                                      : "border-white/20"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div
                        className={`mt-4 flex justify-between text-xs ${
                          active ? "text-slate-400" : "text-white/45"
                        }`}
                      >
                        <span>
                          {item.transfers}{" "}
                          {item.transfers === 1 ? "transfer" : "transfers"}
                        </span>

                        <span>{item.reason}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Selected result */}
              <motion.div
                layout
                className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-5 text-[#16294a] shadow-xl md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[.18em] text-slate-400">
                    Selected journey
                  </p>

                  <h3 className="mt-1 font-semibold">
                    {selected.departure} · Gandhinagar → Delhi
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {selected.duration} · {selected.transfers} transfers ·{" "}
                    {selected.fare}
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={openJourney}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#16294a] p-3 px-5 text-sm font-semibold text-white cursor-pointer"
                >
                  View complete journey
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image indicators */}
        <div className="flex justify-center gap-2 py-6">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveImage(index)}
              animate={{
                width: activeImage === index ? 30 : 7,
                opacity: activeImage === index ? 1 : 0.4,
              }}
              className="h-1.5 rounded-full bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
