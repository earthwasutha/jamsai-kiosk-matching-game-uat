import { create } from "zustand";
import { createUserSlice } from "./slices/createUserSlice";

export const useBoundStore = create((...a) => ({
  ...createUserSlice(...a),
}));
