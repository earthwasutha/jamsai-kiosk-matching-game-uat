"use client";
import { useEffect } from "react";
import { useBoundStore } from "@/app/stores/useBoundStore";

export function StoreHydration() {
  useEffect(() => {
    useBoundStore.persist.rehydrate();
  }, []);

  return null;
}