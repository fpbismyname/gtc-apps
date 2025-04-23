import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { FC } from 'react'
import { Avatar, Chip, List } from 'react-native-paper'
import Button from '~/src/components/elements/Button'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useDelay from '~/src/hooks/utils/useDelay'
import useFetch from '~/src/hooks/utils/useFetch'
import { useUsers } from '~/src/store/useUsers'
import { Account } from '~/src/types/Firebase/Account'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'
import DefaultImage from '~/src/assets/images/profile/defaultProfile.png'
import { currentTypeRoles } from '~/src/utils/currentType'
import * as Linking from 'expo-linking'
import { styling } from '~/src/constants/styleSheets'
import { Platform, ScrollView } from 'react-native'

interface ProfilePage {
    fetchedData: DocumentDataWithID
    theme?: any
}

const onPlatform = Platform.OS

const HeaderProfile: FC<ProfilePage & { isLoading: boolean }> = ({ fetchedData, isLoading }) => {
    // Profile Datas
    const datas = fetchedData as Account
    // Checking Data
    if (isLoading || !datas || !datas.id) return
    // Theme
    const { themeWithTransparent, theme } = useTheme()
    // CurrentUser Roles
    const UserRoles = currentTypeRoles(datas.information.role)

    // Provide Headed profile
    return (
        <View Style={['flexRow', 'justifyCenter', 'gap2', 'p4', 'itemsCenter', 'roundedXl', { backgroundColor: themeWithTransparent['primaryContainer/50'] }]}>
            <View Style={['flexColumn', 'expand-2']}>
                <View Style={['flexRow', 'gap2', 'itemsCenter']}>
                    <View Style={['flexColumn']}>
                        <Avatar.Image source={datas.information.profile_picture ? { uri: datas.information.profile_picture } : DefaultImage} size={64} />
                    </View>
                    <View Style={['flexColumn', 'expand']}>
                        <Text variant="bodyLarge" Weight="fontBold" numberOfLines={1}>
                            {datas.authentication.username}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode="tail">
                            {datas.authentication.email}
                        </Text>
                    </View>
                </View>
            </View>
            <View Style={['flexColumn', 'expand']}>
                <View Style={['flexRow', 'itemsCenter', 'justifyEnd']}>
                    <View Style={['flexColumn', 'itemsCenter']}>
                        <Chip mode="flat" icon={UserRoles.icon} textStyle={{ color: theme.onTertiaryContainer }} style={{ backgroundColor: theme.tertiaryContainer }}>
                            {UserRoles.name}
                        </Chip>
                    </View>
                </View>
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

const ProfileList: FC<ProfilePage> = ({ fetchedData }) => {
    if (!fetchedData) return
    const dataUser = fetchedData as Account
    const userRole = dataUser.information.role
    return (
        <View Style={['flexRow']}>
            <ScrollView overScrollMode="never" showsVerticalScrollIndicator={onPlatform === 'android' ? true : false}>
                <List.Section style={styling('flexColumn', 'expand', 'roundedXl')}>
                    {userRole === 'user' || userRole === 'tier-1' || userRole === 'tier-2' ? (
                        <>
                            <List.Subheader>Membership & program pelatihan</List.Subheader>
                            <List.Item
                                style={styling('roundedXl')}
                                title="Gabung program pelatihan"
                                left={(props) => <List.Icon {...props} icon={'school' as IconNameType} />}
                                right={(props) => <List.Icon {...props} icon={'chevron-right' as IconNameType} />}
                                onPress={() => ''}
                            />
                            {userRole === 'user' ? (
                                <List.Item
                                    style={styling('roundedXl')}
                                    title="Gabung membership"
                                    left={(props) => <List.Icon {...props} icon={'star-box' as IconNameType} />}
                                    right={(props) => <List.Icon {...props} icon={'chevron-right' as IconNameType} />}
                                    onPress={() => ''}
                                />
                            ) : null}
                        </>
                    ) : null}
                    <List.Subheader>Pusat bantuan</List.Subheader>
                    <List.Item
                        style={styling('roundedXl')}
                        right={(props) => <List.Icon {...props} icon={'chevron-right' as IconNameType} />}
                        title="hubungi kami"
                        left={(props) => <List.Icon {...props} icon={'chat' as IconNameType} />}
                        onPress={() => Linking.openURL('https://wa.me/62895404545040')}
                    />
                </List.Section>
            </ScrollView>
        </View>
    )
}

const profile = () => {
    // Get User ID
    const { states: users } = useUsers()
    // AccountCollection
    const { getData } = useCollection('Account')
    // fetchData
    const { datas, isLoading } = useFetch('useFocusEffect', async () => {
        if (!users.user_id) return
        return await getData({ queryByDocId: users.user_id })
    })
    // Delay View
    const loadingView = useDelay(isLoading)
    return (
        <Section Style={['flexColumn', 'px4', 'gap4']}>
            {loadingView ? (
                <LoadingScreen children />
            ) : users.user_id ? (
                <>
                    <HeaderProfile isLoading={isLoading} fetchedData={datas as DocumentDataWithID} />
                    <ProfileList fetchedData={datas as DocumentDataWithID} />
                </>
            ) : (
                <NewUserView />
            )}
        </Section>
    )
}

export default profile
