import { DataTable, IconButton } from 'react-native-paper'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import View from '~/src/components/elements/View'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import useDelay from '~/src/hooks/utils/useDelay'
import { Account } from '~/src/types/Firebase/Account'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'
import index from '..'
import { Fragment } from 'react'
import Button from '~/src/components/elements/Button'

const getFromObject = (values: object | object[], whatToGet: 'key' | 'value') => {
    if (whatToGet === 'key') {
        const data = Object.keys(values)
        return data
    }
    if (whatToGet === 'value') {
        const data = Object.values(values)
        return data
    }
}
const AccountList = ({ datas }: { datas: DocumentDataWithID | DocumentDataWithID[] }) => {
    const account = Array.isArray(datas) ? (datas as Account[]) : (datas as Account)
    const authData = Array.isArray(account) ? account.map((data) => ({ id: data.id, ...data.authentication })) : { id: account.id, ...account.authentication }
    const Datas = Object.entries(authData)
    return (
        <View>
            <DataTable>
                {Datas.map(([key, value], index) => {
                    const keysTable = Object.keys(value)
                    const valuesTable = Object.values(value)

                    if (index < 1) {
                        return (
                            <Fragment key={key}>
                                <DataTable.Header key={`header-${index}`}>
                                    {keysTable.map((val, index) => (
                                        <DataTable.Title key={`title-${index}`}>{val}</DataTable.Title>
                                    ))}
                                    <DataTable.Title key={`title-${index}`}>Aksi</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row key={`row-${index}`}>
                                    {valuesTable.map((val, index) => (
                                        <DataTable.Cell key={`cell-row-${index}`}>{val as string}</DataTable.Cell>
                                    ))}
                                    <DataTable.Cell key={`cell-row-${index}`}>
                                        <IconButton key={`iconButton-${key}`} icon={'pencil'} />
                                        <IconButton key={`iconButton-${key + 1}`} icon={'trash-can'} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </Fragment>
                        )
                    } else {
                        return (
                            <DataTable.Row key={`row-${index}`}>
                                {valuesTable.map((val, index) => (
                                    <DataTable.Cell key={`cell-rows-${index}`}>{val as string}</DataTable.Cell>
                                ))}
                                <DataTable.Cell key={`cell-rows-${index}`}>Aksi</DataTable.Cell>
                            </DataTable.Row>
                        )
                    }
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
                <AccountList datas={datas || []} />
            )}
        </View>
    )
}

export default AccountPage
