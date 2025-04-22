import { Appearance, ColorSchemeName } from 'react-native'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'

type systemTheme = {
    isDarkMode: boolean
    setTheme: (theme: ColorSchemeName) => void
    toggleTheme: () => void
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
