import { Link as RouterLink } from "react-router-dom";
import { Container, Link } from "@mui/material";

import { Menu } from "./Menu";
import { Notifications } from "./Notifications";
import { SocialInteractionsGraph } from "./SocialInteractions";
import { VisitedPlacesGraph } from "./VisitedPlaces";

const App = () => {
  return (
    <Container className="app">
      <h1 className="mb-5">COVID Exposure Tracker Tool</h1>
      <Menu />
      <Notifications />
      <div className="mb-3">
        <span className="me-3">Recent Visited Places</span>
        <Link component={RouterLink} to="/visited-places">
          View All
        </Link>
      </div>
      <VisitedPlacesGraph />
      <div className="mb-3">
        <span className="me-3">Recent Social Interactions</span>
        <Link component={RouterLink} to="/social-interactions">
          View All
        </Link>
      </div>
      <SocialInteractionsGraph />
    </Container>
  );
};

export default App;
