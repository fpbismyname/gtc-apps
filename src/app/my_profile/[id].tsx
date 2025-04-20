import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Avatar, Chip, Dialog, Icon, IconButton, List, Portal } from 'react-native-paper'
import Section from '~/src/components/elements/Section'
import View from '~/src/components/elements/View'
import DefaultImage from '~/src/assets/images/profile/defaultProfile.png'
import useCollection from '~/src/hooks/Firebase/useCollection'
import useFetch from '~/src/hooks/utils/useFetch'
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
import Text from '~/src/components/elements/Text'

const MyProfile = ({ datas, theme }: { datas: Account; theme: any }) => {
    if (!datas) return
    const UserData = Object.entries(datas.authentication)
    const UserRoles = currentTypeRoles(datas.information.role) as { name: string; icon: string }
    const [prepareEditData, setPrepareEditData] = useState<{ [key: string]: string }>({})
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [keyData, setKeyData] = useState<string | null>(null)

    useEffect(() => {
        if (!keyData) {
            setShowEdit(false)
            setPrepareEditData({})
        }
        if (keyData) {
            setShowEdit(true)
            setPrepareEditData({ [keyData]: '' })
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
                        {UserData.sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => {
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
                        <Button icon={'trash-can'} onPress={() => ''}>
                            Hapus akun
                        </Button>
                    </View>
                </View>
            </View>
            <EditProfile visible={showEdit} title={keyData ? keyData : ''} onDismiss={setKeyData} editedValueData={prepareEditData} />
        </>
    )
}

const EditProfile = ({
    onDismiss,
    visible,
    title,
    editedValueData
}: {
    visible: boolean
    onDismiss: Dispatch<SetStateAction<string | null>>
    title?: string
    editedValueData: { [key: string]: string }
}) => {
    return (
        <Portal>
            <Dialog onDismiss={() => onDismiss(null)} visible={visible} style={styling('roundedXl')}>
                <Formik
                    initialValues={editedValueData}
                    validationSchema={ValidationSchema.RegisterField}
                    onSubmit={async (values) => {
                        console.log(values)
                    }}
                >
                    {({ handleSubmit, handleChange, errors: err, touched: submitted }) => (
                        <>
                            <Dialog.Content style={styling('gap4', 'py5')}>
                                <View style={styling('flexRow', 'itemsCenter', 'justifyCenter')}>
                                    {title ? <Text Weight="fontBold" variant="bodyLarge">{`Edit ${UpperCaseText(title)}`}</Text> : <ActivityIndicator animating />}
                                </View>
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
                                                error={submitted.password && err.password ? true : false}
                                                onChangeText={handleChange('password')}
                                                textContentType="password"
                                                rightItem={{
                                                    text: err.password && submitted.password ? err.password : ''
                                                }}
                                            />
                                        </>
                                    )}
                                </View>
                            </Dialog.Content>
                            <Dialog.Actions>
                                {title ? (
                                    <View Style={['flexRow', 'gap2']}>
                                        <Button mode="text" onPress={() => onDismiss(null)} icon={'arrow-left'}>
                                            Kembali
                                        </Button>
                                        <Button mode="text" onPress={() => handleSubmit()} icon={'pencil'}>
                                            Edit
                                        </Button>
                                    </View>
                                ) : null}
                            </Dialog.Actions>
                        </>
                    )}
                </Formik>
            </Dialog>
        </Portal>
    )
}

export default () => {
    // theme
    const { theme } = useTheme()
    // Get Params from navigating
    const { id } = useLocalSearchParams<LocalPushParams>()
    // Get User Data
    const { datas: fetchedData, isLoading } = useFetch('useEffect', async () => {
        return await getData({ queryByDocId: id })
    })
    // Users
    const Users = fetchedData as Account
    // Get Method Data
    const { getData } = useCollection('Account')
    // Set Loading View
    const loadingView = useDelay(isLoading)
    return (
        <Section Style={['flexColumn']}>{loadingView ? <LoadingScreen children /> : <>{id === Users.id && <MyProfile datas={fetchedData as Account} theme={theme} />}</>}</Section>
    )
}
