import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { Pressable, View } from 'react-native'
import { colorPallet } from '~/src/constants/colorPallete'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import Text from '~/src/components/Elements/Text'

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const icons = ['home', 'book', 'account-circle']
    return (
        <View className="bg-primary flex flex-row justify-between items-center">
            {state.routes.map((route, index) => {
                const isFocused = state.index === index
                const iconName: any = icons[index]
                const { options } = descriptors[route.key]
                return (
                    <Pressable key={route.key} className={`flex p-2 flex-row flex-1 justify-center items-center gap-2`}>
                        <Pressable className={`flex flex-col items-center justify-center w-full`} onPress={() => navigation.navigate(route.name)}>
                            <Icon name={isFocused ? iconName : `${iconName}-outline`} size={24} color={colorPallet.dark} />
                            <Text customStyle="text-dark" size="md" weight={isFocused ? 'bolder' : 'normal'}>
                                {options.title}
                            </Text>
                        </Pressable>
                    </Pressable>
                )
            })}
        </View>
    )
}

export default CustomTabBar
