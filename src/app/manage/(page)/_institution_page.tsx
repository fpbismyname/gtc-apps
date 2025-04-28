import { ScrollView } from 'react-native'
import Button from '~/src/components/elements/Button'
import Image from '~/src/components/elements/Image'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import View from '~/src/components/elements/View'
import { styling } from '~/src/constants/styleSheets'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import useDelay from '~/src/hooks/utils/useDelay'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'
import { FlattenObject } from '~/src/utils/ObjectUtils'
import { IconButton, List } from 'react-native-paper'
import Dialog from '~/src/components/elements/Dialog'
import { useEffect, useState } from 'react'
import useCollection from '~/src/hooks/Firebase/useCollection'
import { useNotify } from '~/src/store/useNotify'
import { textAction } from '~/src/constants/textMessages'
import cleanWordFromNested from '~/src/utils/cleanWordFromNested'
import { getIconKey, getLabelKey } from '~/src/utils/defaultValueKeyorValue'

const InstitutionLayout = ({ datas }: { datas: InsitutionInformation }) => {
    // notify
    const { setNotifyValue } = useNotify()
    // Data Institution
    const institutionData = FlattenObject(datas)
        .filter(([key, val]) => key !== 'id' && key !== 'logo')
        .sort()
    const logo = FlattenObject(datas).filter(([key, val]) => key === 'logo')
    const DataInstitution = [...logo, ...institutionData]
    // Dialog States
    const [visible, setVisible] = useState<boolean>(false)
    const [keyData, setKeyData] = useState<string | ''>('')
    const [defaultValue, setDefaultValue] = useState<string | null>(null)
    // Check Key Data
    useEffect(() => {
        if (keyData) {
            const defaultValue = DataInstitution.find(([key, value]) => key === keyData)?.[1]
            setDefaultValue(defaultValue)
            setVisible(true)
        } else {
            setDefaultValue(null)
            setVisible(false)
        }
    }, [keyData])
    // Edit collection
    const { editData } = useCollection('MasterData/Institution/Profile')

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styling('p4')}>
            <List.Section style={styling('flexColumn', 'p2')}>
                {DataInstitution.map(([key, value]) => {
                    return (
                        key.includes('logo') && (
                            <View key={`header-logo-${key}`} Style={['flexRow', 'justifyCenter']}>
                                <View key={`item-image=${key}`} Style={['flexColumn', 'itemsCenter', 'gap4']}>
                                    <Image source={{ uri: value }} Height="h32" Width="w32" />
                                    <Button icon={'pencil'} onPress={() => setKeyData(key)}>
                                        Ganti logo
                                    </Button>
                                </View>
                            </View>
                        )
                    )
                })}
                <List.Section>
                    <List.Subheader>Institution Data</List.Subheader>
                    {DataInstitution.map(([key, value]) => {
                        return (
                            !key.includes('logo') &&
                            !key.includes('social_media') && (
                                <List.Item
                                    key={`institution-data-${key}`}
                                    style={styling('roundedXl')}
                                    left={(props) => <List.Icon {...props} icon={getIconKey(key)} />}
                                    title={value}
                                    description={getLabelKey(key)}
                                    onPress={() => ''}
                                    right={(props) => <IconButton {...props} icon={'pencil'} onPress={() => setKeyData(key)} />}
                                />
                            )
                        )
                    })}
                </List.Section>
                <List.Section>
                    <List.Subheader>Social Media</List.Subheader>
                    {DataInstitution.map(([key, value]) => {
                        const keySocialMedia = key.replace('social_media.', '')
                        return (
                            key.includes('social_media') && (
                                <List.Item
                                    key={`sosial-media-${key}`}
                                    style={styling('roundedXl')}
                                    left={(props) => <List.Icon {...props} icon={getIconKey(keySocialMedia)} />}
                                    title={value}
                                    description={getLabelKey(keySocialMedia)}
                                    onPress={() => ''}
                                    right={(props) => <IconButton {...props} icon={'pencil'} onPress={() => setKeyData(key)} />}
                                />
                            )
                        )
                    })}
                </List.Section>
            </List.Section>
            <Dialog
                children
                key={keyData}
                type={'form'}
                visible={visible}
                setVisible={setKeyData}
                defaultValue={defaultValue || ''}
                title={keyData}
                onSubmitFormDialog={async (values) => {
                    const submitEdit = await editData({ id: datas.id, values: values })
                    const keyValue = cleanWordFromNested(keyData)
                    if (submitEdit) {
                        setNotifyValue({ message: textAction.edit(getLabelKey(keyValue || ''), 'success'), type: 'success' })
                    } else {
                        setNotifyValue({ message: textAction.edit(getLabelKey(keyValue || ''), 'failed'), type: 'error' })
                    }
                }}
            />
        </ScrollView>
    )
}

const InstitutionPage = () => {
    const { datas, isLoading } = useCollectionRealTime({
        collectionPath: 'MasterData/Institution/Profile'
    })
    const loadingView = useDelay(isLoading)

    return (
        <View Style={['flexColumn', 'expand']}>
            {loadingView ? (
                <View Style={['flexColumn', 'justifyCenter', 'itemsCenter', 'expand']}>
                    <LoadingScreen children />
                </View>
            ) : (
                <InstitutionLayout datas={datas as InsitutionInformation} />
            )}
        </View>
    )
}

export default InstitutionPage
