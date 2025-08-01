import { createSlice } from '@reduxjs/toolkit';

const SAVED_CLASSES_KEY = 'savedClasses';

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(SAVED_CLASSES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const savedClassesSlice = createSlice({
  name: 'savedClasses',
  initialState: getInitialState(),
  reducers: {
    toggleSavedClass: (state, action) => {
      const id = action.payload;
      const idx = state.indexOf(id);
      if (idx === -1) {
        state.push(id);
      } else {
        state.splice(idx, 1);
      }
      localStorage.setItem(SAVED_CLASSES_KEY, JSON.stringify(state));
    },
    removeSavedClass: (state, action) => {
      const id = action.payload;
      const idx = state.indexOf(id);
      if (idx !== -1) {
        state.splice(idx, 1);
        localStorage.setItem(SAVED_CLASSES_KEY, JSON.stringify(state));
      }
    },
    setSavedClasses: (state, action) => {
      // Replace all saved classes (for initialization or reset)
      return action.payload;
    },
  },
});

export const { toggleSavedClass, removeSavedClass, setSavedClasses } = savedClassesSlice.actions;
export default savedClassesSlice.reducer; 