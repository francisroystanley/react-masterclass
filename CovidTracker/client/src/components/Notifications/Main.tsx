import { SocialInteractionsNotification } from "../SocialInteractions";
import { VisitedPlacesNotification } from "../VisitedPlaces";

import "./Main.scss";

const Notifications = () => {
  return (
    <div className="notifications mb-5">
      <VisitedPlacesNotification />
      <SocialInteractionsNotification />
    </div>
  );
};

export default Notifications;
