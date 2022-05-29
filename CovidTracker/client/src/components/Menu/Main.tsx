import { useState } from "react";
import { Add, Restore } from "@mui/icons-material";
import { Button } from "@mui/material";

import { SocialInteractionsModal } from "../SocialInteractions";
import { VisitedPlacesModal } from "../VisitedPlaces";
import { useTypedDispatch } from "../../hooks";
import { ConfirmModal } from "../../shared";
import { fetchSocialInteractionNotification, fetchSocialInteractionsGrouped, resetSocialInteractions } from "../../slices/socialInteraction";
import { fetchVisitedPlaceNotification, fetchVisitedPlacesGrouped, resetVisitedPlaces } from "../../slices/visitedPlace";
import { TFilterParam, TModalList, TModalReason } from "../../types";

import "./Main.scss";

type TState = {
  resetDataModalOpen: boolean;
  socialInteractionsModalOpen: boolean;
  visitedPlacesModalOpen: boolean;
};

const Menu = () => {
  const dispatch = useTypedDispatch();
  const filter: TFilterParam = {
    field: "date",
    fromDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    grouped: true,
    toDate: new Date()
  };
  const resetDataModalBody = "Do you want to proceed?";
  const [state, setState] = useState<TState>({ resetDataModalOpen: false, socialInteractionsModalOpen: false, visitedPlacesModalOpen: false });

  const handleConfirmModalClose = async (reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, resetDataModalOpen: false }));

    if (reason === "okButton") {
      await Promise.all([dispatch(resetSocialInteractions()), dispatch(resetVisitedPlaces())]);
      Promise.all([
        dispatch(fetchSocialInteractionNotification()),
        dispatch(fetchVisitedPlaceNotification()),
        dispatch(fetchSocialInteractionsGrouped(filter)),
        dispatch(fetchVisitedPlacesGrouped(filter))
      ]);
    }
  };

  const handleModalClose = async (modal: TModalList, reason: TModalReason) => {
    if (reason === "backdropClick") return;

    setState(prevState => ({ ...prevState, [`${modal}ModalOpen`]: false }));

    if (reason === "saveButton") {
      const fetchNotification = modal === "socialInteractions" ? fetchSocialInteractionNotification : fetchVisitedPlaceNotification;
      const fetchGrouped = modal === "socialInteractions" ? fetchSocialInteractionsGrouped : fetchVisitedPlacesGrouped;

      await Promise.all([dispatch(fetchNotification()), dispatch(fetchGrouped(filter))]);
    }
  };

  const openModal = (modal: TModalList) => {
    setState(prevState => ({ ...prevState, [`${modal}ModalOpen`]: true }));
  };

  return (
    <div className="menu mb-4">
      <Button variant="contained" startIcon={<Add />} onClick={() => openModal("socialInteractions")}>
        <span>Add Social Interaction</span>
      </Button>
      {state.socialInteractionsModalOpen && <SocialInteractionsModal onClose={(e, reason) => handleModalClose("socialInteractions", reason)} />}
      <Button variant="contained" startIcon={<Add />} onClick={() => openModal("visitedPlaces")}>
        <span>Add Place Exposure</span>
      </Button>
      {state.visitedPlacesModalOpen && <VisitedPlacesModal onClose={(e, reason) => handleModalClose("visitedPlaces", reason)} />}
      <Button variant="contained" color="error" startIcon={<Restore />} onClick={() => openModal("resetData")}>
        <span>Reset Data</span>
      </Button>
      {state.resetDataModalOpen && <ConfirmModal title="Reset Data" modalBody={resetDataModalBody} onClose={(e, reason) => handleConfirmModalClose(reason)} />}
    </div>
  );
};

export default Menu;
