import { configureFonts } from 'react-native-paper'
import colorTheme, { NativeColor } from './colorTheme'
import { useEffect, useMemo } from 'react'
import { Appearance } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { IconProps } from 'react-native-paper/lib/typescript/components/MaterialCommunityIcon'
import { useSystemTheme } from '../store/useSystemTheme'
import * as SystemUI from 'expo-system-ui'

export type IconNameType = keyof typeof MaterialCommunityIcons.glyphMap

const FontName = 'Open-Sans'

export const useTheme = () => {
    // settings themes
    const { states, action } = useSystemTheme()

    // darkModeCheck
    const darkMode = states.darkMode

    // prepare theme
    const myTheme = darkMode ? colorTheme.dark : colorTheme.light

    const theme = useMemo(
        () => ({
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
            },
            icon: (props: IconProps) => <MaterialCommunityIcons {...(props as any)} />
        }),
        [darkMode]
    )

    // check system color scheme
    useEffect(() => {
        const ThemeSystem = Appearance.addChangeListener(({ colorScheme }) => {
            action.setTheme(colorScheme)
            SystemUI.setBackgroundColorAsync(theme.background)
        })
        return () => ThemeSystem.remove()
    }, [])

    return { theme, darkMode }
}
