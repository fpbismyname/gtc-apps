import { DataTable, IconButton, Portal } from 'react-native-paper'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import View from '~/src/components/elements/View'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import useDelay from '~/src/hooks/utils/useDelay'
import { Account } from '~/src/types/Firebase/Account'
import { DocumentDataWithID } from '~/src/types/Firebase/DataTypeFirebase'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import { FlattenObject } from '~/src/utils/ObjectUtils'
import { UpperCaseText } from '~/src/utils/FormatText'
import { styling } from '~/src/constants/styleSheets'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import { Dialog as DG } from 'react-native-paper'
import Button from '~/src/components/elements/Button'
import TextInput from '~/src/components/elements/TextInput'
import cleanWordFromNested from '~/src/utils/cleanWordFromNested'
import { extractChildKey } from '~/src/utils/extractChildKey'
import useCollection from '~/src/hooks/Firebase/useCollection'
import { useNotify } from '~/src/store/useNotify'
import { textAction } from '~/src/constants/textMessages'

const AccountList = ({ datas }: { datas: DocumentDataWithID | DocumentDataWithID[] }) => {
    // Notify
    const { setNotifyValue } = useNotify()
    // collection Data account
    const { editData, deleteData, isLoading } = useCollection('Account')
    // Setup Datatable
    const account = Array.isArray(datas) ? (datas as Account[]) : [datas as Account]
    const amountAccount = Object.entries(account)
    // Theme
    const { themeWithTransparent: theme } = useTheme()
    // Get id data
    const [idData, setIdData] = useState<string | null>(null)
    // Get Id Account
    const [AccountData, setAccountData] = useState<Account | null>(null)
    // Modal states
    const [visible, setVisible] = useState<boolean>(false)
    // check id
    useEffect(() => {
        if (idData) {
            setVisible(true)
            const getAccount = amountAccount.find(([key, value]) => key === idData)
            if (getAccount) {
                const accountData = getAccount[1]
                setAccountData(accountData)
            }
        } else {
            setVisible(false)
        }
    }, [idData, AccountData])
    return (
        <View Style={['flexColumn', 'p4']}>
            <DataTable>
                {amountAccount.map(([key, value], index) => {
                    const idAccount = FlattenObject(value)
                        .sort()
                        .filter(([key, value]) => key === 'id')
                    const dataAccount = FlattenObject(value)
                        .sort()
                        .filter(([key, value]) => key !== 'id')
                    const account = [...idAccount, ...dataAccount]
                    const extractKey = extractChildKey(account, '.').filter(([key, value]) => key !== 'password' && key !== 'token')
                    const getId = () => {
                        setIdData(key)
                    }
                    if (index < 1) {
                        return (
                            <Fragment key={`dt-header-${index}`}>
                                <DataTable.Header key={`dt-header-${key}`} style={styling('roundedXl', 'itemsCenter', 'gap4', { backgroundColor: theme['primaryContainer/50'] })}>
                                    {extractKey.map(([key, value], index) => (
                                        <DataTable.Title key={`dt-title-${key}`} numberOfLines={2}>
                                            {UpperCaseText(key)}
                                        </DataTable.Title>
                                    ))}
                                    <DataTable.Title textStyle={styling('textSm')}>Action</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row key={`dt-row-${key}`} style={styling('roundedMd')} onPress={() => null}>
                                    {extractKey.map(([key, value]) => {
                                        return (
                                            <DataTable.Cell key={`dt-cell-${key}`} textStyle={styling('textSm')}>
                                                {typeof value === 'object' || !value ? '-' : value}
                                            </DataTable.Cell>
                                        )
                                    })}
                                    <DataTable.Cell key={`dt-cell-${key}`} textStyle={styling('textSm')}>
                                        <IconButton icon={'pencil'} onPress={getId} size={14} />
                                        <IconButton icon={'trash-can'} onPress={() => ''} size={14} />
                                    </DataTable.Cell>
                                </DataTable.Row>
                            </Fragment>
                        )
                    } else {
                        return (
                            <DataTable.Row key={`dt-row-${key}`} style={styling('roundedMd')} onPress={() => null}>
                                {extractKey.map(([key, value]) => {
                                    return (
                                        <DataTable.Cell key={`dt-cell-${key}`} textStyle={styling('textSm')}>
                                            {typeof value === 'object' || !value ? '-' : value}
                                        </DataTable.Cell>
                                    )
                                })}
                                <DataTable.Cell key={`dt-cell-${key}`} textStyle={styling('textSm')}>
                                    <IconButton icon={'pencil'} onPress={getId} size={14} />
                                    <IconButton icon={'trash-can'} onPress={() => ''} size={14} />
                                </DataTable.Cell>
                            </DataTable.Row>
                        )
                    }
                })}
                <DataTable.Pagination page={1} label={'1 dari 100 halaman'} numberOfPages={1} onPageChange={() => ''} />
            </DataTable>
            <DialogEdit
                visible={visible}
                setVisible={setIdData}
                datas={AccountData}
                onSubmitDialog={async (data) => {
                    const EditAccount = await editData({ id: AccountData?.id, values: data })
                    if (EditAccount) {
                        setNotifyValue({
                            message: textAction.edit(AccountData?.authentication.username || '', 'success'),
                            type: 'success'
                        })
                    } else {
                        setNotifyValue({
                            message: textAction.edit(AccountData?.authentication.username || '', 'failed'),
                            type: 'error'
                        })
                    }
                }}
            />
        </View>
    )
}

const DialogEdit = ({
    visible,
    setVisible,
    datas,
    onSubmitDialog
}: {
    visible: boolean
    setVisible: Dispatch<SetStateAction<any>>
    datas: any
    onSubmitDialog: (data: any) => void
}) => {
    // Setup Account
    const account = datas as Account
    const dataAccount = FlattenObject(datas)
        .filter(([key, value]) => key !== 'id' && key !== 'token' && key !== 'authentication.password')
        .sort()
    const [formAccount, setFormAccount] = useState<Record<string, any>>({})
    // Create Form account
    useEffect(() => {
        if (dataAccount.length) {
            const Datas = dataAccount.reduce((acc, [key, value]) => {
                acc[key] = value || ''
                return acc
            }, {} as Record<string, any>)
            setFormAccount(Datas)
        }
    }, [datas])
    // on Submit function
    const onSubmit = () => {
        onSubmitDialog(formAccount)
        setVisible(null)
    }
    return (
        <Portal>
            <DG visible={visible} style={styling('w25', 'selfCenter', 'roundedXl')}>
                {datas && (
                    <>
                        <DG.Icon icon={''} size={32} />
                        <DG.Title style={styling('selfCenter')}>{`Edit Data ${account.authentication.username}`}</DG.Title>
                        <DG.Content style={styling('gap4')}>
                            {dataAccount.map(([key, value]) => {
                                const titleTextInput = UpperCaseText(cleanWordFromNested(key) || '')
                                return (
                                    <TextInput
                                        key={`edit-data-account-${key}`}
                                        mode="outlined"
                                        label={titleTextInput}
                                        value={formAccount[key] ?? ''}
                                        onChangeText={(text) => setFormAccount((prev) => ({ ...prev, [key]: text }))}
                                    />
                                )
                            })}
                        </DG.Content>
                        <DG.Actions style={styling('justifyCenter', 'gap2')}>
                            <Button icon={'close' as IconNameType} onPress={() => setVisible(false)}>
                                Batal
                            </Button>
                            <Button icon={'check' as IconNameType} onPress={onSubmit}>
                                Submit
                            </Button>
                        </DG.Actions>
                    </>
                )}
            </DG>
        </Portal>
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
