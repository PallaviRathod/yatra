import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Clock3,
  MapPin,
  Search,
  TrainFront,
} from "lucide-react";

const routes = [
  {
    title: "Best Overall",
    time: "14h 20m",
    price: "₹1,320",
    transfers: "2 transfers",
    score: "Best balance",
  },
  {
    title: "Fastest",
    time: "12h 45m",
    price: "₹2,180",
    transfers: "2 transfers",
    score: "1h 35m faster",
  },
  {
    title: "Cheapest",
    time: "17h 10m",
    price: "₹890",
    transfers: "3 transfers",
    score: "Save ₹430",
  },
];

const journey = [
  ["5:10 PM", "Gandhinagar", "Leave home", CarFront],
  ["5:55 PM", "Ahmedabad Railway Station", "Cab · 45 min", CarFront],
  ["6:40 PM", "Train 12958", "Ahmedabad → Delhi", TrainFront],
  ["7:50 AM", "Delhi Railway Station", "Arrive Delhi", TrainFront],
  ["8:15 AM", "Connaught Place", "Final destination", MapPin],
];

const PlanJourney = () => {
  const [from, setFrom] = useState("Gandhinagar");
  const [to, setTo] = useState("Delhi");
  const [selected, setSelected] = useState(0);

  return (
    <main className="min-h-screen bg-[#f6f3eb] text-[#172d43] mt-10">
      <section className="border-b border-[#172d43]/10 bg-[#102942] text-white p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="mx-auto max-w-7xl p-6 md:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
            Plan Journey
          </p>

          <h1 className="font-serif text-4xl md:text-5xl">
            Build your complete journey.
          </h1>

          <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_1fr_auto_auto_auto]">
            <Field icon={MapPin} value={from} setValue={setFrom} label="From" />
            <Field icon={MapPin} value={to} setValue={setTo} label="To" />

            <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-3 text-left">
              <CalendarDays size={18} />
              <span>
                <small className="block text-[10px] text-white/50">DATE</small>
                Tomorrow
              </span>
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 p-3 text-left">
              <Clock3 size={18} />
              <span>
                <small className="block text-[10px] text-white/50">ARRIVE BY</small>
                6:00 PM
              </span>
            </button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#f97316] p-3 font-semibold text-white cursor-pointer"
            >
              <Search size={18} />
              Plan
            </motion.button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl p-6 md:p-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">3 journeys found</p>
            <h2 className="mt-1 text-2xl font-semibold">Choose your route</h2>
          </div>

          <button className="hidden text-sm text-slate-500 md:block">
            Recommended ▾
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="space-y-3">
            {routes.map((route, i) => (
              <motion.button
                key={route.title}
                onClick={() => setSelected(i)}
                whileHover={{ y: -2 }}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected === i
                    ? "border-[#3678a6] bg-white shadow-lg"
                    : "border-slate-200 bg-white/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#3678a6]">
                      {route.title}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">
                      {route.time}
                    </h3>
                  </div>

                  {i === 0 && (
                    <span className="rounded-full bg-[#e7f1f0] px-3 py-1 text-[11px] text-[#3678a6]">
                      Recommended
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-4 text-xs text-slate-500">
                  <span>{route.price}</span>
                  <span>{route.transfers}</span>
                  <span>{route.score}</span>
                </div>

                <div className="mt-4 flex items-center gap-1 text-sm font-medium cursor-pointer">
                  View journey <ArrowRight size={15} />
                </div>
              </motion.button>
            ))}
          </div>

          <Journey route={routes[selected]} />
        </div>
      </section>
    </main>
  );
};

const Field = ({ icon: Icon, value, setValue, label }: any) => (
  <label className="rounded-xl border border-white/15 bg-white/10 p-3">
    <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/50">
      <Icon size={14} />
      {label}
    </span>
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="mt-1 w-full bg-transparent text-sm outline-none"
    />
  </label>
);

const Journey = ({ route }: any) => (
  <motion.div
    key={route.title}
    initial={{ opacity: 0, x: 15 }}
    animate={{ opacity: 1, x: 0 }}
    className="rounded-2xl border border-slate-200 bg-white p-6"
  >
    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
      <div>
        <p className="text-xs text-slate-400">SELECTED JOURNEY</p>
        <h2 className="mt-1 text-xl font-semibold">Gandhinagar → Delhi</h2>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold">{route.price}</p>
        <p className="text-xs text-slate-400">{route.time}</p>
      </div>
    </div>

    <div className="py-6">
      {journey.map(([time, title, subtitle, Icon], i) => (
        <div key={title} className="relative flex gap-4 pb-7 last:pb-0">
          {i < journey.length - 1 && (
            <span className="absolute left-2.75 top-7 h-full w-px bg-slate-200" />
          )}

          <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e7f1f0] text-[#3678a6]">
            <Icon size={13} />
          </span>

          <div className="flex-1">
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
              </div>
              <time className="text-xs text-slate-400">{time}</time>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex gap-3 border-t border-slate-100 pt-5">
      <button className="flex-1 rounded-xl border border-slate-200 p-3 text-sm cursor-pointer">
        Save Trip
      </button>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="flex-1 rounded-xl bg-[#102942] p-3 text-sm font-semibold text-white cursor-pointer"
      >
        Continue <ArrowRight className="ml-1 inline" size={15} />
      </motion.button>
    </div>
  </motion.div>
);

export default PlanJourney;