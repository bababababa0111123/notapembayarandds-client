import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import NotaReducer from "./features/notaSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    nota: NotaReducer,
  },
});
