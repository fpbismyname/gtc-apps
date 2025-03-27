import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from '~/src/components/Elements/Text'
import { colorPallet } from '~/src/constants/colorPallete'

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const icons = ['home', 'book', 'account']

    return (
        <View className="bg-primary py-4 flex-row justify-around items-center">
            {state.routes.map((route, index) => {
                const isFocused = state.index === index
                const iconName = icons[index]
                const { options } = descriptors[route.key]
                return (
                    <Pressable key={route.key} onPress={() => navigation.navigate(route.name)} className={`flex items-center px-10`}>
                        <Icon name={isFocused ? iconName : `${iconName}-outline`} size={18} color={colorPallet.gray} />
                        <Text customStyle="text-gray">{options.title}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default CustomTabBar
