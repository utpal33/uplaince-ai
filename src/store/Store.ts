import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const initialState: User[] = JSON.parse(localStorage.getItem("userData") || "[]");

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (_state, action: PayloadAction<User[]>) => {
      localStorage.setItem("userData", JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { saveUser } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

