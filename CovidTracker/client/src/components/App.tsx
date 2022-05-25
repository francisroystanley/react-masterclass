import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, AlertTitle, Button, Container, Link } from "@mui/material";
import { Add, Info, Report, Restore } from "@mui/icons-material";

import VisitedPlacesModal from "./VisitedPlaces/VisitedPlacesModal";
import SocialInteractionsModal from "./SocialInteractions/SocialInteractionsModal";
import { useTypedDispatch, useTypedSelector } from "../hooks";
import { TModalList, TModalReason, TNotification } from "../types";
import { fetchVisitedPlaces } from "../slices/visitedPlace";
import { fetchSocialInteractions } from "../slices/socialInteraction";

import "./App.scss";

type TState = {
  notifications?: TNotification[];
  socialInteractionsModalOpen: boolean;
  visitedPlacesModalOpen: boolean;
};

const App = () => {
  const dispatch = useTypedDispatch();
  const socialInteractionState = useTypedSelector(state => state.socialInteraction);
  const visitedPlaceState = useTypedSelector(state => state.visitedPlace);
  // const notifications = [socialInteractionState.notification, visitedPlaceState.notification];
  const [state, setState] = useState<TState>({ notifications: [], socialInteractionsModalOpen: false, visitedPlacesModalOpen: false });

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

  const handleModalClose = (modal: TModalList, reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, [`${modal}ModalOpen`]: false }));
  };

  const hideNotification = (index: number) => {
    const notifications = state.notifications?.filter((notif, i) => i !== index);
    setState(prevState => ({ ...prevState, notifications }));
  };

  const openModal = (modal: TModalList) => {
    setState(prevState => ({ ...prevState, [`${modal}ModalOpen`]: true }));
  };

  useEffect(() => {
    dispatch(fetchVisitedPlaces());
    dispatch(fetchSocialInteractions());
    // const notifications: TNotification[] = [
    //   {
    //     title: "You have been exposed!",
    //     message: "You have been exposed to a crowded place for the last 14 days.\nTry to avoid crowded places to minimized your exposure risk.",
    //     severity: "error"
    //   },
    //   {
    //     title: "You did not practice social distancing!",
    //     message: "You did not practice social distancing for the last 14 days.\nStay at home and maintain 1-2 meters away from other people.",
    //     severity: "error"
    //   },
    //   {
    //     title: "Thank you!",
    //     message: "Thank you for helping to stop spread the virus by staying home.",
    //     severity: "success"
    //   },
    //   {
    //     title: "Keep it up!",
    //     message: "You are maintaining proper social distancing. Keep it up!",
    //     severity: "success"
    //   }
    // ];
    // setState(prevState => ({ ...prevState, notifications }));
  }, [dispatch]);

  useEffect(() => {
    console.log(visitedPlaceState, socialInteractionState);
  }, [socialInteractionState, visitedPlaceState]);

  return (
    <Container className="app">
      <h1 className="mb-5">COVID Exposure Tracker Tool</h1>
      <div className="menu mb-4">
        <Button variant="contained" startIcon={<Add />} onClick={() => openModal("socialInteractions")}>
          <span>Add Social Interaction</span>
        </Button>
        {state.socialInteractionsModalOpen && <SocialInteractionsModal open onClose={(e, reason) => handleModalClose("socialInteractions", reason)} />}
        <Button variant="contained" startIcon={<Add />} onClick={() => openModal("visitedPlaces")}>
          <span>Add Place Exposure</span>
        </Button>
        {state.visitedPlacesModalOpen && <VisitedPlacesModal open onClose={(e, reason) => handleModalClose("visitedPlaces", reason)} />}
        <Button variant="contained" color="error" startIcon={<Restore />}>
          <span>Reset Data</span>
        </Button>
      </div>
      <div className="notifications mb-5">
        {state.notifications?.map((notif, i) => (
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
