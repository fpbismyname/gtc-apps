import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { FC, useRef, useState } from 'react'
import { ActivityIndicator, Appbar, Menu, Portal } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import Image from '../elements/Image'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useFetch from '~/src/hooks/utils/useFetch'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'
import View from '../elements/View'
import Text from '../elements/Text'
import useAuth from '~/src/hooks/Auth/useAuth'
import { useUsers } from '~/src/store/useUsers'
import { styling } from '~/src/constants/styleSheets'
import { useSystemTheme } from '~/src/store/useSystemTheme'
import { router } from 'expo-router'

const CustomHeaderBottomTabBar: FC<BottomTabHeaderProps> = ({ options, route }) => {
    const insets = useSafeAreaInsets()
    const { getData } = useCollection('MasterData/Institution/Profile')
    const { datas, isLoading } = useFetch('useEffect', async () => {
        return await getData()
    })
    const iconInstitution = datas as InsitutionInformation
    const { states: users } = useUsers()
    const { signOutAccount } = useAuth()
    const { theme } = useTheme()

    // Menu States
    const [visibleMenu, setVisibleMenu] = useState<boolean>(false)
    const openMenu = () => setVisibleMenu(true)
    const closeMenu = () => setVisibleMenu(false)
    // themeButton
    const { toggleTheme, isDarkMode } = useSystemTheme()

    if (route.name === 'profile') {
        return (
            <>
                <Appbar.Header safeAreaInsets={{ top: insets.top }} theme={theme} mode="small">
                    <View style={styling('flexRow', 'px4', 'itemsCenter', 'justifyBetween', 'expand')}>
                        {isLoading ? (
                            <ActivityIndicator animating />
                        ) : (
                            <>
                                <View Style={['flexRow', 'gap4', 'itemsCenter']}>
                                    <Image source={{ uri: iconInstitution.logo }} Width="w8" Height="h8" />
                                    <Text Weight="fontBlack" variant="headlineSmall">
                                        {options.title}
                                    </Text>
                                </View>
                            </>
                        )}
                        <View Style={['flexRow', 'gap4', 'itemsCenter']}>
                            <Menu
                                visible={visibleMenu}
                                onDismiss={closeMenu}
                                anchorPosition="bottom"
                                anchor={<Appbar.Action icon={'dots-vertical' as IconNameType} size={28} onPress={openMenu} />}
                            >
                                {users.user_id && (
                                    <Menu.Item
                                        title="Akun Saya"
                                        leadingIcon={'account' as IconNameType}
                                        onPress={() => {
                                            router.push({
                                                pathname: 'profile/[id]',
                                                params: {
                                                    id: users.user_id,
                                                    title: 'Akun Saya'
                                                }
                                            })
                                            closeMenu()
                                        }}
                                    />
                                )}
                                <Menu.Item
                                    title={isDarkMode ? 'Tema Cerah' : 'Tema Gelap'}
                                    leadingIcon={isDarkMode ? ('weather-night' as IconNameType) : ('white-balance-sunny' as IconNameType)}
                                    onPress={toggleTheme}
                                />
                                <Menu.Item
                                    title={'Tentang Lembaga'}
                                    leadingIcon={'bank' as IconNameType}
                                    onPress={() => {
                                        router.push({
                                            pathname: 'profile/institution',
                                            params: {
                                                title: 'Tentang Lembaga'
                                            }
                                        })
                                        closeMenu()
                                    }}
                                />
                                {users.user_id && (
                                    <Menu.Item
                                        title={'Logout'}
                                        leadingIcon={'logout' as IconNameType}
                                        onPress={() => {
                                            signOutAccount()
                                            closeMenu()
                                        }}
                                    />
                                )}
                            </Menu>
                        </View>
                    </View>
                </Appbar.Header>
            </>
        )
    }
}
export default CustomHeaderBottomTabBar
