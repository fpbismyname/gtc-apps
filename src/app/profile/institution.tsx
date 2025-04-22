import { ScrollView } from 'react-native'
import { Avatar, Chip, List } from 'react-native-paper'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import Section from '~/src/components/elements/Section'
import Text from '~/src/components/elements/Text'
import View from '~/src/components/elements/View'
import { styling } from '~/src/constants/styleSheets'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useDelay from '~/src/hooks/utils/useDelay'
import useFetch from '~/src/hooks/utils/useFetch'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'

const HeaderInstitution = ({ datas }: { datas: InsitutionInformation }) => {
    const { themeWithTransparent } = useTheme()
    const DataInstitution = Object.entries(datas)
    return (
        <>
            <View Style={['flexRow', 'itemsCenter', 'justifyCenter']}>
                <View Style={['flexColumn', 'gap4', 'itemsCenter', 'justifyCenter']}>
                    <Avatar.Image source={{ uri: datas.logo }} size={128} />
                    <Chip textStyle={{ color: themeWithTransparent.onTertiaryContainer }} style={{ backgroundColor: themeWithTransparent['tertiaryContainer/50'] }}>
                        {datas.name}
                    </Chip>
                </View>
            </View>
            <ScrollView>
                <List.Section>
                    {DataInstitution.map(([key, value]) => {
                        if (key === 'id') return null
                        if (typeof value === 'object' && value !== null) {
                            return Object.entries(value).map(([key, values]) => {
                                return (
                                    <List.Item
                                        key={key}
                                        title={values as string}
                                        description={key}
                                        left={(props) => <List.Icon {...props} icon={'asterisk' as IconNameType} />}
                                        right={(props) => <List.Icon {...props} icon={'chevron-right' as IconNameType} />}
                                        onPress={() => ''}
                                    />
                                )
                            })
                        }
                        return (
                            <List.Item
                                key={key}
                                title={value}
                                description={key}
                                left={(props) => <List.Icon {...props} icon={'asterisk' as IconNameType} />}
                                right={(props) => <List.Icon {...props} icon={'chevron-right' as IconNameType} />}
                                onPress={() => ''}
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
        <Section Style={['flexColumn']}>
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
