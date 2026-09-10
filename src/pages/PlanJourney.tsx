import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  Clock3,
  MapPin,
  Plane,
  Route,
  Search,
  TrainFront,
  Wallet,
} from "lucide-react";

import data from "../data/journeys.json";

type Mode = "cab" | "train" | "flight" | "metro";

const modeConfig: Record<
  string,
  { icon: typeof MapPin; color: string; label: string }
> = {
  home: { icon: MapPin, color: "#64748B", label: "Home" },
  cab: { icon: CarFront, color: "#F59E0B", label: "Cab" },
  train: { icon: TrainFront, color: "#3678A6", label: "Train" },
  flight: { icon: Plane, color: "#8B5CF6", label: "Flight" },
  metro: { icon: Route, color: "#22C55E", label: "Metro" },
};

const thinkingSteps = [
  "Understanding your request…",
  "Checking train availability…",
  "Checking flight options…",
  "Comparing 4 routes…",
  "Optimizing transfers…",
  "Building your complete journey…",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const PlanJourney = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const journey = data.journeys[0];
  const recommendations = journey.recommendations;

  const searchState = location.state as
    | {
        from?: string;
        destination?: string;
        date?: string;
        time?: string;
        preference?: string;
        query?: string;
      }
    | undefined;

  const [from, setFrom] = useState(
    searchState?.from || journey.search.from
  );
  const [to, setTo] = useState(
    searchState?.destination || journey.search.to
  );
  const [selected, setSelected] = useState(
    recommendations.findIndex((item) => item.selected) >= 0
      ? recommendations.findIndex((item) => item.selected)
      : 0
  );

  const [thinking, setThinking] = useState(true);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [activeSegment, setActiveSegment] = useState(0);

  const selectedRecommendation = recommendations[selected];

  const segments = useMemo(
    () => journey.segments,
    [journey.segments]
  );

  useEffect(() => {
    if (!thinking) return;

    const interval = window.setInterval(() => {
      setThinkingIndex((current) => {
        if (current >= thinkingSteps.length - 1) {
          window.clearInterval(interval);

          window.setTimeout(() => {
            setThinking(false);
          }, 500);

          return current;
        }

        return current + 1;
      });
    }, 650);

    return () => window.clearInterval(interval);
  }, [thinking]);

  useEffect(() => {
    setActiveSegment(0);
  }, [selected]);

  const selectRecommendation = (index: number) => {
    setSelected(index);
  };

  return (
    <main className="min-h-screen bg-[#f6f3eb] text-[#172d43] pt-24">
      <section className="border-b border-[#172d43]/10 bg-[#102942] px-5 py-10 text-white sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-7">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/45">
                Plan Journey
              </p>

              <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
                Build your complete journey.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
                One search, every connection, one complete door-to-door plan.
              </p>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto_auto]">
              <SearchField
                icon={MapPin}
                label="From"
                value={from}
                onChange={setFrom}
              />

              <SearchField
                icon={MapPin}
                label="To"
                value={to}
                onChange={setTo}
              />

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <CalendarDays className="h-4 w-4 text-white/50" />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-white/35">
                    Date
                  </p>
                  <p className="text-sm">{journey.search.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Clock3 className="h-4 w-4 text-white/50" />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-wider text-white/35">
                    Arrive by
                  </p>
                  <p className="text-sm">
                    {searchState?.time || "6:00 PM"}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  navigate("/plan", {
                    state: {
                      from,
                      destination: to,
                      date: journey.search.date,
                      time: searchState?.time || "6:00 PM",
                      preference: selectedRecommendation.label,
                    },
                  })
                }
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#f97316] px-6 py-3 text-sm font-bold text-white"
              >
                <Search className="h-4 w-4" />
                Plan
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {thinking ? (
          <motion.section
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-[55vh] items-center justify-center px-5 py-16"
          >
            <div className="w-full max-w-2xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#102942]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute inset-1 rounded-full border-2 border-transparent border-t-[#f97316]"
                  />
                  <Route className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
                    YATRA AI
                  </p>
                  <h2 className="font-serif text-2xl">
                    Planning your journey…
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                {thinkingSteps.map((step, index) => {
                  const completed = index < thinkingIndex;
                  const active = index === thinkingIndex;

                  return (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{
                        opacity: index <= thinkingIndex ? 1 : 0.25,
                        x: 0,
                      }}
                      className="flex items-center gap-4 rounded-2xl border border-[#172d43]/10 bg-white p-4"
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background:
                            completed || active
                              ? "#102942"
                              : "#172d4310",
                        }}
                      >
                        {completed ? (
                          <Check className="h-4 w-4 text-[#22C55E]" />
                        ) : (
                          <motion.div
                            animate={active ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="h-2 w-2 rounded-full bg-[#f97316]"
                          />
                        )}
                      </div>

                      <span
                        className={`text-sm ${
                          active
                            ? "font-semibold text-[#172d43]"
                            : "text-[#172d43]/55"
                        }`}
                      >
                        {step}
                      </span>

                      {active && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="ml-auto text-xs text-[#f97316]"
                        >
                          working
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-10"
          >
            <section className="mb-10">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
                    Recommended journeys
                  </p>

                  <h2 className="mt-1 font-serif text-3xl sm:text-4xl">
                    {from} → {to}
                  </h2>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#172d43]/50">
                  <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                  Availability checked
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {recommendations.map((item, index) => {
                  const active = selected === index;

                  return (
                    <motion.button
                      key={item.id}
                      layout
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectRecommendation(index)}
                      className={`relative overflow-hidden rounded-3xl border p-5 text-left transition ${
                        active
                          ? "border-[#172d43] bg-[#102942] text-white shadow-xl"
                          : "border-[#172d43]/10 bg-white"
                      }`}
                    >
                      {active && (
                        <motion.div
                          layoutId="selected-route"
                          className="absolute inset-0 rounded-3xl border-2 border-[#f97316]"
                        />
                      )}

                      <div className="relative">
                        <div className="mb-5 flex items-start justify-between gap-3">
                          <div>
                            <p
                              className={`text-xs font-bold uppercase tracking-wider ${
                                active
                                  ? "text-[#f97316]"
                                  : "text-[#172d43]/45"
                              }`}
                            >
                              {item.label}
                            </p>

                            <p
                              className={`mt-2 text-sm ${
                                active
                                  ? "text-white/65"
                                  : "text-[#172d43]/55"
                              }`}
                            >
                              {item.reason}
                            </p>
                          </div>

                          {active && (
                            <span className="rounded-full bg-[#f97316] px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wider">
                              Selected
                            </span>
                          )}
                        </div>

                        <div className="mb-5">
                          <p className="text-3xl font-bold">
                            {item.duration}
                          </p>

                          <p
                            className={`mt-1 text-sm ${
                              active
                                ? "text-white/50"
                                : "text-[#172d43]/45"
                            }`}
                          >
                            {item.departure} → {item.arrival}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Stat
                            icon={Wallet}
                            label="Fare"
                            value={formatCurrency(item.fare)}
                            dark={active}
                          />

                          <Stat
                            icon={Route}
                            label="Transfers"
                            value={`${item.transfers}`}
                            dark={active}
                          />
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.route.map((location, routeIndex) => (
                            <span
                              key={`${location}-${routeIndex}`}
                              className={`rounded-full px-2 py-1 text-[0.65rem] ${
                                active
                                  ? "bg-white/10 text-white/60"
                                  : "bg-[#172d43]/5 text-[#172d43]/50"
                              }`}
                            >
                              {location}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-[#172d43]/10 bg-white p-6 sm:p-8">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
                      Journey timeline
                    </p>

                    <h2 className="mt-1 font-serif text-3xl">
                      {selectedRecommendation.label}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-[#102942] px-4 py-3 text-right text-white">
                    <p className="text-xs text-white/45">Total</p>
                    <p className="font-bold">
                      {formatCurrency(journey.total.totalFare)}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute bottom-8 left-[1.15rem] top-8 w-0.5 bg-[#172d43]/10" />

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.min(
                        100,
                        ((activeSegment + 1) / segments.length) * 100
                      )}%`,
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute left-[1.15rem] top-8 w-0.5 origin-top"
                    style={{
                      background:
                        modeConfig[
                          segments[activeSegment]?.mode || "cab"
                        ]?.color,
                    }}
                  />

                  <div className="relative space-y-7">
                    {segments.map((segment, index) => {
                      const config =
                        modeConfig[segment.mode] || modeConfig.cab;

                      const Icon = config.icon;
                      const active = activeSegment === index;

                      return (
                        <motion.button
                          key={segment.id}
                          onClick={() => setActiveSegment(index)}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.1,
                            duration: 0.4,
                          }}
                          className="grid w-full grid-cols-[2.5rem_1fr] gap-4 text-left"
                        >
                          <motion.div
                            animate={{
                              scale: active ? 1.1 : 1,
                            }}
                            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white"
                            style={{
                              background: config.color,
                            }}
                          >
                            <Icon className="h-4 w-4 text-white" />
                          </motion.div>

                          <div
                            className={`rounded-2xl border p-4 transition ${
                              active
                                ? "border-[#172d43]/20 bg-[#f8f6f0]"
                                : "border-transparent"
                            }`}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-[#172d43]/40">
                                  {segment.modeLabel}
                                </p>

                                <h3 className="mt-1 font-semibold">
                                  {segment.from.name}
                                </h3>

                                <div className="my-2 flex items-center gap-2">
                                  <ArrowRight className="h-4 w-4 text-[#172d43]/30" />
                                  <span className="text-sm text-[#172d43]/60">
                                    {segment.to.name}
                                  </span>
                                </div>

                                <p className="text-xs text-[#172d43]/45">
                                  {segment.description ||
                                    `${segment.duration} journey`}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-sm font-bold">
                                  {new Date(
                                    segment.departure
                                  ).toLocaleTimeString("en-IN", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </p>

                                <p className="mt-1 text-xs text-[#172d43]/45">
                                  {segment.duration}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              <span
                                className="rounded-full px-3 py-1 text-xs font-semibold"
                                style={{
                                  background: `${config.color}15`,
                                  color: config.color,
                                }}
                              >
                                {segment.provider || segment.modeLabel}
                              </span>

                              {segment.fare !== undefined && (
                                <span className="rounded-full bg-[#172d43]/5 px-3 py-1 text-xs text-[#172d43]/55">
                                  {formatCurrency(segment.fare)}
                                </span>
                              )}

                              {segment.serviceNumber && (
                                <span className="rounded-full bg-[#172d43]/5 px-3 py-1 text-xs text-[#172d43]/55">
                                  {segment.serviceNumber}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}

                    <div className="grid grid-cols-[2.5rem_1fr] gap-4">
                      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#172d43]">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>

                      <div className="rounded-2xl bg-[#102942] p-4 text-white">
                        <p className="text-xs uppercase tracking-wider text-white/40">
                          Destination
                        </p>
                        <p className="mt-1 font-semibold">
                          {journey.segments.at(-1)?.to.name}
                        </p>
                        <p className="mt-1 text-xs text-white/45">
                          Journey complete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <RoutePreview
                  segments={segments}
                  activeSegment={activeSegment}
                />

                <div className="rounded-3xl border border-[#172d43]/10 bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
                    Journey summary
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <SummaryItem
                      label="Duration"
                      value={selectedRecommendation.duration}
                    />

                    <SummaryItem
                      label="Transfers"
                      value={`${selectedRecommendation.transfers}`}
                    />

                    <SummaryItem
                      label="Transport"
                      value={formatCurrency(
                        journey.total.transportFare
                      )}
                    />

                    <SummaryItem
                      label="Booking fee"
                      value={formatCurrency(
                        journey.total.bookingFees
                      )}
                    />
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#102942] p-5 text-white">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-white/45">
                          Total journey fare
                        </p>
                        <p className="mt-1 text-2xl font-bold">
                          {formatCurrency(journey.total.totalFare)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          navigate("/compare", {
                            state: {
                              journeyId: journey.id,
                              selected: selectedRecommendation.id,
                            },
                          })
                        }
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#102942]"
                      >
                        Compare
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

const SearchField = ({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
    <Icon className="h-4 w-4 shrink-0 text-white/50" />

    <span className="min-w-0 flex-1">
      <span className="block text-[0.65rem] uppercase tracking-wider text-white/35">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
      />
    </span>
  </label>
);

const Stat = ({
  icon: Icon,
  label,
  value,
  dark,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  dark: boolean;
}) => (
  <div
    className={`rounded-xl p-3 ${
      dark ? "bg-white/10" : "bg-[#172d43]/5"
    }`}
  >
    <Icon
      className={`h-3.5 w-3.5 ${
        dark ? "text-white/45" : "text-[#172d43]/40"
      }`}
    />

    <p
      className={`mt-2 text-[0.65rem] uppercase tracking-wider ${
        dark ? "text-white/35" : "text-[#172d43]/35"
      }`}
    >
      {label}
    </p>

    <p className="mt-0.5 text-sm font-bold">{value}</p>
  </div>
);

const SummaryItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-[#172d43]/5 p-4">
    <p className="text-xs text-[#172d43]/40">{label}</p>
    <p className="mt-1 font-bold">{value}</p>
  </div>
);

const RoutePreview = ({
  segments,
  activeSegment,
}: {
  segments: typeof data.journeys[0]["segments"];
  activeSegment: number;
}) => (
  <div className="overflow-hidden rounded-3xl bg-[#102942] p-6 text-white">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">
          Route preview
        </p>

        <p className="mt-1 text-lg font-semibold">
          Door-to-door connection
        </p>
      </div>

      <Route className="h-5 w-5 text-white/40" />
    </div>

    <div className="relative mt-8 px-3">
      <div className="absolute left-5 right-5 top-4 h-1 rounded-full bg-white/10" />

      <motion.div
        className="absolute left-5 top-4 h-1 rounded-full"
        animate={{
          width: `${Math.max(
            5,
            ((activeSegment + 1) / segments.length) * 85
          )}%`,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            modeConfig[segments[activeSegment]?.mode || "cab"]?.color,
        }}
      />

      <div className="relative flex justify-between">
        {segments.map((segment, index) => {
          const config =
            modeConfig[segment.mode] || modeConfig.cab;

          const Icon = config.icon;

          return (
            <motion.div
              key={segment.id}
              animate={{
                scale: index === activeSegment ? 1.15 : 1,
              }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#102942]"
                style={{
                  background: config.color,
                }}
              >
                <Icon className="h-3.5 w-3.5 text-white" />
              </div>

              <span className="max-w-20 text-center text-[0.6rem] text-white/40">
                {segment.to.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

export default PlanJourney;