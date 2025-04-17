import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'

interface UserIDType {
    states: {
        user_id: string | null
    }
    action: {
        setUserID: (id: string | null) => void
        deleteUserID: () => void
    }
    deleteUserID: () => void
}

const secureStorage = {
    getItem: async (key: string): Promise<string | null> => {
        return await SecureStore.getItemAsync(key)
    },
    setItem: async (key: string, value: string): Promise<void> => {
        await SecureStore.setItemAsync(key, value)
    },
    removeItem: async (key: string): Promise<void> => {
        await SecureStore.deleteItemAsync(key)
    }
}

export const useUsers = create<UserIDType>()(
    persist(
        (set) => ({
            states: {
                user_id: null
            },
            action: {
                setUserID: (id: string | null) => set((prev) => ({ states: { ...prev.states, user_id: id } })),
                deleteUserID: () => set((prev) => ({ states: { ...prev.states, user_id: null } }))
            },
            deleteUserID: () => set({ states: { user_id: null } })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => secureStorage),
            partialize: (state) => ({
                states: state.states
            })
        }
    )
)
