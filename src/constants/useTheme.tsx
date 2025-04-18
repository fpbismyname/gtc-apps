import { configureFonts } from 'react-native-paper'
import { colorTheme, colorThemes } from './colorTheme'
import { useEffect } from 'react'
import { Appearance } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSystemTheme } from '../store/useSystemTheme'
import * as SystemUI from 'expo-system-ui'

export type IconNameType = keyof typeof MaterialCommunityIcons.glyphMap

const FontName = 'Open-Sans'

export const useTheme = () => {
    // settings themes
    const { states, setTheme } = useSystemTheme()

    // darkModeCheck
    const darkMode = states.darkMode

    // prepare theme
    const myTheme = darkMode ? colorThemes.dark : colorThemes.light
    const myThemeWithTransparent = darkMode ? colorTheme.dark : colorTheme.light

    const theme = {
        ...myTheme,
        colors: {
            ...myTheme
        },
        fonts: configureFonts({
            config: {
                fontFamily: FontName
            }
        }),
        roundness: 12,
        animation: {
            scale: 1.0
        }
    }

    // Prepared theme with Transparent
    const themeWithTransparent = {
        ...myThemeWithTransparent,
        colors: {
            ...myThemeWithTransparent
        },
        fonts: configureFonts({
            config: {
                fontFamily: FontName
            }
        }),
        roundness: 12,
        animation: {
            scale: 1.0
        }
    }

    // check system color scheme
    useEffect(() => {
        const ThemeSystem = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme)
            SystemUI.setBackgroundColorAsync(theme.background)
        })
        return () => ThemeSystem.remove()
    }, [])

    return { theme, themeWithTransparent, darkMode }
}
