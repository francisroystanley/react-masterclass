import App from "./components/App";
import { SocialInteractions } from "./components/SocialInteractions";
import { VisitedPlaces } from "./components/VisitedPlaces";

const routes = [
  { path: "/", name: "Dashboard", Element: App },
  { path: "/visited-places", name: "Visited Places", Element: VisitedPlaces },
  {
    path: "/social-interactions",
    name: "Social Interactions",
    Element: SocialInteractions
  }
];

export default routes;
