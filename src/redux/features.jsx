import { createSlice } from "@reduxjs/toolkit";
import { RetriveData } from "../utils/storage";

const initialState = {
  note_grp_update: "",
  selectedGrp: RetriveData("selecetdGrp"),
  display: {
    notes: "flex",
    noteView: "none",
  },
};

const NotesSlice = createSlice({
  name: "notes_grp",
  initialState,
  reducers: {
    updateNotesGrp: (state, action) => {
      state.note_grp_update = action.payload;
    },
    updateSelectedGrp: (state, action) => {
      state.selectedGrp = action.payload;
    },
    updateDisplay: (state, action) => {
      state.display = action.payload;
    },
  },
});

export const { updateNotesGrp, updateSelectedGrp, updateDisplay } =
  NotesSlice.actions;
export const notesGrpReducer = NotesSlice.reducer;
