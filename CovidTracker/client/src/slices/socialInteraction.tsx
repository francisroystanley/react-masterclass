import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

import API from "../api";
import { TFetchSocialInteractionResponse, TSocialInteraction, TSocialInteractionState } from "../types";

const initialState: TSocialInteractionState = {
  socialInteractions: null,
  notification: null,
  totalCount: 0
};

const fetchSocialInteractions = createAsyncThunk<TFetchSocialInteractionResponse, AxiosRequestConfig["params"]>("todos/fetchSocialInteractions", async params => {
  const response = await API.get("/social-interactions", { params });

  return response.data;
});

const socialInteractionSlice = createSlice({
  name: "socialInteraction",
  initialState,
  reducers: {
    // change: (state, action: PayloadAction<string>) => {
    //   state.value = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchSocialInteractions.fulfilled, (state, action) => {
      state.socialInteractions = action.payload.socialInteractions;
      state.totalCount = action.payload.totalCount;
    });
  }
});

// Action creators are generated for each case reducer function
const {} = socialInteractionSlice.actions;

export { fetchSocialInteractions };

export default socialInteractionSlice.reducer;
