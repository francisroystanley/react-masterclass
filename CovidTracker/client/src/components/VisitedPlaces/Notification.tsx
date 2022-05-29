import { useEffect } from "react";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { Notification } from "../../shared";
import { fetchVisitedPlaceNotification } from "../../slices/visitedPlace";

const VisitedPlacesNotification = () => {
  const dispatch = useTypedDispatch();
  const { notification } = useTypedSelector(state => state.visitedPlace);

  useEffect(() => {
    (async () => {
      dispatch(fetchVisitedPlaceNotification());
    })();
  }, [dispatch]);

  return <Notification notification={notification} />;
};

export default VisitedPlacesNotification;
