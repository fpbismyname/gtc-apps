import { Appearance, ColorSchemeName } from 'react-native'
import { create } from 'zustand'

type systemTheme = {
    states: {
        darkMode: boolean
    }
    action: {
        setTheme: (theme: ColorSchemeName) => void
        toggleTheme: () => void
    }
}

export const useSystemTheme = create<systemTheme>((set) => ({
    states: {
        darkMode: Appearance.getColorScheme() === 'dark'
    },
    action: {
        setTheme: (theme: ColorSchemeName) =>
            set((prev) => ({
                states: {
                    ...prev.states,
                    darkMode: theme === 'dark'
                }
            })),
        toggleTheme: () =>
            set((prev) => ({
                states: {
                    ...prev.states,
                    darkMode: Appearance.getColorScheme() === 'dark' ? false : true
                }
            }))
    }
}))
