import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, CalendarDays, Clock3, MapPin, Route, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import data from "../data/journeys.json";

const journey = data.journeys[0];

const modeColors: Record<string, string> = {
  cab: "#F59E0B",
  train: "#3678A6",
  flight: "#8B5CF6",
  metro: "#22C55E",
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const SavedTrips = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(true);

  const recommendation =
    journey.recommendations.find((item) => item.selected) ||
    journey.recommendations[0];

  const segments = journey.segments;

  return (
    <main className="min-h-screen bg-[#f6f3eb] pt-24 text-[#172d43]">
      {/* Header */}
      <section className="border-b border-white/10 bg-[#102942] px-5 py-12 text-white sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Your library
            </p>

            <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
              Saved journeys.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
              Keep your planned routes ready whenever you need them.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:px-10">
        {/* Journey card */}
        <AnimatePresence>
          {saved && (
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-3xl border border-[#172d43]/10 bg-white shadow-sm"
            >
              {/* Card top */}
              <div className="border-b border-[#172d43]/10 p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#102942] text-white"
                    >
                      <MapPin className="h-5 w-5" />
                    </motion.div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f97316]">
                        {recommendation.label}
                      </p>

                      <h2 className="mt-1 font-serif text-2xl sm:text-3xl">
                        {journey.summary.origin} →{" "}
                        {journey.summary.destination}
                      </h2>

                      <p className="mt-2 text-sm text-[#172d43]/50">
                        {recommendation.reason}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSaved(false)}
                    className="flex h-10 w-10 items-center justify-center self-start rounded-full bg-[#172d43]/5"
                    aria-label="Remove saved journey"
                  >
                    <Bookmark
                      className="h-5 w-5 text-[#f97316]"
                      fill="currentColor"
                    />
                  </button>
                </div>

                {/* Route */}
                <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-1">
                  {segments.map((segment, index) => (
                    <div
                      key={segment.id}
                      className="flex shrink-0 items-center gap-2"
                    >
                      <span className="flex items-center gap-2 rounded-full bg-[#172d43]/5 px-3 py-2 text-xs">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            background:
                              modeColors[segment.mode] || "#64748B",
                          }}
                        />
                        {segment.to.name}
                      </span>

                      {index < segments.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 text-[#172d43]/25" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
                <div className="grid gap-3 sm:grid-cols-4">
                  <Detail
                    icon={Clock3}
                    label="Duration"
                    value={recommendation.duration}
                  />

                  <Detail
                    icon={Route}
                    label="Transfers"
                    value={`${recommendation.transfers}`}
                  />

                  <Detail
                    icon={CalendarDays}
                    label="Travel date"
                    value={journey.search.date}
                  />

                  <Detail
                    icon={MapPin}
                    label="Fare"
                    value={money(journey.total.totalFare)}
                  />
                </div>

                <div className="flex flex-col justify-end gap-3 sm:flex-row lg:flex-col">
                  <button
                    onClick={() =>
                      navigate("/plan", {
                        state: {
                          from: journey.search.from,
                          destination: journey.search.to,
                          date: journey.search.date,
                          time: journey.search.arriveBy,
                          preference: recommendation.label,
                        },
                      })
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#102942] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#173653]"
                  >
                    Open Journey
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <Link
                    to="/compare"
                    className="flex items-center justify-center rounded-xl border border-[#172d43]/10 px-5 py-3 text-sm font-semibold"
                  >
                    Compare
                  </Link>
                </div>
              </div>

              {/* Mode strip */}
              <div className="flex flex-wrap gap-2 border-t border-[#172d43]/10 bg-[#faf8f2] px-6 py-4 sm:px-8">
                {segments.map((segment) => (
                  <span
                    key={segment.id}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{
                      color: modeColors[segment.mode],
                      background: `${modeColors[segment.mode]}15`,
                    }}
                  >
                    {segment.modeLabel}
                  </span>
                ))}

                <span className="ml-auto rounded-full bg-[#22C55E]/10 px-3 py-1.5 text-xs font-semibold text-[#22C55E]">
                  Reliability {recommendation.reliability}%
                </span>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!saved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-dashed border-[#172d43]/15 bg-white p-10 text-center sm:p-16"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#172d43]/5">
              <Bookmark className="h-6 w-6 text-[#f97316]" />
            </div>

            <h2 className="mt-5 font-serif text-2xl">
              No saved journeys
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-[#172d43]/50">
              Plan a journey and save it here so you can return to it anytime.
            </p>

            <Link
              to="/plan"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#102942] px-5 py-3 text-sm font-bold text-white"
            >
              Plan a journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}

        {/* Bottom CTA */}
        {saved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-start justify-between gap-4 rounded-3xl bg-[#102942] p-6 text-white sm:flex-row sm:items-center sm:p-8"
          >
            <div>
              <p className="font-serif text-2xl">
                Planning somewhere new?
              </p>
              <p className="mt-1 text-sm text-white/50">
                Let YATRA find every connection for you.
              </p>
            </div>

            <Link
              to="/plan"
              className="flex items-center gap-2 rounded-xl bg-[#f97316] px-5 py-3 text-sm font-bold"
            >
              Plan another journey
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </section>
    </main>
  );
};

const Detail = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
}) => (
  <div className="rounded-2xl bg-[#172d43]/5 p-4">
    <Icon className="h-4 w-4 text-[#172d43]/35" />
    <p className="mt-3 text-xs text-[#172d43]/40">{label}</p>
    <p className="mt-1 text-sm font-bold">{value}</p>
  </div>
);

export default SavedTrips;