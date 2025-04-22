import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useFocusEffect, useGlobalSearchParams } from 'expo-router'
import { FC, useCallback, useState } from 'react'
import { ActivityIndicator, Appbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '~/src/constants/useTheme'
import { LocalPushParams } from '~/src/types/Navigation/navigationType'
import Text from '../elements/Text'
import View from '../elements/View'

const CustomHeader: FC<NativeStackHeaderProps> = ({ navigation, options, route }) => {
    const insets = useSafeAreaInsets()
    const [titleHeader, setTitleHeader] = useState<string | ''>('')
    const { theme } = useTheme()
    const { title, id } = useGlobalSearchParams<LocalPushParams>()

    useFocusEffect(
        useCallback(() => {
            setTitleHeader(title || '')
        }, [title, id])
    )

    if (route.name === 'auth') {
        return (
            <Appbar.Header safeAreaInsets={insets} theme={theme}>
                <View Style={['flexRow', 'itemsCenter', 'px4', 'expand', 'justifyCenter']}>
                    <View Style={['absolute', 'left0', 'pl4']}>{navigation.canGoBack() ? <Appbar.BackAction onPress={() => navigation.goBack()} size={24} /> : null}</View>
                </View>
            </Appbar.Header>
        )
    }

    return (
        <>
            <Appbar.Header safeAreaInsets={insets} theme={theme} mode="center-aligned">
                <View Style={['flexRow', 'itemsCenter', 'px4', 'expand', 'justifyCenter']}>
                    <View Style={['absolute', 'left0', 'pl4']}>{navigation.canGoBack() ? <Appbar.BackAction onPress={() => navigation.goBack()} size={24} /> : null}</View>
                    <View Style={['flexColumn', 'itemsCenter']}>{titleHeader ? <Text variant="headlineSmall">{options.title || titleHeader}</Text> : null}</View>
                </View>
            </Appbar.Header>
        </>
    )
}
export default CustomHeader
