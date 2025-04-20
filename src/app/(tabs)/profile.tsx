import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { Avatar, Divider, IconButton, Menu, PaperProvider, Portal } from 'react-native-paper'
import Button from '~/src/components/elements/Button'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { useTheme } from '~/src/constants/useTheme'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useDelay from '~/src/hooks/utils/useDelay'
import useFetch from '~/src/hooks/utils/useFetch'
import { useUsers } from '~/src/store/useUsers'
import { Account } from '~/src/types/Firebase/Account'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'
import DefaultImage from '~/src/assets/images/profile/defaultProfile.png'

interface ProfilePage {
    fetchedData: DocumentDataWithID
    theme: any
}

const HeaderProfile: FC<ProfilePage & { account: { isLoading: boolean; isError: any } }> = ({ fetchedData, theme, account }) => {
    // Profile Datas
    const datas = fetchedData as Account
    // Checking Data
    if (account.isLoading || !datas || !datas.id) return
    // Users
    const { deleteUserID } = useUsers()
    // Logout func
    const logout = () => deleteUserID()
    // Menu State
    const [menuVisible, setMenuVisible] = useState<boolean>(false)
    // Menu Func
    const openMenu = () => setMenuVisible(true)
    const closeMenu = () => setMenuVisible(false)

    // Provide Headed profile
    return (
        <View Style={['flexRow', 'itemsCenter', 'px4', 'py5', 'gap2', 'roundedMd']}>
            <View Style={['flexColumn', 'gap2', 'expand']}>
                <View Style={['flexRow', 'itemsCenter', 'gap4']}>
                    <Avatar.Image source={datas.information.profile_picture ? { uri: datas.information.profile_picture } : DefaultImage} size={64} />
                    <View>
                        <Text variant="bodyMedium" Weight="fontBold">
                            {datas.authentication.username}
                        </Text>
                        <Text variant="labelSmall">{datas.authentication.email}</Text>
                    </View>
                </View>
            </View>
            <View Style={['flexColumn', 'itemsEnd']}>
                <MenuView closeMenu={closeMenu} openMenu={openMenu} datas={datas} logout={logout} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
            </View>
        </View>
    )
}

const MenuView = ({
    datas,
    menuVisible,
    closeMenu,
    openMenu,
    setMenuVisible,
    logout
}: {
    datas: Account
    menuVisible: boolean
    logout: () => void
    closeMenu: () => void
    openMenu: () => void
    setMenuVisible: Dispatch<SetStateAction<boolean>>
}) => {
    const [ready, setReady] = useState<boolean>(false)
    return (
        <Menu
            visible={ready ? menuVisible : false}
            onDismiss={closeMenu}
            statusBarHeight={24}
            anchorPosition="bottom"
            mode="flat"
            anchor={<IconButton onLayout={() => setReady(true)} icon={'dots-vertical'} onPress={openMenu} />}
        >
            <Menu.Item
                trailingIcon={'badge-account-horizontal'}
                title="Akun Saya"
                onPress={() => {
                    router.push({
                        pathname: `my_profile/[id]`,
                        params: {
                            id: datas.id,
                            title: 'Akun Saya'
                        }
                    })
                    setMenuVisible(false)
                }}
            />
            <Divider />
            <Menu.Item trailingIcon={'logout'} title="Logout" onPress={logout} />
        </Menu>
    )
}

const NewUserView = () => {
    // Theme
    const { theme } = useTheme()

    return (
        <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'expand']}>
            <View Style={['flexRow', 'p8', 'rowGap2', 'roundedMd']}>
                <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'gap5']}>
                    <View Style={['flexColumn', 'itemsCenter']}>
                        <MaterialCommunityIcons name="bookshelf" size={64} color={theme.onPrimaryContainer} />
                        <Text Style={['textCenter']} variant="bodyLarge" Weight="fontBold">
                            Buka akses pembelajaran
                        </Text>
                        <Text Style={['textCenter']} variant="labelSmall">
                            Raih kesuksesan-mu mulai dari sekarang.
                        </Text>
                    </View>
                    <View Style={['flexRow', 'gap2', 'justifyCenter']}>
                        <Button compact onPress={() => router.push('/auth')}>
                            Dapatkan akses
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

const profile = () => {
    // Theme
    const { theme } = useTheme()
    // Get User ID
    const { states: users } = useUsers()
    // AccountCollection
    const { states: account, getData } = useCollection('Account')
    // fetchData
    const { datas, isLoading } = useFetch('useFocusEffect', async () => {
        if (!users.user_id) return
        return await getData({ queryByDocId: users.user_id })
    })
    // Delay View
    const loadingView = useDelay(isLoading)
    return (
        <Section Style={['flexColumn']}>
            {loadingView ? (
                <LoadingScreen children />
            ) : users.user_id ? (
                <>
                    <HeaderProfile account={account} fetchedData={datas as DocumentDataWithID} theme={theme} />
                </>
            ) : (
                <NewUserView />
            )}
        </Section>
    )
}

export default profile
