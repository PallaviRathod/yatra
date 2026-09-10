import type { RouteObjectWithLayout } from ".";
import Compare from "../pages/Compare";
import Index from "../pages/Index";
import PageNotFound from "../pages/PageNotFound";
import PlanJourney from "../pages/PlanJourney";
import Profile from "../pages/Profile";
import SavedTrips from "../pages/SavedTrips";

const routes: RouteObjectWithLayout[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/plan",
    element: <PlanJourney />,
  },
  {
    path: "/saved",
    element: <SavedTrips />,
  },
  {
    path: "/compare",
    element: <Compare />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export { routes };
