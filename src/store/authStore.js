import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
    persist(
        (set) => ({
            user: "",
            loggedIn: false,
            userId: 0,
            token: "",
            expiration: 0,
            setUser: (user) => set({ user }),
            setLoggedIn: (loggedIn) => set({ loggedIn }),
            setUserId: (userId) => set({ userId }),
            setToken: (token) => set({ token }),
            resetAuth: () =>
                set({
                    user: "",
                    loggedIn: false,
                    userId: 0,
                    token: "",
                    expiration: 0,
                }),
        }),
        {
            name: "auth-storage", // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
            partialize: (state) => ({ userId: state.userId, token: state.token }),
            version: 1,
        }
    )
);
