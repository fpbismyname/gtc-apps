import { act, Dispatch, FC, memo, SetStateAction, useEffect, useState } from 'react'
import { Formik } from 'formik'
import Image from '~/src/components/elements/Image'
import View from '~/src/components/elements/View'
import TextInput from '~/src/components/elements/TextInput'
import Button from '~/src/components/elements/Button'
import Text from '~/src/components/elements/Text'
import { styling } from '~/src/constants/styleSheets'
import useCollection from '~/src/hooks/Firebase/useCollection'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'
import { ValidationSchema } from '~/src/utils/ValidationSchema'
import Link from '~/src/components/elements/Link'
import useAuth from '~/src/hooks/Auth/useAuth'
import Section from '~/src/components/elements/Section'
import useFetch from '~/src/hooks/utils/useFetch'
import useDelay from '~/src/hooks/utils/useDelay'
import LoadingScreen from '~/src/components/elements/LoadingScreen'
import Notify from '~/src/components/elements/Notify'
import { IconButton } from 'react-native-paper'
import { router } from 'expo-router'

// Header Auth Form
interface HeaderForm {
    datas: InsitutionInformation
}

const HeaderForm: FC<HeaderForm> = ({ datas }) => {
    return (
        <View Style={['itemsCenter', 'rowGap4']}>
            {/* BackButton */}
            <View Style={['itemsCenter']}>
                <Image source={{ uri: datas?.logo }} Width="w20" Height="h20" />
            </View>
            <View Style={['itemsCenter', 'rowGap2']}>
                <Text variant="headlineSmall" Weight="fontBlack" Decoration="capitalize">
                    {datas?.name}
                </Text>
                <Text>{datas?.slogan}</Text>
            </View>
        </View>
    )
}

// View Form Register
const FormRegister = () => {
    const { signUpAccount, isLoading } = useAuth()
    return (
        <Formik
            initialValues={{
                username: '',
                phone_number: '',
                email: '',
                password: ''
            }}
            validationSchema={ValidationSchema.RegisterField}
            validateOnMount={true}
            onSubmit={(values) => {
                signUpAccount(values)
            }}
        >
            {({ handleSubmit, handleChange, errors: err, touched: submitted, values }) => (
                <View Style={['rowGap4', 'flexColumn']}>
                    <TextInput
                        textContentType="username"
                        mode="outlined"
                        placeholder="Username"
                        error={submitted.username && err.username ? true : false}
                        onChangeText={handleChange('username')}
                        keyboardType="default"
                        value={values.username}
                        rightItem={{
                            text: err.username && submitted.username ? err.username : ''
                        }}
                    />
                    <TextInput
                        textContentType="none"
                        mode="outlined"
                        dense
                        placeholder="Nomor Whatsapp"
                        error={submitted.phone_number && err.phone_number ? true : false}
                        onChangeText={handleChange('phone_number')}
                        keyboardType="number-pad"
                        value={values.phone_number}
                        rightItem={{
                            text: err.phone_number && submitted.phone_number ? err.phone_number : ''
                        }}
                    />
                    <TextInput
                        textContentType="emailAddress"
                        mode="outlined"
                        placeholder="Email"
                        error={submitted.email && err.email ? true : false}
                        onChangeText={handleChange('email')}
                        keyboardType="default"
                        value={values.email}
                        rightItem={{
                            text: err.email && submitted.email ? err.email : ''
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Password"
                        error={submitted.password && err.password ? true : false}
                        onChangeText={handleChange('password')}
                        textContentType="password"
                        value={values.password}
                        rightItem={{
                            text: err.password && submitted.password ? err.password : ''
                        }}
                    />
                    <Button onPress={() => handleSubmit()} loading={isLoading} disabled={isLoading}>
                        Daftar
                    </Button>
                </View>
            )}
        </Formik>
    )
}

// View Form Login
const FormLogin = () => {
    const { isLoading, signInAccount } = useAuth()
    return (
        <View style={styling()}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={ValidationSchema.LoginField}
                validateOnMount={true}
                onSubmit={(values) => {
                    signInAccount(values)
                }}
            >
                {({ handleSubmit, handleChange, errors: err, touched: submitted, values }) => (
                    <View Style={['rowGap4', 'flexColumn']}>
                        <TextInput
                            error={err.email && submitted.email ? true : false}
                            mode="outlined"
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            textContentType="emailAddress"
                            keyboardType="default"
                            value={values.email}
                            rightItem={{
                                text: err.email && submitted.email ? err.email : ''
                            }}
                        />
                        <TextInput
                            mode="outlined"
                            secureTextEntry={true}
                            textContentType="password"
                            keyboardType="default"
                            placeholder="Password"
                            error={err.password && submitted.password ? true : false}
                            onChangeText={handleChange('password')}
                            value={values.password}
                            rightItem={{
                                text: err.password && submitted.password ? err.password : ''
                            }}
                        />
                        <Button onPress={() => handleSubmit()} loading={isLoading} disabled={isLoading}>
                            Login
                        </Button>
                    </View>
                )}
            </Formik>
        </View>
    )
}

// View Method auth change
const AuthChangeMethod: FC<{ changeAuth: Dispatch<SetStateAction<boolean>>; auth: boolean }> = ({ auth, changeAuth }) => {
    return (
        <View Style={['flexRow', 'justifyCenter']}>
            <Text>{auth ? 'Sudah punya akun ? ' : 'Belum punya akun ? '}</Text>
            <Link onPress={() => changeAuth((prev) => !prev)} Decoration="underline">
                {auth ? 'Login ke akun' : 'Daftar sekarang'}
            </Link>
        </View>
    )
}

// Auth Form
const AuthForm: FC = () => {
    // Change Form auth method
    const [formChange, setFormChange] = useState<boolean>(false)
    // Institution data
    const { getData } = useCollection('MasterData/Institution/Profile')
    // States Data
    const { datas: fetchedData, isLoading } = useFetch('useEffect', async () => await getData())
    // Loading view
    const loadingView = useDelay(isLoading)
    return (
        <Section Style={['expand', 'flexColumn', 'rowGap8', 'px5', 'justifyCenter']}>
            {loadingView ? (
                <LoadingScreen children />
            ) : (
                <>
                    <HeaderForm datas={fetchedData as InsitutionInformation} />
                    {formChange ? <FormRegister /> : <FormLogin />}
                    <AuthChangeMethod changeAuth={setFormChange} auth={formChange} />
                </>
            )}
        </Section>
    )
}

const auth = () => {
    return (
        <>
            <AuthForm />
        </>
    )
}

export default auth
