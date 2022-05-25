import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import { TVisitedPlace, TVisitedPlaceState } from "../types";

const initialState: TVisitedPlaceState = {
  visitedPlace: null,
  notification: null
};

const fetchVisitedPlaces = createAsyncThunk("todos/fetchVisitedPlaces", async () => {
  const response = await API.get<TVisitedPlace[]>("/visited-places");

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
    builder.addCase(fetchVisitedPlaces.fulfilled, (state, action) => {
      state.visitedPlace = action.payload;
    });
  }
});

const {} = visitedPlaceSlice.actions;

export { fetchVisitedPlaces };

export default visitedPlaceSlice.reducer;
