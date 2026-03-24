import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
    token: string | null;
    setToken: (token: string | null) => void;

    user: any | null;
    setUser: (user: any | null) => void;

    rememberMe: boolean;
    setRememberMe: (remember: boolean) => void;

    selectedAdType: 'personal' | 'business' | 'story' | 'service' | null;
    setSelectedAdType: (type: AppState['selectedAdType']) => void;

    logout: () => void;

    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    _hasHydrated: boolean;
    setHasHydrated: (hydrated: boolean) => void;

    tempStoryData: any | null;
    setTempStoryData: (data: any | null) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            token: null,
            selectedAdType: null,
            rememberMe: false,

            setToken: (token) => set({ token }),

            user: null,
            setUser: (user) => set({ user }),

            setRememberMe: (rememberMe) => set({ rememberMe }),

            setSelectedAdType: (type) => set({ selectedAdType: type }),

            logout: () => set({ token: null, selectedAdType: null, user: null, rememberMe: false }),

            isLoading: false,
            setLoading: (loading: boolean) => set({ isLoading: loading }),

            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),

            tempStoryData: null,
            setTempStoryData: (tempStoryData) => set({ tempStoryData }),
        }),
        {
            name: 'lifenavi-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                token: state.rememberMe ? state.token : null,
                user: state.rememberMe ? state.user : null,
                rememberMe: state.rememberMe,
                selectedAdType: state.selectedAdType,
                tempStoryData: state.tempStoryData,
            }),
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true);
            },
        }
    )
);