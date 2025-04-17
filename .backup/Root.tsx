import App from './App'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useTheme } from '../src/constants/useTheme'
import { PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const Root = () => {
    // Get Themes systems
    const { theme } = useTheme()

    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <App />
            </SafeAreaProvider>
        </PaperProvider>
    )
}
export default Root
