import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import { TSocialInteraction, TSocialInteractionState } from "../types";

const initialState: TSocialInteractionState = {
  socialInteraction: null,
  notification: null
};

const fetchSocialInteractions = createAsyncThunk("todos/fetchSocialInteractions", async () => {
  const response = await API.get<TSocialInteraction[]>("/social-interactions");

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
      state.socialInteraction = action.payload;
    });
  }
});

// Action creators are generated for each case reducer function
const {} = socialInteractionSlice.actions;

export { fetchSocialInteractions };

export default socialInteractionSlice.reducer;
