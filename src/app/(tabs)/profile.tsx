import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FC, useState } from 'react'
import { ActivityIndicator, Icon, IconButton, Menu } from 'react-native-paper'
import Button from '~/src/components/elements/Button'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { useTheme } from '~/src/constants/useTheme'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useFetch from '~/src/hooks/utils/useFetch'
import { useUsers } from '~/src/store/useUsers'
import { Account } from '~/src/types/Firebase/Account'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'
import { currentType } from '~/src/utils/currentType'

interface ProfilePage {
    fetchedData: DocumentDataWithID
    theme: any
}

const HeaderProfile: FC<ProfilePage & { account: any }> = ({ fetchedData, theme, account }) => {
    // Profile Datas
    const datas = fetchedData as Account
    // Users
    const { deleteUserID } = useUsers()
    // Menu State
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)
    // Logout func
    const logout = () => deleteUserID()

    // Loading profile data
    if (account.isLoading)
        return (
            <View Style={['flexColumn', 'expand', 'itemsCenter', 'justifyCenter']}>
                <ActivityIndicator animating />
            </View>
        )

    // Provide Headed profile
    return (
        <View Style={['flexRow', 'itemsCenter', 'p4', 'roundedMd', { backgroundColor: theme.primaryContainer }]}>
            <View Style={['flexColumn', 'expand', 'px2', 'rowGap2']}>
                <Text Weight="fontBold">{datas.authentication.username || ''}</Text>
                <View Style={['flexRow', 'itemsCenter', 'gap2']}>
                    <Icon source={'account-group'} size={12} />
                    <Text>{currentType(datas.information.role || '')}</Text>
                </View>
            </View>
            <View>
                <Menu visible={visible} onDismiss={closeMenu} anchorPosition="bottom" anchor={<IconButton icon={'dots-vertical'} onPress={openMenu} />}>
                    <Menu.Item trailingIcon={'logout'} onPress={logout} title="Logout" />
                </Menu>
            </View>
        </View>
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
                        <Text Style={['textCenter']}>Raih kesuksesan-mu mulai dari sekarang.</Text>
                    </View>
                    <View Style={['flexRow', 'gap2', 'justifyCenter']}>
                        <Button mode="contained" compact onPress={() => router.push('/auth')}>
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
    const { datas: fetchedData } = useFetch('useFocusEffect', async () => getData({ queryByDocId: users.user_id }))
    return (
        <Section Style={['flexColumn', 'p2']}>
            {users.user_id ? <HeaderProfile account={account} fetchedData={fetchedData as DocumentDataWithID} theme={theme} /> : <NewUserView />}
        </Section>
    )
}

export default profile
