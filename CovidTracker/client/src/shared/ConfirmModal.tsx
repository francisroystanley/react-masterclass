import { ReactNode } from "react";
import { Check, Clear } from "@mui/icons-material";
import { Button } from "@mui/material";

import Modal from "./Modal";
import { TModalReason } from "../types";

type TProps = {
  modalBody: ReactNode;
  onClose: (event: {}, reason: TModalReason) => void;
  title: string;
};

const ConfirmModal = (props: TProps) => {
  const { onClose } = props;

  const modalFooter = (
    <>
      <Button startIcon={<Clear />} variant="contained" color="error" onClick={() => onClose({}, "cancelButton")}>
        Cancel
      </Button>
      <Button startIcon={<Check />} variant="contained" color="primary" onClick={() => onClose({}, "okButton")}>
        Yes
      </Button>
    </>
  );

  return <Modal id="confirm-modal" {...props} modalFooter={modalFooter} />;
};

export default ConfirmModal;
