import { useEffect } from "react";

import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { Notification } from "../../shared";
import { fetchSocialInteractionNotification } from "../../slices/socialInteraction";

const SocialInteractionsNotification = () => {
  const dispatch = useTypedDispatch();
  const { notification } = useTypedSelector(state => state.socialInteraction);

  useEffect(() => {
    (async () => {
      dispatch(fetchSocialInteractionNotification());
    })();
  }, [dispatch]);

  return <Notification notification={notification} />;
};

export default SocialInteractionsNotification;
