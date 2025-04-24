import { DataTable } from 'react-native-paper'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import View from '~/src/components/elements/View'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import useDelay from '~/src/hooks/utils/useDelay'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'

const InstitutionList = ({ datas }: { datas: InsitutionInformation }) => {
    const keysTable = Object.entries(Array.isArray(datas) ? datas?.[0] : datas)
    const allData = Object.entries(datas)
    return (
        <View>
            <DataTable>
                <DataTable.Header>
                    {keysTable.map(([key]) => {
                        if (key === 'token') return
                        return <DataTable.Title key={key}>{key}</DataTable.Title>
                    })}
                </DataTable.Header>
                <DataTable.Row>
                    {allData.map(([key, value]) => {
                        if (typeof value === 'object') return
                        return <DataTable.Cell key={key}>{value}</DataTable.Cell>
                    })}
                </DataTable.Row>
            </DataTable>
        </View>
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
                <InstitutionList datas={datas as InsitutionInformation} />
            )}
        </View>
    )
}

export default InstitutionPage
