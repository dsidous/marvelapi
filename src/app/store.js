import { configureStore } from '@reduxjs/toolkit';
import marvelReducer from '../app/marvelSlice';

export default configureStore({
  reducer: {
    characters: marvelReducer,
  },
});
