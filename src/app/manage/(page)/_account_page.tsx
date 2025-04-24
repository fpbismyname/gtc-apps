import { DataTable } from 'react-native-paper'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import View from '~/src/components/elements/View'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import useDelay from '~/src/hooks/utils/useDelay'
import { Account } from '~/src/types/Firebase/Account'

const AccountList = ({ datas }: { datas: Account | Account[] }) => {
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
                {allData.map(([key]) => {
                    return (
                        <DataTable.Row key={key}>
                            {keysTable.map(([key, value]) => {
                                if (key === 'token') return
                                const dataCell = Object.entries(value)
                                if (typeof value === 'object') {
                                    return <DataTable.Cell key={key}>{JSON.stringify(value)}</DataTable.Cell>
                                }
                                return <DataTable.Cell key={key}>{value}</DataTable.Cell>
                            })}
                        </DataTable.Row>
                    )
                })}
            </DataTable>
        </View>
    )
}

const AccountPage = () => {
    const { datas, isLoading } = useCollectionRealTime({
        collectionPath: 'Account'
    })
    const loadingView = useDelay(isLoading)

    return (
        <View Style={['flexColumn', 'expand']}>
            {loadingView ? (
                <View Style={['flexColumn', 'justifyCenter', 'itemsCenter', 'expand']}>
                    <LoadingScreen children />
                </View>
            ) : (
                <AccountList datas={datas as Account | Account[]} />
            )}
        </View>
    )
}

export default AccountPage
