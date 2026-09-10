import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CarFront,
  Check,
  IndianRupee,
  MapPin,
  TrainFront,
} from "lucide-react";

const journeys = [
  {
    name: "Best Overall",
    duration: "14h 20m",
    fare: 1320,
    transfers: 2,
    departure: "5:10 PM",
    arrival: "8:15 AM",
    description: "Best balance of time, price and comfort",
  },
  {
    name: "Fastest",
    duration: "12h 45m",
    fare: 2180,
    transfers: 2,
    departure: "6:00 PM",
    arrival: "6:45 AM",
    description: "Reach your destination sooner",
  },
  {
    name: "Cheapest",
    duration: "17h 10m",
    fare: 890,
    transfers: 3,
    departure: "4:30 PM",
    arrival: "9:40 AM",
    description: "Lowest fare for the journey",
  },
  {
    name: "Most Convenient",
    duration: "15h 05m",
    fare: 1580,
    transfers: 1,
    departure: "5:30 PM",
    arrival: "8:35 AM",
    description: "Fewer changes and easier transfers",
  },
];

const steps = [
  ["Gandhinagar", "Leave home", MapPin],
  ["Ahmedabad Railway Station", "Cab · 45 min", CarFront],
  ["Train 12958", "Ahmedabad → Delhi", TrainFront],
  ["Delhi Railway Station", "Arrive Delhi", TrainFront],
  ["Connaught Place", "Final destination", MapPin],
];

const Compare = () => {
  const [active, setActive] = useState(0);
  const journey = journeys[active];

  return (
    <main className="min-h-screen bg-[#f6f3eb] text-[#16294a] p-6 md:p-12 lg:p-16 mt-10">
      <header className="border-b border-[#16294a]/10 bg-[#fffdf7] rounded-2xl">
        <div className="mx-auto max-w-7xl p-6 md:p-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#3678a6]">
                Compare
              </p>

              <h1 className="mt-2 font-serif text-4xl md:text-5xl">
                Find the journey that fits you.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Compare every option by time, fare, transfers and convenience.
              </p>
            </div>

            <div className="rounded-xl border border-[#16294a]/10 bg-white p-4">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Journey
              </p>
              <p className="mt-1 font-semibold">Gandhinagar → Delhi</p>
              <p className="mt-1 text-xs text-slate-400">
                Tomorrow · Arrive around 6 PM
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl p-6 md:p-10">
        {/* Journey options */}
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {journeys.map((item, index) => {
            const selected = active === index;

            return (
              <motion.button
                key={item.name}
                onClick={() => setActive(index)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-[#3678a6] bg-white shadow-md"
                    : "border-[#16294a]/10 bg-white/60 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3678a6]">
                    {item.name}
                  </span>

                  {selected && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f1ef]">
                      <Check size={14} />
                    </span>
                  )}
                </div>

                <p className="mt-5 text-2xl font-semibold">
                  {item.duration}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="flex items-center gap-1 font-medium">
                    <IndianRupee size={14} />
                    {item.fare}
                  </span>

                  <span className="text-xs text-slate-400">
                    {item.transfers} transfers
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  {item.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Selected journey */}
        <motion.section
          key={active}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 overflow-hidden rounded-2xl border border-[#16294a]/10 bg-white"
        >
          <div className="flex flex-col gap-5 border-b border-slate-100 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[.18em] text-slate-400">
                Selected journey
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                {journey.name}
              </h2>
            </div>

            <div className="flex items-center gap-6">
              <Info label="Departure" value={journey.departure} />
              <Info label="Arrival" value={journey.arrival} />
              <Info label="Fare" value={`₹${journey.fare}`} />
            </div>
          </div>

          {/* Timeline */}
          <div className="p-6 md:p-8">
            <div className="relative">
              <div className="absolute bottom-4 left-3 top-4 w-px bg-slate-200" />

              {steps.map(([title, subtitle, Icon], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative flex gap-5 pb-8 last:pb-0"
                >
                  <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f1ef] text-[#3678a6]">
                    <Icon size={13} />
                  </span>

                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:justify-end">
            <button className="rounded-xl border border-slate-200 p-3 text-sm cursor-pointer">
              Save Trip
            </button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              className="rounded-xl bg-[#16294a] p-3 text-sm font-semibold text-white cursor-pointer"
            >
              Choose this journey
              <ArrowRight className="ml-2 inline" size={15} />
            </motion.button>
          </div>
        </motion.section>

        {/* Comparison table */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Compare details</h2>
            <span className="text-xs text-slate-400">4 options</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#16294a]/10 bg-white">
            <table className="w-full min-w-[650px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="p-5">Journey</th>
                  <th className="p-5">Duration</th>
                  <th className="p-5">Fare</th>
                  <th className="p-5">Transfers</th>
                  <th className="p-5">Departure</th>
                </tr>
              </thead>

              <tbody>
                {journeys.map((item, index) => (
                  <tr
                    key={item.name}
                    onClick={() => setActive(index)}
                    className={`cursor-pointer border-b border-slate-100 last:border-0 ${
                      active === index ? "bg-[#f4f8f7]" : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="p-5 font-medium">{item.name}</td>
                    <td className="p-5">{item.duration}</td>
                    <td className="p-5">₹{item.fare}</td>
                    <td className="p-5">{item.transfers}</td>
                    <td className="p-5">{item.departure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[10px] uppercase tracking-wider text-slate-400">
      {label}
    </p>
    <p className="mt-1 text-sm font-semibold">{value}</p>
  </div>
);

export default Compare;