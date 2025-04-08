import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { StoredUser } from "~/types";

export const useUser = create(
    persist(
        (set) => ({
            userData: {},
            setLogin: (userData: StoredUser) => set({ userData }),
        }),
        {
            name: "userData",
        },
    ),
);
