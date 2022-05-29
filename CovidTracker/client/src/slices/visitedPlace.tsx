import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

import API from "../api";
import {
  TAutoCompleteOption,
  TDeleteVisitedPlaceResponse,
  TFetchVisitedPlaceResponse,
  TNotification,
  TVisitedPlace,
  TResponseGrouped,
  TVisitedPlaceState,
  TVisitedPlaceWithId
} from "../types";

const initialState: TVisitedPlaceState = {
  totalCount: 0
};

const addVisitedPlace = createAsyncThunk<TVisitedPlaceWithId, TVisitedPlace>("visitedPlaces/add", async data => {
  const response = await API.post("/visited-places", data);

  return response.data;
});

const deleteVisitedPlace = createAsyncThunk<TDeleteVisitedPlaceResponse, string>("visitedPlaces/delete", async id => {
  const response = await API.delete(`/visited-places/${id}`);

  return response.data;
});

const fetchVisitedPlaces = createAsyncThunk<TFetchVisitedPlaceResponse, AxiosRequestConfig["params"]>("visitedPlaces/fetchAll", async params => {
  const response = await API.get("/visited-places", { params });

  return response.data;
});

const fetchVisitedPlacesGrouped = createAsyncThunk<TResponseGrouped[], AxiosRequestConfig["params"]>("visitedPlaces/fetchAllGrouped", async params => {
  const response = await API.get("/visited-places", { params });

  return response.data;
});

const fetchVisitedPlaceNotification = createAsyncThunk<TNotification>("visitedPlaces/fetchNotification", async () => {
  const response = await API.get("/visited-places/notification");

  return response.data;
});

const fetchVisitedPlacePlaces = createAsyncThunk<TAutoCompleteOption[]>("visitedPlaces/fetchPlaces", async () => {
  const response = await API.get("/visited-places/places");

  return response.data;
});

const resetVisitedPlaces = createAsyncThunk("visitedPlaces/reset", async () => {
  await API.post("/visited-places/reset-data");
});

const updateVisitedPlace = createAsyncThunk<TVisitedPlaceWithId, TVisitedPlaceWithId>("visitedPlaces/update", async data => {
  const response = await API.put(`/visited-places/${data._id}`, data);

  return response.data;
});

const visitedPlaceSlice = createSlice({
  name: "visitedPlace",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVisitedPlaces.fulfilled, (state, action) => {
      state.visitedPlaces = action.payload.visitedPlaces;
      state.totalCount = action.payload.totalCount;
    });

    builder.addCase(fetchVisitedPlacesGrouped.fulfilled, (state, action) => {
      state.visitedPlacesGrouped = action.payload;
    });

    builder.addCase(fetchVisitedPlaceNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    });

    builder.addCase(fetchVisitedPlacePlaces.fulfilled, (state, action) => {
      state.places = action.payload;
    });
  }
});

export {
  addVisitedPlace,
  deleteVisitedPlace,
  fetchVisitedPlaces,
  fetchVisitedPlacesGrouped,
  fetchVisitedPlaceNotification,
  fetchVisitedPlacePlaces,
  resetVisitedPlaces,
  updateVisitedPlace
};

export default visitedPlaceSlice.reducer;
