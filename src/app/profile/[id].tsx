import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Avatar, Chip, Dialog, Icon, IconButton, List, Portal } from 'react-native-paper'
import Section from '~/src/components/elements/Section'
import View from '~/src/components/elements/View'
import DefaultImage from '~/src/assets/images/profile/defaultProfile.png'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useDelay from '~/src/hooks/utils/useDelay'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import { Account } from '~/src/types/Firebase/Account'
import { styling } from '~/src/constants/styleSheets'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import { LocalPushParams } from '~/src/types/Navigation/navigationType'
import { currentTypeRoles } from '~/src/utils/currentType'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UpperCaseText } from '~/src/utils/FormatText'
import Button from '~/src/components/elements/Button'
import { Formik } from 'formik'
import { ValidationSchema } from '~/src/utils/ValidationSchema'
import TextInput from '~/src/components/elements/TextInput'
import { useNotify } from '~/src/store/useNotify'
import { textAction, textMessages } from '~/src/constants/textMessages'
import Notify from '~/src/components/elements/Notify'
import useCollectionRealTime from '~/src/hooks/Firebase/useCollectionRealTime'
import Text from '~/src/components/elements/Text'
import useAuth from '~/src/hooks/Auth/useAuth'
import { ScrollView } from 'react-native'

const accountInfoIconMap: Record<string, string> = {
    username: 'tag',
    email: 'email',
    password: 'asterisk',
    phone_number: 'whatsapp'
}
const accountInfoLabelMap: Record<string, string> = {
    username: 'Nama pengguna',
    email: 'Alamat email',
    password: 'Password',
    phone_number: 'No. Whatsapp'
}
const convertPassToAsterisk = (pass: string, length?: number) => {
    if (!pass) return null
    const password = '*'.repeat(length || 8)
    return password
}
const getAccountInfoIcon = (key: string) => accountInfoIconMap[key || ('information' as IconNameType)]
const getAccountInfoLabel = (key: string) => accountInfoLabelMap[key || ('information' as IconNameType)]

const MyProfile = ({ datas, theme }: { datas: Account; theme: any }) => {
    if (!datas) return
    const UserData = Object.entries(datas.authentication).sort(([keyA, keyB]) => keyB.localeCompare(keyA))
    const UserRoles = currentTypeRoles(datas.information.role) as { name: string; icon: string }
    // setup Modal variable
    const [modalEdit, setModalEdit] = useState<boolean>(false)
    const [modalDelete, setModalDelete] = useState<boolean>(false)
    const [keyData, setKeyData] = useState<string | null>(null)

    useEffect(() => {
        if (!keyData) {
            setModalEdit(false)
        }
        if (keyData) {
            setModalEdit(true)
        }
    }, [keyData])

    return (
        <>
            <View Style={['flexRow', 'itemsCenter', 'justifyCenter']}>
                <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'gap4']}>
                    <Avatar.Image size={108} source={DefaultImage} />
                    <View>
                        <Chip mode="flat" icon={UserRoles.icon} textStyle={{ color: theme.onTertiaryContainer }} style={{ backgroundColor: theme.tertiaryContainer }}>
                            {UserRoles.name}
                        </Chip>
                    </View>
                </View>
            </View>
            <View Style={['flexRow']}>
                <ScrollView>
                    <List.Section style={styling('flexColumn', 'expand', 'columnGap4')} theme={theme}>
                        {UserData.map(([key, value], index) => {
                            return (
                                <List.Item
                                    key={index}
                                    title={key === 'password' ? convertPassToAsterisk(value) : value}
                                    description={getAccountInfoLabel(key)}
                                    left={(props) => <IconButton icon={getAccountInfoIcon(key)} {...props} />}
                                    right={(props) => <IconButton icon={'chevron-right'} {...props} />}
                                    onPress={() => setKeyData(key)}
                                />
                            )
                        })}
                    </List.Section>
                </ScrollView>
            </View>
            <View Style={['flexRow', 'itemsCenter', 'justifyCenter']}>
                <View Style={['flexColumn', 'itemsCenter', 'justifyCenter']}>
                    <Button icon={'trash-can'} onPress={() => setModalDelete(true)}>
                        Hapus akun
                    </Button>
                </View>
            </View>
            <EditProfile
                theme={theme}
                username={datas.authentication.username}
                editModal={{
                    setModalEdit: setKeyData,
                    visible: modalEdit
                }}
                title={keyData}
                idProfile={datas.id}
                deleteModal={{
                    setModalDelete: setModalDelete,
                    visible: modalDelete
                }}
            />
        </>
    )
}

