import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

import API from "../api";
import { TFetchVisitedPlaceResponse, TVisitedPlace, TVisitedPlaceState } from "../types";

const initialState: TVisitedPlaceState = {
  visitedPlaces: null,
  notification: null,
  totalCount: 0
};

const addVisitedPlace = createAsyncThunk<TVisitedPlace, TVisitedPlace>("todos/addVisitedPlace", async data => {
  const response = await API.post("/visited-places", data);

  return response.data;
});

const fetchVisitedPlaces = createAsyncThunk<TFetchVisitedPlaceResponse, AxiosRequestConfig["params"]>("todos/fetchVisitedPlaces", async params => {
  const response = await API.get("/visited-places", { params });

  return response.data;
});

const visitedPlaceSlice = createSlice({
  name: "visitedPlace",
  initialState,
  reducers: {
    // change: (state, action: PayloadAction<string>) => {
    //   state.value = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(addVisitedPlace.fulfilled, (state, action) => {
      state.visitedPlaces?.push(action.payload);
    });

    builder.addCase(fetchVisitedPlaces.fulfilled, (state, action) => {
      state.visitedPlaces = action.payload.visitedPlaces;
      state.totalCount = action.payload.totalCount;
    });
  }
});

const {} = visitedPlaceSlice.actions;

export { addVisitedPlace, fetchVisitedPlaces };

export default visitedPlaceSlice.reducer;
