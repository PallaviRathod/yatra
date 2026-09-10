import { useState } from "react";
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
  TrainFront,
  Wallet,
} from "lucide-react";

import data from "../data/journeys.json";

const journey = data.journeys[0];
const options = journey.recommendations;

const modes: Record<
  string,
  { icon: typeof MapPin; color: string }
> = {
  cab: { icon: CarFront, color: "#F59E0B" },
  train: { icon: TrainFront, color: "#3678A6" },
  flight: { icon: Plane, color: "#8B5CF6" },
  metro: { icon: Route, color: "#22C55E" },
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { selected?: string } | undefined;

  const initial = Math.max(
    options.findIndex((item) => item.id === state?.selected),
    0
  );

  const [active, setActive] = useState(initial);
  const selected = options[active];

  return (
    <main className="min-h-screen bg-[#f6f3eb] pt-24 text-[#172d43]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#102942] px-5 py-12 text-white sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Compare
            </p>

            <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
              Find the journey that fits you.
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
              Compare every option by time, fare, transfers and convenience.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] uppercase tracking-wider text-white/35">
              Journey
            </p>

            <p className="mt-1 font-semibold">
              {journey.summary.origin} → {journey.summary.destination}
            </p>

            <p className="mt-1 text-xs text-white/40">
              {journey.search.date} · Arrive around{" "}
              {journey.search.arriveBy}
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Options */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {options.map((item, index) => {
            const activeItem = index === active;

            return (
              <motion.button
                key={item.id}
                onClick={() => setActive(index)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-3xl border p-5 text-left ${
                  activeItem
                    ? "border-[#172d43] bg-[#102942] text-white shadow-xl"
                    : "border-[#172d43]/10 bg-white"
                }`}
              >
                {activeItem && (
                  <motion.div
                    layoutId="compare-active"
                    className="absolute inset-0 rounded-3xl border-2 border-[#f97316]"
                  />
                )}

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className={`text-xs font-bold uppercase tracking-wider ${
                        activeItem
                          ? "text-[#f97316]"
                          : "text-[#172d43]/45"
                      }`}
                    >
                      {item.label}
                    </p>

                    {activeItem && (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f97316]">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </span>
                    )}
                  </div>

                  <p className="mt-5 text-3xl font-bold">
                    {item.duration}
                  </p>

                  <div
                    className={`mt-4 flex justify-between border-t pt-4 ${
                      activeItem
                        ? "border-white/10"
                        : "border-[#172d43]/10"
                    }`}
                  >
                    <span className="flex items-center gap-1 font-semibold">
                      <Wallet className="h-3.5 w-3.5" />
                      {money(item.fare)}
                    </span>

                    <span
                      className={
                        activeItem
                          ? "text-white/45"
                          : "text-[#172d43]/40"
                      }
                    >
                      {item.transfers} transfers
                    </span>
                  </div>

                  <p
                    className={`mt-3 text-xs leading-5 ${
                      activeItem
                        ? "text-white/50"
                        : "text-[#172d43]/45"
                    }`}
                  >
                    {item.reason}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected journey */}
        <AnimatePresence mode="wait">
          <motion.section
            key={selected.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 overflow-hidden rounded-3xl border border-[#172d43]/10 bg-white"
          >
            <div className="flex flex-col justify-between gap-5 border-b border-[#172d43]/10 p-6 md:flex-row md:items-center md:p-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f97316]">
                  Selected journey
                </p>

                <h2 className="mt-1 font-serif text-3xl">
                  {selected.label}
                </h2>

                <p className="mt-1 text-sm text-[#172d43]/45">
                  {selected.reason}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Info
                  icon={Clock3}
                  label="Departure"
                  value={selected.departure}
                />

                <Info
                  icon={CalendarDays}
                  label="Arrival"
                  value={selected.arrival}
                />

                <Info
                  icon={Wallet}
                  label="Fare"
                  value={money(selected.fare)}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 sm:p-8">
              <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#172d43]/35">
                Journey route
              </p>

              <div className="relative">
                <div className="absolute bottom-5 left-4 top-5 w-0.5 bg-[#172d43]/10" />

                {journey.segments.map((segment, index) => {
                  const config = modes[segment.mode] || modes.cab;
                  const Icon = config.icon;

                  return (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="relative flex gap-5 pb-7 last:pb-0"
                    >
                      <span
                        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white"
                        style={{ background: config.color }}
                      >
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </span>

                      <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-[#172d43]/35">
                            {segment.modeLabel}
                          </p>

                          <p className="mt-1 font-semibold">
                            {segment.from.name}
                          </p>

                          <div className="my-1 flex items-center gap-2">
                            <ArrowRight className="h-3.5 w-3.5 text-[#172d43]/25" />

                            <span className="text-sm text-[#172d43]/55">
                              {segment.to.name}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge
                              value={segment.duration}
                              color={config.color}
                            />

                            {segment.serviceNumber && (
                              <Badge value={segment.serviceNumber} />
                            )}

                            {segment.provider && (
                              <Badge value={segment.provider} />
                            )}
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold">
                            {new Date(
                              segment.departure
                            ).toLocaleTimeString("en-IN", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </p>

                          <p className="mt-1 text-xs text-[#172d43]/40">
                            {money(segment.fare)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-[#172d43]/10 p-5 sm:flex-row sm:justify-end">
              <button
                onClick={() => navigate("/saved")}
                className="rounded-xl border border-[#172d43]/10 px-5 py-3 text-sm font-semibold"
              >
                Save Trip
              </button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  navigate("/plan", {
                    state: {
                      from: journey.search.from,
                      destination: journey.search.to,
                      date: journey.search.date,
                      time: journey.search.arriveBy,
                      preference: selected.label,
                    },
                  })
                }
                className="rounded-xl bg-[#102942] px-5 py-3 text-sm font-bold text-white"
              >
                Choose this journey
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </motion.button>
            </div>
          </motion.section>
        </AnimatePresence>

        {/* Comparison */}
        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f97316]">
                Side-by-side
              </p>
              <h2 className="mt-1 font-serif text-2xl">
                Compare details
              </h2>
            </div>

            <span className="text-xs text-[#172d43]/40">
              {options.length} options
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#172d43]/10 bg-white">
            <table className="w-full min-w-[700px] text-sm">
              <thead>
                <tr className="border-b border-[#172d43]/10 text-left text-[10px] uppercase tracking-wider text-[#172d43]/40">
                  {[
                    "Journey",
                    "Duration",
                    "Fare",
                    "Transfers",
                    "Departure",
                    "Arrival",
                    "Reliability",
                  ].map((heading) => (
                    <th key={heading} className="p-5">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {options.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    onClick={() => setActive(index)}
                    className={`cursor-pointer border-b border-[#172d43]/10 last:border-0 ${
                      active === index
                        ? "bg-[#102942]/5"
                        : "hover:bg-[#172d43]/[0.02]"
                    }`}
                  >
                    <td className="p-5 font-semibold">{item.label}</td>
                    <td className="p-5">{item.duration}</td>
                    <td className="p-5">{money(item.fare)}</td>
                    <td className="p-5">{item.transfers}</td>
                    <td className="p-5">{item.departure}</td>
                    <td className="p-5">{item.arrival}</td>
                    <td className="p-5">
                      <span className="font-semibold text-[#22C55E]">
                        {item.reliability}%
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
};

const Info = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) => (
  <div>
    <Icon className="h-4 w-4 text-[#f97316]" />
    <p className="mt-2 text-[10px] uppercase tracking-wider text-[#172d43]/35">
      {label}
    </p>
    <p className="mt-1 text-sm font-bold">{value}</p>
  </div>
);

const Badge = ({
  value,
  color,
}: {
  value: string;
  color?: string;
}) => (
  <span
    className="rounded-full px-3 py-1 text-[0.65rem] font-semibold"
    style={
      color
        ? {
            color,
            background: `${color}15`,
          }
        : {
            color: "#172d43aa",
            background: "#172d4308",
          }
    }
  >
    {value}
  </span>
);

export default Compare;