import { Bookmark, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const trips = [
  {
    title: "Ahmedabad → Delhi",
    meta: "Best Overall · 14h 20m · ₹1,320",
    saved: "Saved yesterday",
  },
  {
    title: "Mumbai → Pune",
    meta: "Fastest · 3h 45m · ₹890",
    saved: "Saved 4 days ago",
  },
];

const SavedTrips = () => {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#f4f7fb] p-6 sm:p-8 md:p-12 lg:p-16 mt-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Your library
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0f172a]">Saved trips</h1>
        <p className="mt-2 text-sm text-slate-500">
          Keep itineraries handy - just like a booking history on a travel app.
        </p>

        <div className="mt-8 space-y-4">
          {trips.map((trip) => (
            <article
              key={trip.title}
              className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#f97316]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="font-semibold text-slate-900">{trip.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{trip.meta}</p>
                  <p className="mt-1 text-xs text-slate-400">{trip.saved}</p>
                </div>
              </div>
              <Bookmark className="h-5 w-5 fill-[#0f172a] text-[#0f172a]" />
            </article>
          ))}
        </div>

        <Link
          to="/plan"
          className="mt-8 inline-flex rounded-xl bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white"
        >
          Plan another journey
        </Link>
      </div>
    </main>
  );
};

export default SavedTrips;
