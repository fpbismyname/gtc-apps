import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { useFocusEffect, useGlobalSearchParams } from 'expo-router'
import { FC, useCallback, useState } from 'react'
import { Appbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '~/src/constants/useTheme'
import { LocalPushParams } from '~/src/types/Navigation/navigationType'

const CustomHeader: FC<NativeStackHeaderProps> = ({ navigation }) => {
    const insets = useSafeAreaInsets()
    const [titleHeader, setTitleHeader] = useState<string | ''>('')
    const { theme } = useTheme()
    const { title, id } = useGlobalSearchParams<LocalPushParams>()

    useFocusEffect(
        useCallback(() => {
            setTitleHeader(title || '')
        }, [title, id])
    )
    return (
        <>
            <Appbar.Header safeAreaInsets={insets} theme={theme} mode="center-aligned">
                <Appbar.BackAction onPress={() => navigation.goBack()} size={24} />
                <Appbar.Content title={titleHeader} />
            </Appbar.Header>
        </>
    )
}
export default CustomHeader
