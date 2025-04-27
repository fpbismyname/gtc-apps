import { Chip, ChipProps, DataTable, List } from 'react-native-paper'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import View from '~/src/components/elements/View'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import useDelay from '~/src/hooks/utils/useDelay'
import { Account } from '~/src/types/Firebase/Account'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'
import { FC, Fragment } from 'react'
import { FlattenObject } from '~/src/utils/ObjectUtils'
import { UpperCaseText } from '~/src/utils/FormatText'
import Text from '~/src/components/elements/Text'
import { styling } from '~/src/constants/styleSheets'
import { ScrollView } from 'react-native'

const AccountList = ({ datas }: { datas: DocumentDataWithID | DocumentDataWithID[] }) => {
    const account = Array.isArray(datas) ? (datas as Account[]) : (datas as Account)
    const amountAccount = Object.entries(account)

    return (
        <View>
            <DataTable>
                {amountAccount.map(([key, value], index) => {
                    const id = FlattenObject(value).filter(([data]) => data === 'id')
                    const valueData = FlattenObject(value).filter(([data]) => data !== 'token' && data !== 'password' && data !== 'id')
                    const values = [...id, ...valueData]
                    const keys = Object.keys(value)
                    if (index < 1) {
                        return (
                            <Fragment key={`frag-${key}`}>
                                <DataTable.Header key={`header-${keys}`}>
                                    {values.map(([key]) => {
                                        return <DataTable.Title key={`table-cell-${key}`}>{UpperCaseText(key)}</DataTable.Title>
                                    })}
                                </DataTable.Header>
                                <DataTable.Row>
                                    {values.map(([key, val]) => {
                                        if (typeof val === 'object') {
                                            const dataModule = FlattenObject(val).filter(([key]) => key === 'module_name')
                                            console.log(dataModule)
                                            return (
                                                <DataTable.Cell key={`table-cell-${key}`}>
                                                    {dataModule.map(([key, value]) => {
                                                        return <AccountModuleList key={`module-list-${value}`} label={value} />
                                                    })}
                                                </DataTable.Cell>
                                            )
                                        } else {
                                            return <DataTable.Cell key={`table-cell-${key}`}>{val || '-'}</DataTable.Cell>
                                        }
                                    })}
                                </DataTable.Row>
                            </Fragment>
                        )
                    }
                })}
            </DataTable>
        </View>
    )
}

const AccountModuleList = ({ label }: { label: string }) => {
    return (
        <ScrollView>
            <List.Section>
                <List.Item title={label} />
            </List.Section>
        </ScrollView>
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
