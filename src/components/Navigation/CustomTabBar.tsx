import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { FC } from 'react'
import { useTheme } from '~/src/constants/useTheme'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomNavigation } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native'
import Text from '../elements/Text'
import View from '../elements/View'

const CustomTabBar: FC<BottomTabBarProps> = ({ state, descriptors, insets, navigation }) => {
    const { themeWithTransparent } = useTheme()
    const excludePath = ['']
    const filteredRoutes = state.routes.filter((route) => !excludePath.some((path) => route.name.startsWith(path)))
    const filteredRouteNames = state.routeNames.filter((name) => !excludePath.some((path) => name.startsWith(path)))
    const filteredHistory = state.history.filter((entry) => {
        const matchedRoute = state.routes.find((route) => route.key === entry.key)
        return matchedRoute ? !excludePath.some((path) => matchedRoute.name.startsWith(path)) : true
    })
    const filteredState = {
        ...state,
        routes: filteredRoutes,
        routeNames: filteredRouteNames,
        history: filteredHistory
    }

    const getLabel = (route: (typeof state.routes)[number]) => {
        const { options } = descriptors[route.key]
        return options.title || route.name
    }

    return (
        <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            theme={themeWithTransparent}
            keyboardHidesNavigationBar
            style={{ backgroundColor: themeWithTransparent.primaryContainer }}
            activeColor={themeWithTransparent.onBackground}
            inactiveColor={themeWithTransparent.onBackground}
            activeIndicatorStyle={{ backgroundColor: themeWithTransparent['primary/50'] }}
            renderIcon={({ route, focused, color }) => {
                switch (route.name) {
                    case 'index':
                        return <MaterialCommunityIcons name={focused ? 'home-variant' : 'home-variant-outline'} color={color} size={24} />
                    case 'module':
                        return <MaterialCommunityIcons name={focused ? 'book-multiple' : 'book-multiple-outline'} color={color} size={24} />
                    case 'profile':
                        return <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={24} />
                    default:
                        return <MaterialCommunityIcons name={focused ? 'crop-landscape' : 'crop-square'} color={color} size={24} />
                }
            }}
            onTabPress={({ preventDefault, route }) => {
                const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true
                })

                if (event.defaultPrevented) {
                    preventDefault()
                } else {
                    navigation.dispatch({ ...CommonActions.navigate(route.name, route.params), target: state.key })
                }
            }}
            renderLabel={({ route, color }) => {
                const label = getLabel(route)
                return (
                    <View Style={['itemsCenter', 'justifyCenter']}>
                        <Text Style={[{ color: color }]} Weight={'fontBold'}>
                            {label}
                        </Text>
                    </View>
                )
            }}
        />
    )
}
export default CustomTabBar
