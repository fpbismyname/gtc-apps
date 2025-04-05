import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Pressable, View } from 'react-native'
import { colorPallet } from '~/src/constants/colorPallete'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '~/src/components/Elements/Text'

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const icons = ['home', 'book', 'account']

    return (
        <View className="bg-primary m-4 rounded-2xl flex flex-row justify-between items-center">
            {state.routes.map((route, index) => {
                const isFocused = state.index === index
                const iconName = icons[index]
                const { options } = descriptors[route.key]
                return (
                    <Pressable key={route.key} className={`flex flex-row p-2 flex-1 justify-center items-center gap-2`}>
                        <Pressable className={`p-2 flex flex-row justify-center w-full rounded-xl gap-1 ${isFocused && 'bg-dark'}`} onPress={() => navigation.navigate(route.name)}>
                            <Icon name={isFocused ? `${iconName}-outline` : iconName} size={18} color={isFocused ? colorPallet.primary : colorPallet.dark} />
                            {isFocused ? <Text customStyle="text-primary">{options.title}</Text> : null}
                        </Pressable>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default CustomTabBar
