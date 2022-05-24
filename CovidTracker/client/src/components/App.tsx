import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, AlertTitle, Button, Container, Link } from "@mui/material";
import { Add, Info, Report, Restore } from "@mui/icons-material";

import { TModalReason, TNotification } from "../types";

import "./App.scss";
import VisitedPlacesModal from "./VisitedPlaces/VisitedPlacesModal";
import SocialInteractionsModal from "./SocialInteractions/SocialInteractionsModal";

type modalListType = "socialInteractions" | "visitedPlaces";

type stateType = {
  notifications: TNotification[];
  socialInteractionsModalOpen: boolean;
  visitedPlacesModalOpen: boolean;
};

const App = () => {
  const [state, setState] = useState<stateType>({ notifications: [], socialInteractionsModalOpen: false, visitedPlacesModalOpen: false });

  const getIcon = (severity: string) => {
    switch (severity) {
      case "success":
        return <Info />;
      case "error":
        return <Report />;
      default:
        return null;
    }
  };

  const handleModalClose = (modal: modalListType, reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, [`${modal}ModalOpen`]: false }));
  };

  const hideNotification = (index: number) => {
    const notifications = state.notifications.filter((notif, i) => i !== index);
    setState(prevState => ({ ...prevState, notifications }));
  };

  const openModal = (modal: modalListType) => {
    setState(prevState => ({ ...prevState, [`${modal}ModalOpen`]: true }));
  };

  useEffect(() => {
    const notifications: TNotification[] = [
      {
        title: "You have been exposed!",
        message: "You have been exposed to a crowded place for the last 14 days.\nTry to avoid crowded places to minimized your exposure risk.",
        severity: "error"
      },
      {
        title: "You did not practice social distancing!",
        message: "You did not practice social distancing for the last 14 days.\nStay at home and maintain 1-2 meters away from other people.",
        severity: "error"
      },
      {
        title: "Thank you!",
        message: "Thank you for helping to stop spread the virus by staying home.",
        severity: "success"
      },
      {
        title: "Keep it up!",
        message: "You are maintaining proper social distancing. Keep it up!",
        severity: "success"
      }
    ];
    setState(prevState => ({ ...prevState, notifications }));
  }, []);

  return (
    <Container className="app">
      <h1 className="mb-5">COVID Exposure Tracker Tool</h1>
      <div className="menu mb-4">
        <Button variant="contained" startIcon={<Add />} onClick={() => openModal("socialInteractions")}>
          <span>Add Social Interaction</span>
        </Button>
        <SocialInteractionsModal open={state.socialInteractionsModalOpen} onClose={(e, reason) => handleModalClose("socialInteractions", reason)} />
        <Button variant="contained" startIcon={<Add />} onClick={() => openModal("visitedPlaces")}>
          <span>Add Place Exposure</span>
        </Button>
        <VisitedPlacesModal open={state.visitedPlacesModalOpen} onClose={(e, reason) => handleModalClose("visitedPlaces", reason)} />
        <Button variant="contained" color="error" startIcon={<Restore />}>
          <span>Reset Data</span>
        </Button>
      </div>
      <div className="notifications mb-5">
        {state.notifications.map((notif, i) => (
          <Alert className="mb-2" key={i} icon={getIcon(notif.severity)} variant="filled" severity={notif.severity} onClose={() => hideNotification(i)}>
            <AlertTitle>{notif.title}</AlertTitle>
            <div className="message">{notif.message}</div>
          </Alert>
        ))}
      </div>
      <span className="me-3">Recent Visited Places</span>
      <Link component={RouterLink} to="/visited-places">
        View All
      </Link>
    </Container>
  );
};

export default App;
