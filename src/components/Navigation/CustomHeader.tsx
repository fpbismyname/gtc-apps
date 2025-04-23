import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { router, useFocusEffect, useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { FC, useCallback, useState } from 'react'
import { Appbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '~/src/constants/useTheme'
import Text from '../elements/Text'
import View from '../elements/View'

const CustomHeader: FC<NativeStackHeaderProps> = ({ options, route }) => {
    const insets = useSafeAreaInsets()
    const { theme } = useTheme()
    const { id } = useLocalSearchParams()
    const [titleHeader, setTitleHeader] = useState<string>()

    const RouteName: Record<string, string> = {
        auth: '',
        institution: 'Tentang Lembaga',
        '[id]': 'Akun Saya'
    }

    useFocusEffect(
        useCallback(() => {
            setTitleHeader(RouteName[route.name])
        }, [id])
    )

    if (route.name === 'auth') {
        return (
            <Appbar.Header safeAreaInsets={insets} theme={theme}>
                <View Style={['flexRow', 'itemsCenter', 'px4', 'expand', 'justifyCenter']}>
                    <View Style={['absolute', 'left0', 'pl4']}>{<Appbar.BackAction onPress={() => router.push('/(tabs)/')} size={24} />}</View>
                </View>
            </Appbar.Header>
        )
    }

    if (route.name === 'institution')
        return (
            <>
                <Appbar.Header safeAreaInsets={insets} theme={theme} mode="center-aligned">
                    <View Style={['flexRow', 'itemsCenter', 'px4', 'expand', 'justifyCenter']}>
                        <View Style={['absolute', 'left0', 'pl4']}>{<Appbar.BackAction onPress={() => router.push('/(tabs)/profile')} size={24} />}</View>
                        <View Style={['flexColumn', 'itemsCenter']}>{titleHeader ? <Text variant="headlineSmall">{options.title || titleHeader}</Text> : null}</View>
                    </View>
                </Appbar.Header>
            </>
        )
    if (route.name === '[id]')
        return (
            <>
                <Appbar.Header safeAreaInsets={insets} theme={theme} mode="center-aligned">
                    <View Style={['flexRow', 'itemsCenter', 'px4', 'expand', 'justifyCenter']}>
                        <View Style={['absolute', 'left0', 'pl4']}>{<Appbar.BackAction onPress={() => router.push('/(tabs)/profile')} size={24} />}</View>
                        <View Style={['flexColumn', 'itemsCenter']}>{titleHeader ? <Text variant="headlineSmall">{options.title || titleHeader}</Text> : null}</View>
                    </View>
                </Appbar.Header>
            </>
        )
}
export default CustomHeader
