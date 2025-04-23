import { Platform } from 'react-native'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'
import { decryptWithAes, encryptWithAes } from '../utils/encryptUtility'

interface UserIDType {
    states: {
        user_id: string | null
    }
    setUserID: (id: string | null) => void
    deleteUserID: () => void
}

// Check Platform
const onPlatform = Platform.OS

const secureStorage = {
    getItem: async (key: string): Promise<string | null> => {
        if (onPlatform === 'web') {
            const encryptedValue = localStorage.getItem(key)
            return encryptedValue ? decryptWithAes(encryptedValue) : null
        } else {
            return await SecureStore.getItemAsync(key)
        }
    },
    setItem: async (key: string, value: string): Promise<void> => {
        if (onPlatform === 'web') {
            const encryptedValue = encryptWithAes(value)
            localStorage.setItem(key, encryptedValue)
        } else {
            await SecureStore.setItemAsync(key, value)
        }
    },
    removeItem: async (key: string): Promise<void> => {
        if (onPlatform === 'web') {
            localStorage.removeItem(key)
        } else {
            await SecureStore.deleteItemAsync(key)
        }
    }
}

export const useUsers = create<UserIDType>()(
    persist(
        (set) => ({
            states: {
                user_id: null
            },
            setUserID: (id: string | null) => set((prev) => ({ states: { ...prev.states, user_id: id } })),
            deleteUserID: () => set((prev) => ({ states: { ...prev.states, user_id: null } }))
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