const EditProfile = ({
    title,
    editModal,
    deleteModal,
    idProfile,
    username,
    theme
}: {
    title: string | null
    editModal: {
        visible: boolean
        setModalEdit: Dispatch<SetStateAction<string | null>>
    }
    deleteModal: {
        visible: boolean
        setModalDelete: Dispatch<SetStateAction<boolean>>
    }
    idProfile?: string
    username: string
    theme: any
}) => {
    const { deleteAccount, editAccount, isLoading: authLoading } = useAuth()
    const { setNotifyValue } = useNotify()
    const [newPassword, setNewPassword] = useState<string | null>(null)
    const initialValuesForms = {
        [title || '']: ''
    }
    return (
        <Portal>
            <Notify />
            <Dialog onDismiss={() => editModal.setModalEdit(null)} visible={editModal.visible} style={styling('roundedXl')}>
                <Dialog.Content style={styling('gap4')}>
                    <Formik
                        initialValues={initialValuesForms}
                        validationSchema={ValidationSchema.RegisterFieldNoRequired}
                        onSubmit={async (values) => {
                            const editProfile = await editAccount({
                                id: idProfile || '',
                                field: `authentication.${title}`,
                                values: title === 'password' ? { ...values, newPassword: newPassword } : values[title || ''],
                                type: title === 'password' ? 'password' : 'text'
                            })
                            if (editProfile) {
                                editModal.setModalEdit(null)
                                setNotifyValue({ message: textMessages.editedAccountSuccess })
                            } else if (!editProfile) {
                                if (!values[title || ''] || !newPassword) {
                                    setNotifyValue({ message: textAction.edit('isEmpty'), type: 'info' })
                                } else {
                                    setNotifyValue({ message: title === 'password' ? textMessages.editedAccountFailedWrongPass : textMessages.editedAccountFailed })
                                }
                            }
                        }}
                    >
                        {({ handleChange, errors: err, touched: submitted, submitForm }) => (
                            <>
                                <View Style={['flexColumn', 'gap6']}>
                                    {title ? (
                                        <>
                                            <View Style={['flexRow', 'justifyCenter', 'itemsCenter', 'gap2']}>
                                                <Icon source={getAccountInfoIcon(title)} size={36} color={theme.onPrimaryContainer} />
                                                <Text variant="headlineSmall">{`Edit ${UpperCaseText(title === 'phone_number' ? 'whatsapp' : title)}`}</Text>
                                            </View>
                                        </>
                                    ) : (
                                        <ActivityIndicator animating />
                                    )}
                                    <View Style={['flexColumn', 'gap2']}>
                                        {title === 'username' && (
                                            <TextInput
                                                textContentType="username"
                                                mode="outlined"
                                                placeholder="Username"
                                                error={submitted.username && err.username ? true : false}
                                                onChangeText={handleChange('username')}
                                                keyboardType="default"
                                                rightItem={{
                                                    text: err.username && submitted.username ? err.username : ''
                                                }}
                                            />
                                        )}
                                        {title === 'phone_number' && (
                                            <TextInput
                                                textContentType="none"
                                                mode="outlined"
                                                placeholder="Nomor Whatsapp"
                                                error={submitted.phone_number && err.phone_number ? true : false}
                                                onChangeText={handleChange('phone_number')}
                                                keyboardType="number-pad"
                                                rightItem={{
                                                    text: err.phone_number && submitted.phone_number ? err.phone_number : ''
                                                }}
                                            />
                                        )}
                                        {title === 'email' && (
                                            <TextInput
                                                textContentType="emailAddress"
                                                mode="outlined"
                                                placeholder="Email"
                                                error={submitted.email && err.email ? true : false}
                                                onChangeText={handleChange('email')}
                                                keyboardType="default"
                                                rightItem={{
                                                    text: err.email && submitted.email ? err.email : ''
                                                }}
                                            />
                                        )}
                                        {title === 'password' && (
                                            <>
                                                <TextInput
                                                    mode="outlined"
                                                    placeholder="Password lama"
                                                    error={submitted.password && err.password ? true : false}
                                                    onChangeText={handleChange('password')}
                                                    textContentType="password"
                                                    rightItem={{
                                                        text: err.password && submitted.password ? err.password : ''
                                                    }}
                                                />
                                                <TextInput
                                                    mode="outlined"
                                                    placeholder="Password baru"
                                                    error={submitted.newPassword && err.newPassword ? true : false}
                                                    onChangeText={(value) => setNewPassword(value)}
                                                    textContentType="password"
                                                    rightItem={{
                                                        text: err.newPassword && submitted.newPassword ? err.newPassword : ''
                                                    }}
                                                />
                                            </>
                                        )}
                                    </View>
                                    <View Style={['flexRow', 'gap2', 'itemsCenter', 'justifyCenter']}>
                                        {title ? (
                                            <>
                                                <Button mode="text" onPress={() => editModal.setModalEdit(null)} icon={'arrow-left'} disabled={authLoading}>
                                                    Kembali
                                                </Button>
                                                <Button mode="text" onPress={() => submitForm()} icon={'pencil'} disabled={authLoading} loading={authLoading}>
                                                    Edit
                                                </Button>
                                            </>
                                        ) : null}
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
                </Dialog.Content>
            </Dialog>
            <Dialog onDismiss={() => deleteModal.setModalDelete(false)} visible={deleteModal.visible} style={styling('roundedXl')}>
                <Dialog.Content>
                    <View Style={['flexColumn', 'gap6', 'itemsCenter', 'justifyCenter']}>
                        <Text variant="bodyMedium" Weight="fontBold" Style={['textCenter']}>
                            {textAction.delete(`akun ${username}`)}
                        </Text>
                        <View Style={['flexRow', 'gap2']}>
                            <Button mode="text" onPress={() => deleteModal.setModalDelete(false)} icon={'arrow-left'} disabled={authLoading}>
                                Kembali
                            </Button>
                            <Button mode="text" onPress={() => deleteAccount(idProfile)} icon={'pencil'} disabled={authLoading} loading={authLoading}>
                                Hapus
                            </Button>
                        </View>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export default () => {
    // theme
    const { theme } = useTheme()
    // Get Params from navigating
    const { id } = useLocalSearchParams<LocalPushParams>()
    // Fetch account data
    const { datas: fetchedData, isLoading } = useCollectionRealTime('Account', { queryByDocId: id })
    // Users
    const Users = fetchedData as Account
    // Set Loading View
    const loadingView = useDelay(isLoading)
    return (
        <>
            <Section Style={['flexColumn']}>
                {loadingView || !fetchedData ? <LoadingScreen children /> : <>{id === Users.id && <MyProfile datas={fetchedData as Account} theme={theme} />}</>}
            </Section>
        </>
    )
}
