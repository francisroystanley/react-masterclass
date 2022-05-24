export type TMaybe<T> = T | null | undefined;

export type TNotification = {
  title: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

export type TModalReason = "backdropClick" | "escapeKeyDown" | "closeButton";

export type TVisitedPlaceForm = {
  place: TMaybe<string>;
  date: TMaybe<string>;
  hours: TMaybe<number>;
  isCrowded: boolean;
};
