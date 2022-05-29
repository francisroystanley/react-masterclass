import { useEffect, useState } from "react";
import { Info, Report } from "@mui/icons-material";
import { Alert, AlertTitle } from "@mui/material";

import { TNotification } from "../types";

type TProps = {
  notification?: TNotification | null;
};

type TState = {
  notification?: TNotification | null;
  showNotif: boolean;
};

const Notification = (props: TProps) => {
  const { notification } = props;
  const [state, setState] = useState<TState>({ showNotif: true });

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

  const hideNotification = () => {
    setState(prevState => ({ ...prevState, showNotif: false }));
  };

  useEffect(() => {
    if (notification) setState(prevState => ({ ...prevState, notification }));
  }, [notification]);

  return (
    <>
      {state.notification && state.showNotif && (
        <Alert className="mb-2" icon={getIcon(state.notification.severity)} variant="filled" severity={state.notification.severity} onClose={hideNotification}>
          <AlertTitle>{state.notification.title}</AlertTitle>
          <div className="message">{state.notification.message}</div>
        </Alert>
      )}
    </>
  );
};

export default Notification;
