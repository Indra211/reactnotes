import { configureStore } from "@reduxjs/toolkit";
import { notesGrpReducer } from "./features";

export const store = configureStore({
  reducer: {
    notes: notesGrpReducer,
  },
});
