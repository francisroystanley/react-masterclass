import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

import API from "../api";
import {
  TAutoCompleteOption,
  TDeleteSocialInteractionResponse,
  TFetchSocialInteractionResponse,
  TNotification,
  TResponseGrouped,
  TSocialInteraction,
  TSocialInteractionState,
  TSocialInteractionWithId
} from "../types";

const initialState: TSocialInteractionState = {
  totalCount: 0
};

const addSocialInteraction = createAsyncThunk<TSocialInteractionWithId, TSocialInteraction>("socialInteractions/add", async data => {
  const response = await API.post("/social-interactions", data);

  return response.data;
});

const deleteSocialInteraction = createAsyncThunk<TDeleteSocialInteractionResponse, string>("socialInteractions/delete", async id => {
  const response = await API.delete(`/social-interactions/${id}`);

  return response.data;
});

const fetchSocialInteractions = createAsyncThunk<TFetchSocialInteractionResponse, AxiosRequestConfig["params"]>("socialInteractions/fetchAll", async params => {
  const response = await API.get("/social-interactions", { params });

  return response.data;
});

const fetchSocialInteractionsGrouped = createAsyncThunk<TResponseGrouped[], AxiosRequestConfig["params"]>("socialInteractions/fetchAllGrouped", async params => {
  const response = await API.get("/social-interactions", { params });

  return response.data;
});

const fetchSocialInteractionNames = createAsyncThunk<TAutoCompleteOption[]>("socialInteractions/fetchNames", async () => {
  const response = await API.get("/social-interactions/names");

  return response.data;
});

const fetchSocialInteractionNotification = createAsyncThunk<TNotification>("socialInteractions/fetchNotification", async () => {
  const response = await API.get("/social-interactions/notification");

  return response.data;
});

const resetSocialInteractions = createAsyncThunk("socialInteractions/reset", async () => {
  await API.post("/social-interactions/reset-data");
});

const updateSocialInteraction = createAsyncThunk<TSocialInteractionWithId, TSocialInteractionWithId>("socialInteractions/update", async data => {
  const response = await API.put(`/social-interactions/${data._id}`, data);

  return response.data;
});

const socialInteractionSlice = createSlice({
  name: "socialInteraction",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchSocialInteractions.fulfilled, (state, action) => {
      state.socialInteractions = action.payload.socialInteractions;
      state.totalCount = action.payload.totalCount;
    });

    builder.addCase(fetchSocialInteractionsGrouped.fulfilled, (state, action) => {
      state.socialInteractionsGrouped = action.payload;
    });

    builder.addCase(fetchSocialInteractionNames.fulfilled, (state, action) => {
      state.names = action.payload;
    });

    builder.addCase(fetchSocialInteractionNotification.fulfilled, (state, action) => {
      state.notification = action.payload;
    });
  }
});

export {
  addSocialInteraction,
  deleteSocialInteraction,
  fetchSocialInteractions,
  fetchSocialInteractionsGrouped,
  fetchSocialInteractionNames,
  fetchSocialInteractionNotification,
  resetSocialInteractions,
  updateSocialInteraction
};

export default socialInteractionSlice.reducer;
