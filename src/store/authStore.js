import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
    persist(
        (set) => ({
            user: null,
            userId: null,
            token: null,
            loggedIn: false,

            setUser: (user) => set({ user }),

            setUserId: (userId) => set({ userId }),

            setToken: (token) => set({ token }),

            setLoggedIn: (loggedIn) => set({ loggedIn }),

            resetAuth: () =>
                set({
                    user: null,
                    userId: null,
                    token: null,
                    loggedIn: false,
                }),
        }),
        {
            name: "auth-storage",

            version: 1, // 👈 fixes migration warning

            partialize: (state) => ({
                user: state.user,
                userId: state.userId,
                token: state.token,
                loggedIn: state.loggedIn,
            }),

            // 👇 important: prevents future migration crashes
            migrate: (persistedState) => {
                return {
                    user: persistedState?.user ?? null,
                    userId: persistedState?.userId ?? null,
                    token: persistedState?.token ?? null,
                    loggedIn: persistedState?.loggedIn ?? false,
                };
            },
        }
    )
);