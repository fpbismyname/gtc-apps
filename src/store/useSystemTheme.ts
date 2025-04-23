import { Appearance, ColorSchemeName, Platform } from 'react-native'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'
import { decryptWithAes, encryptWithAes } from '../utils/encryptUtility'

type systemTheme = {
    isDarkMode: boolean
    setTheme: (theme: ColorSchemeName) => void
    toggleTheme: () => void
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

export const useSystemTheme = create<systemTheme>()(
    persist(
        (set) => ({
            setTheme: (theme: ColorSchemeName) => Appearance.setColorScheme(theme),
            toggleTheme: () => {
                set((prev) => ({
                    isDarkMode: !prev.isDarkMode
                }))
            },
            isDarkMode: Appearance.getColorScheme() === 'dark'
        }),
        {
            name: 'system-theme',
            storage: createJSONStorage(() => secureStorage),
            partialize: (state) => ({
                isDarkMode: state.isDarkMode
            })
        }
    )
)
