import { configureStore } from '@reduxjs/toolkit';
import validationReducer from './slice';

const store = configureStore({
  reducer: {
    validation: validationReducer,
  },
});

export default store;
