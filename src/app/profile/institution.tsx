import { Platform, ScrollView } from 'react-native'
import { Avatar, Chip, List } from 'react-native-paper'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useDelay from '~/src/hooks/utils/useDelay'
import useFetch from '~/src/hooks/utils/useFetch'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'
import * as Linking from 'expo-linking'
import { styling } from '~/src/constants/styleSheets'

// ICon & label maps
const iconKeyMap: Record<string, string> = {
    established_at: 'calendar-check',
    email: 'email-outline',
    slogan: 'format-quote-close',
    social_media: 'share-variant',
    name: 'office-building',
    logo: 'image-outline',
    address: 'map-marker',
    maps: 'google-maps',
    instagram: 'instagram',
    phone_number: 'whatsapp',
    website: 'web'
}
const titleLabelMap: Record<string, string> = {
    established_at: 'Didirikan pada',
    email: 'Email',
    slogan: 'Slogan',
    social_media: 'Media Sosial',
    name: 'Nama Institusi',
    logo: 'Logo',
    address: 'Alamat',
    maps: 'Lokasi lembaga',
    instagram: 'Instagram',
    phone_number: 'No. WhatsApp',
    website: 'Website Resmi'
}
const linkInstitution: Record<string, (value: string) => void> = {
    email: (value: string) => Linking.openURL(`mailto:${value}`),
    maps: (value: string) => {
        Linking.openURL(value)
    },
    instagram: (value: string) => Linking.openURL(`https://instagram.com/${value.replace('@', '')}`),
    phone_number: (value: string) => {
        const phoneNumber = value.replace(/^0/, '62')
        Linking.openURL(`https://wa.me/${phoneNumber}`)
    },
    website: (value: string) => Linking.openURL(`https://${value}`)
}
const getLinkKey = (key: string, value: string) => {
    linkInstitution[key]?.(value)
}
const getIconKey = (key: string) => iconKeyMap[key] || 'information-outline'
const getLabelKey = (key: string) => titleLabelMap[key] || 'informasi'
const checkKeyForDefaultValue = (key: string, value: string) => {
    if (key === 'maps') return 'Klik untuk cek lokasinya'
    return value
}

// Check Platform
const onPlatform = Platform.OS

const HeaderInstitution = ({ datas }: { datas: InsitutionInformation }) => {
    const { themeWithTransparent } = useTheme()
    const DataInstitution = Object.entries(datas)
        .filter(([key]) => key !== 'social_media' && key !== 'id' && key !== 'logo' && key !== 'slogan' && key !== 'maps')
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    const DataSocialMedia = Object.entries(datas.social_media || {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    return (
        <>
            <View Style={['flexRow', 'itemsCenter', 'justifyCenter', 'gap4']}>
                <View Style={['flexColumn', 'gap6', 'itemsCenter', 'justifyCenter']}>
                    <View Style={['flexColumn', 'itemsCenter', 'justifyCenter']}>
                        <Avatar.Image source={{ uri: datas.logo }} size={108} />
                    </View>
                    <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'gap4']}>
                        <Chip textStyle={{ color: themeWithTransparent.onTertiaryContainer }} style={{ backgroundColor: themeWithTransparent['tertiaryContainer/50'] }}>
                            {datas.name}
                        </Chip>
                        <Text variant="bodySmall">{datas.slogan}</Text>
                    </View>
                </View>
            </View>
            <ScrollView overScrollMode="never" showsVerticalScrollIndicator={onPlatform === 'android' ? true : false}>
                <List.Section>
                    <List.Subheader>Profil Lembaga</List.Subheader>
                    {DataInstitution.map(([key, value]) => {
                        return <List.Item key={key} title={value} description={getLabelKey(key)} left={(props) => <List.Icon {...props} icon={getIconKey(key)} />} />
                    })}
                    <List.Subheader>Media sosial kami</List.Subheader>
                    {DataSocialMedia.map(([key, value]) => {
                        return (
                            <List.Item
                                key={key}
                                style={styling('roundedXl')}
                                title={checkKeyForDefaultValue(key, value)}
                                description={getLabelKey(key)}
                                left={(props) => <List.Icon {...props} icon={getIconKey(key)} />}
                                right={(props) => <List.Icon {...props} icon={'chevron-right' as IconNameType} />}
                                onPress={() => getLinkKey(key, value)}
                            />
                        )
                    })}
                </List.Section>
            </ScrollView>
        </>
    )
}
const Institution = () => {
    const { getData } = useCollection('MasterData/Institution/Profile')
    const { datas, isLoading } = useFetch('useEffect', async () => {
        return await getData()
    })
    const loadingView = useDelay(isLoading)
    return (
        <Section Style={['flexColumn', 'gap5', 'mb2', 'px4']}>
            {loadingView ? (
                <LoadingScreen children />
            ) : (
                <>
                    <HeaderInstitution datas={datas as InsitutionInformation} />
                </>
            )}
        </Section>
    )
}

export default Institution
