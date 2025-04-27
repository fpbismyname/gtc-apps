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
import { styling } from '~/src/constants/styleSheets'
import { checkKeyForDefaultValue, getIconKey, getLabelKey, getLinkKey } from '~/src/utils/defaultValueKeyorValue'
import AvatarImage from '~/src/components/elements/AvatarImage'

// Check Platform
const onPlatform = Platform.OS

const HeaderInstitution = ({ datas }: { datas: InsitutionInformation }) => {
    const DataInstitution = Object.entries(datas)
        .filter(([key]) => key !== 'social_media' && key !== 'id' && key !== 'logo' && key !== 'slogan' && key !== 'maps')
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    const DataSocialMedia = Object.entries(datas.social_media || {}).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    return (
        <>
            <View Style={['flexRow', 'itemsCenter', 'justifyCenter', 'gap4']}>
                <View Style={['flexColumn', 'gap6', 'itemsCenter', 'justifyCenter']}>
                    <View Style={['flexColumn', 'itemsCenter', 'justifyCenter']}>
                        <AvatarImage source={{ uri: datas.logo }} size={108} />
                    </View>
                    <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'gap4']}>
                        <Chip>{datas.name}</Chip>
                        <Text variant="bodySmall">{datas.slogan}</Text>
                    </View>
                </View>
            </View>
            <ScrollView overScrollMode="never" showsVerticalScrollIndicator={onPlatform === 'android' ? true : false}>
                <List.Subheader>Profil Lembaga</List.Subheader>
                {DataInstitution.map(([key, value]) => {
                    return (
                        <List.Item
                            key={key}
                            style={styling('roundedXl')}
                            title={value}
                            description={getLabelKey(key)}
                            left={(props) => <List.Icon {...props} icon={getIconKey(key)} />}
                            onPress={() => ''}
                        />
                    )
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
