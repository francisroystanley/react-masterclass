import store from "./store";

export type TMaybe<T> = T | null | undefined;

export type TAutoCompleteOption = {
  label: string;
  value: string;
};

export type TNotification = {
  title: string;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};

export type TModalList = "socialInteractions" | "resetData" | "visitedPlaces";

export type TModalReason = "backdropClick" | "escapeKeyDown" | "closeButton" | "cancelButton" | "saveButton" | "okButton";

export type TResponseGrouped = {
  _id: string;
  count: number;
};

export type TVisitedPlace = {
  place: string;
  date: string;
  hours: number;
  isCrowded: boolean;
  [key: string]: string | number | boolean;
};

export type TVisitedPlaceWithId = TVisitedPlace & { _id: string };

export type TVisitedPlaceState = {
  notification?: TMaybe<TNotification>;
  places?: TAutoCompleteOption[];
  totalCount?: TMaybe<number>;
  visitedPlaces?: TMaybe<TVisitedPlaceWithId[]>;
  visitedPlacesGrouped?: TMaybe<TResponseGrouped[]>;
};

export type TVisitedPlaceForm = {
  place: {
    value: TMaybe<string>;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  date: {
    value: TMaybe<string>;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  hours: {
    value: TMaybe<number>;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  isCrowded: {
    value: boolean;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  [key: string]: {
    value: any;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
};

export type TDeleteVisitedPlaceResponse = {
  msg: string;
};

export type TFetchVisitedPlaceResponse = {
  visitedPlaces: TMaybe<TVisitedPlaceWithId[]>;
  totalCount: TMaybe<number>;
};

export type TSocialInteraction = {
  name: string;
  date: string;
  hours: number;
  isSocialDistancing: boolean;
  [key: string]: string | number | boolean;
};

export type TSocialInteractionWithId = TSocialInteraction & { _id: string };

export type TSocialInteractionState = {
  names?: TAutoCompleteOption[];
  notification?: TMaybe<TNotification>;
  socialInteractions?: TMaybe<TSocialInteractionWithId[]>;
  socialInteractionsGrouped?: TMaybe<TResponseGrouped[]>;
  totalCount?: TMaybe<number>;
};

export type TSocialInteractionForm = {
  name: {
    value: TMaybe<string>;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  date: {
    value: TMaybe<string>;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  hours: {
    value: TMaybe<number>;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  isSocialDistancing: {
    value: boolean;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
  [key: string]: {
    value: any;
    error: boolean;
    errMsg?: TMaybe<string>;
  };
};

export type TDeleteSocialInteractionResponse = {
  msg: string;
};

export type TFetchSocialInteractionResponse = {
  socialInteractions: TMaybe<TSocialInteractionWithId[]>;
  totalCount: TMaybe<number>;
};

export type TRootState = ReturnType<typeof store.getState>;

export type TDispatch = typeof store.dispatch;

export type TFilterParam = {
  field?: TMaybe<string>;
  fromDate?: TMaybe<Date>;
  grouped?: TMaybe<boolean>;
  page?: TMaybe<number>;
  pageSize?: TMaybe<number>;
  sort?: TMaybe<string>;
  toDate?: TMaybe<Date>;
};

export type TBarGraphProps = {
  label?: string;
  x: string[];
  y: number[];
  yAxisLabel?: string;
};
