import { ReactNode } from "react";
import { Clear } from "@mui/icons-material";
import { IconButton, Modal } from "@mui/material";

import { TModalReason } from "../types";

type TProps = {
  id: string;
  modalBody: ReactNode;
  modalFooter: ReactNode;
  onClose: (event: {}, reason: TModalReason) => void;
  showFooter?: boolean;
  showHeader?: boolean;
  title: string;
};

const CustomModal = (props: TProps) => {
  const { id, modalBody, modalFooter, onClose, showFooter = true, showHeader = true, title } = props;

  return (
    <Modal className="modal" id={id} disableRestoreFocus open onClose={onClose}>
      <div className="modal-dialog">
        <div className="modal-content">
          {showHeader && (
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <IconButton color="inherit" onClick={() => onClose({}, "closeButton")}>
                <Clear />
              </IconButton>
            </div>
          )}
          <div className="modal-body">{modalBody}</div>
          {showFooter && <div className="modal-footer">{modalFooter}</div>}
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
