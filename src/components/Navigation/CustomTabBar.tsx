import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FC } from 'react'
import View from '../elements/View'
import { router } from 'expo-router'
import Text from '../elements/Text'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import { Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styling } from '~/src/constants/styleSheets'

const CustomTabBar: FC<BottomTabBarProps> = ({ state, descriptors }) => {
    const { theme } = useTheme()
    const iconTabBar: { [key: string]: IconNameType } = {
        home: 'home-variant',
        module: 'book-multiple',
        profile: 'account'
    }
    const excludePath = ['profile/']
    return (
        <View Style={['flexRow', 'flexRow', { backgroundColor: theme.primaryContainer }]}>
            {state.routes.map((route, index) => {
                if (excludePath.some((path) => route.name.includes(path))) return
                const isFocused = state.index === index
                const { options } = descriptors[route.key]
                const label = options.title || route.name
                const icon = iconTabBar[route.name]
                return (
                    <Pressable key={index} style={styling('flexColumn', 'itemsCenter', 'justifyCenter', 'expand', 'p4')} onPress={() => router.push(route.name)}>
                        <>
                            <MaterialCommunityIcons name={!isFocused ? (`${icon}-outline` as any) : icon} color={theme.onBackground} size={24} />
                            <Text Weight={!isFocused ? 'fontNormal' : 'fontBold'}>{label}</Text>
                        </>
                    </Pressable>
                )
            })}
        </View>
    )
}
export default CustomTabBar
