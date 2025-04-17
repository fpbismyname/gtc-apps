import { useFocusEffect } from 'expo-router'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Icon, IconButton, Menu } from 'react-native-paper'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { useTheme } from '~/src/constants/useTheme'
import useCollection from '~/src/hooks/Firebase/useCollection'
import { useUsers } from '~/src/store/useUsers'
import { Account } from '~/src/types/Firebase/Account'
import { currentType } from '~/src/utils/currentType'

const HeaderProfile = () => {
    // Theme
    const { theme } = useTheme()
    // Get User ID
    const { states: users, action: actUsers, deleteUserID } = useUsers()
    // AccountCollection
    const { states: account, action: actAccount } = useCollection('Account')
    // State data
    const [data, setData] = useState<Account | null>(null)
    // fetchData
    useFocusEffect(
        useCallback(() => {
            const fetch = async () => {
                await actAccount.getData({ queryByDocId: users.user_id }).then((data) => setData(data?.shift() as Account))
            }
            fetch()
        }, [])
    )
    // Menu State
    const [visible, setVisible] = useState(false)
    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)
    // Loading profile data
    if (account.isLoading) return <ActivityIndicator animating />
    return (
        <View Style={['flexRow', 'itemsCenter', 'p4', 'roundedMd', { backgroundColor: theme.primaryContainer }]}>
            <View Style={['flexColumn', 'expand', 'px2', 'rowGap2']}>
                <Text Weight="fontBold">{data?.authentication.username}</Text>
                <View Style={['flexRow', 'itemsCenter', 'gap2']}>
                    <Icon source={'account-group'} size={12} />
                    <Text>{currentType(data?.information.role)}</Text>
                </View>
            </View>
            <View>
                <Menu visible={visible} onDismiss={closeMenu} anchorPosition="bottom" anchor={<IconButton icon={'dots-vertical'} onPress={openMenu} />}>
                    <Menu.Item trailingIcon={'logout'} onPress={() => deleteUserID()} title="Logout" />
                </Menu>
            </View>
        </View>
    )
}

const profile = () => {
    return (
        <Section Style={['flexColumn', 'px2']}>
            <HeaderProfile />
        </Section>
    )
}

export default profile
