import store from "./store";

export type TMaybe<T> = T | null | undefined;

export type TNotification = {
  title: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

export type TModalList = "socialInteractions" | "visitedPlaces";

export type TModalReason = "backdropClick" | "escapeKeyDown" | "closeButton";

export type TVisitedPlace = {
  place: string;
  date: string;
  hours: number;
  isCrowded: boolean;
};

export type TVisitedPlaceState = {
  visitedPlace: TMaybe<TVisitedPlace[]>;
  notification: TMaybe<TNotification>;
};

export type TVisitedPlaceForm = {
  place: TMaybe<string>;
  date: TMaybe<string>;
  hours: TMaybe<number>;
  isCrowded: boolean;
};

export type TSocialInteraction = {
  name: string;
  date: string;
  hours: number;
  isSocialDistancing: boolean;
};

export type TSocialInteractionState = {
  socialInteraction: TMaybe<TSocialInteraction[]>;
  notification: TMaybe<TNotification>;
};

export type TSocialInteractionForm = {
  name: TMaybe<string>;
  date: TMaybe<string>;
  hours: TMaybe<number>;
  isSocialDistancing: boolean;
};

export type TRootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;
