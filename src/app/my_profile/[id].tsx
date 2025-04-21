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
import { useTheme } from '~/src/constants/useTheme'
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

const MyProfile = ({ datas, theme }: { datas: Account; theme: any }) => {
    if (!datas) return
    const UserData = Object.entries(datas.authentication)
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
            <View Style={['flexColumn', 'gap5']}>
                <View Style={['flexRow', 'itemsCenter', 'justifyCenter', 'py4']}>
                    <View Style={['flexColumn', 'itemsCenter', 'justifyCenter', 'gap10']}>
                        <Avatar.Image size={128} source={DefaultImage} />
                        <Chip mode="flat" icon={UserRoles.icon} textStyle={{ color: theme.onTertiaryContainer }} style={{ backgroundColor: theme.tertiaryContainer }}>
                            {UserRoles.name}
                        </Chip>
                    </View>
                </View>
                <View Style={['flexRow']}>
                    <List.Section style={styling('flexColumn', 'expand', 'columnGap4')} theme={theme}>
                        {UserData.sort(([a], [b]) => b.localeCompare(a)).map(([key, value]) => {
                            let keys = {
                                title: '',
                                icon: ''
                            }
                            if (key === 'email') keys = { title: 'Alamat email', icon: 'email' }
                            else if (key === 'password') keys = { title: 'Password', icon: 'asterisk' }
                            else if (key === 'username') keys = { title: 'Nama pengguna', icon: 'tag' }
                            else if (key === 'phone_number') keys = { title: 'Whatsapp / Telepon', icon: 'whatsapp' }
                            return (
                                <List.Item
                                    key={key}
                                    title={key === 'password' ? '************' : value}
                                    description={keys?.title}
                                    right={(props) => <IconButton icon={'chevron-right'} {...props} />}
                                    left={(props) => <IconButton icon={keys?.icon} {...props} />}
                                    onPress={() => setKeyData(key)}
                                />
                            )
                        })}
                    </List.Section>
                </View>
                <View Style={['flexRow', 'itemsCenter', 'justifyCenter']}>
                    <View Style={['flexColumn', 'itemsCenter', 'justifyCenter']}>
                        <Button icon={'trash-can'} onPress={() => setModalDelete(true)}>
                            Hapus akun
                        </Button>
                    </View>
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
    const { deleteAccount, isLoading: authLoading } = useAuth()
    const { editData, isLoading } = useCollection('Account')
    const { setNotifyValue } = useNotify()
    const [newPassword, setNewPassword] = useState<string | null>(null)
    const initialValuesForms = {
        [title || '']: ''
    }
    return (
        <Portal>
            <Notify />
            <Dialog onDismiss={() => editModal.setModalEdit(null)} visible={editModal.visible} style={styling('roundedXl')}>
                <Formik
                    initialValues={initialValuesForms}
                    validationSchema={ValidationSchema.RegisterFieldNoRequired}
                    onSubmit={async (values) => {
                        const editProfile = await editData({
                            id: idProfile,
                            field: `authentication.${title}`,
                            values: title === 'password' ? { ...values, newPassword: newPassword } : values[title || ''],
                            type: title === 'password' ? 'password' : 'text'
                        })
                        if (editProfile) {
                            editModal.setModalEdit(null)
                            setNotifyValue({ message: textMessages.editedAccountSuccess })
                        } else {
                            setNotifyValue({ message: title === 'password' ? textMessages.editedAccountFailedWrongPass : textMessages.editedAccountFailed })
                        }
                    }}
                >
                    {({ handleChange, errors: err, touched: submitted, submitForm }) => (
                        <>
                            <Dialog.Content style={styling('gap4', 'py5')}>
                                {title ? (
                                    <>
                                        <Dialog.Icon icon={'account-edit'} size={36} color={theme.onPrimaryContainer}></Dialog.Icon>
                                        <Dialog.Title style={styling('textCenter')}>{`Edit ${UpperCaseText(title)}`}</Dialog.Title>
                                    </>
                                ) : (
                                    <ActivityIndicator animating />
                                )}
                                <View Style={['flexColumn', 'gap2', 'py5']}>
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
                                            textContentType="telephoneNumber"
                                            mode="outlined"
                                            dense
                                            placeholder="Nomor Whatsapp"
                                            error={submitted.phone_number && err.phone_number ? true : false}
                                            onChangeText={handleChange('phone_number')}
                                            keyboardType="decimal-pad"
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
                            </Dialog.Content>
                            <Dialog.Actions>
                                {title ? (
                                    <View Style={['flexRow', 'gap2']}>
                                        <Button mode="text" onPress={() => editModal.setModalEdit(null)} icon={'arrow-left'} disabled={isLoading}>
                                            Kembali
                                        </Button>
                                        <Button mode="text" onPress={() => submitForm()} icon={'pencil'} disabled={isLoading} loading={isLoading}>
                                            Edit
                                        </Button>
                                    </View>
                                ) : null}
                            </Dialog.Actions>
                        </>
                    )}
                </Formik>
            </Dialog>
            <Dialog onDismiss={() => deleteModal.setModalDelete(false)} visible={deleteModal.visible} style={styling('roundedXl')}>
                <Dialog.Content>
                    <Text variant="bodyMedium" Weight="fontBold">
                        {textAction.delete(`akun ${username}`)}
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <View Style={['flexRow', 'gap2']}>
                        <Button mode="text" onPress={() => deleteModal.setModalDelete(false)} icon={'arrow-left'} disabled={authLoading}>
                            Kembali
                        </Button>
                        <Button mode="text" onPress={() => deleteAccount(idProfile)} icon={'pencil'} disabled={authLoading} loading={authLoading}>
                            Hapus
                        </Button>
                    </View>
                </Dialog.Actions>
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
