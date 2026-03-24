import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUserSlice } from "./slices/createUserSlice";

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
    }),
    {
      name: "bound-store",
      skipHydration: true,
    }
  )
);