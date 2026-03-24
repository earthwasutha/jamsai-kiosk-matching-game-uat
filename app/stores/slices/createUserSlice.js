import { persist } from "zustand/middleware";

export const createUserSlice = persist(
  (set) => ({
    isAuthentication: false,
    profile: {},
    // isAuthentication: true,
    // jamsaiId: "2405000049",
    // profile: {jamsai_id: "2405000049",},
    gameResult: {},
    time: 0,
    accessToken: "",
    user: 0,
    editedAddress: {},
    isLoading: false,
    choice: 0,
    heart: 0,
    reward: {},
    historyFlip: [],
    keyPattern: "",
    pattern: {},
    setIsAuthentication: (isAuthentication) =>
      set(() => ({ isAuthentication })),
    setAccessToken: (accessToken) => set(() => ({ accessToken })),
    setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
    setEditedAddress: (editedAddress) => set(() => ({ editedAddress })),

    setReward: (reward) => set(() => ({ reward })),
    setProfile: (profile) => set(() => ({ profile })),
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    setGameResult: (gameResult) => set(() => ({ gameResult })),
    setChoice: (choice) => set(() => ({ choice })),
    setTime: (time) => set(() => ({ time })),
    setHeart: (heart) => set(() => ({ heart })),
    setKeyPattern: (keyPattern) => set(() => ({ keyPattern })),
    setPattern: (pattern) => set(() => ({ pattern })),
    setHistoryFlip: (flip) =>
      set((state) => ({
        historyFlip: [...state.historyFlip, flip],
      })),
    clearHistoryFlip: () => set({ historyFlip: [] }),
  }),
  {
    name: "store", // unique name to store the state in local storage
  }
);
