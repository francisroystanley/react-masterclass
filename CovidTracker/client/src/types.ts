import store from "./store";

export type TMaybe<T> = T | null | undefined;

export type TNotification = {
  title: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

export type TModalList = "socialInteractions" | "visitedPlaces";

export type TModalReason = "backdropClick" | "escapeKeyDown" | "closeButton" | "cancelButton" | "saveButton" | "okButton";

export type TVisitedPlace = {
  place: string;
  date: string;
  hours: number;
  isCrowded: boolean;
};

export type TVisitedPlaceState = {
  visitedPlaces: TMaybe<TVisitedPlace[]>;
  notification: TMaybe<TNotification>;
  totalCount: TMaybe<number>;
};

export type TVisitedPlaceForm = {
  place: TMaybe<string>;
  date: TMaybe<string>;
  hours: TMaybe<number>;
  isCrowded: boolean;
};

export type TFetchVisitedPlaceResponse = {
  visitedPlaces: TMaybe<TVisitedPlace[]>;
  totalCount: TMaybe<number>;
};

export type TSocialInteraction = {
  name: string;
  date: string;
  hours: number;
  isSocialDistancing: boolean;
};

export type TSocialInteractionState = {
  socialInteractions: TMaybe<TSocialInteraction[]>;
  notification: TMaybe<TNotification>;
  totalCount: TMaybe<number>;
};

export type TSocialInteractionForm = {
  name: TMaybe<string>;
  date: TMaybe<string>;
  hours: TMaybe<number>;
  isSocialDistancing: boolean;
};

export type TFetchSocialInteractionResponse = {
  socialInteractions: TMaybe<TSocialInteraction[]>;
  totalCount: TMaybe<number>;
};

export type TRootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;

export type TFilterParam = {
  page: TMaybe<number>;
  pageSize: TMaybe<number>;
};
