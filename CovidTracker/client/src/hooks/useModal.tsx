import { ReactNode } from "react";
import { Button, IconButton, Modal } from "@mui/material";
import { Clear, Save } from "@mui/icons-material";

import { TModalReason } from "../types";

type TProps = {
  cancelButtonLabel?: string;
  children: ReactNode;
  onClose: (event: {}, reason: TModalReason) => void;
  open: boolean;
  onSubmit: () => void;
  saveButtonLabel?: string;
  title: string;
};

const useModal = (props: TProps) => {
  const { cancelButtonLabel = "Cancel", children: body, onClose, onSubmit, open, saveButtonLabel = "Save", title } = props;

  const ModalComponent = (
    <Modal className="modal" disableRestoreFocus open={open} onClose={onClose}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <IconButton color="inherit" onClick={() => onClose({}, "closeButton")}>
              <Clear />
            </IconButton>
          </div>
          <div className="modal-body">{body}</div>
          <div className="modal-footer">
            <Button startIcon={<Clear />} variant="contained" color="warning" onClick={() => onClose({}, "cancelButton")}>
              {cancelButtonLabel}
            </Button>
            <Button startIcon={<Save />} variant="contained" color="success" onClick={onSubmit}>
              {saveButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );

  return ModalComponent;
};

export default useModal;
