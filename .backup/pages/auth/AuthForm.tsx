import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Formik } from 'formik'
import Image from '~/src/components/elements/Image'
import View from '~/src/components/elements/View'
import TextInput from '~/src/components/elements/TextInput'
import { ActivityIndicator, Icon, Surface } from 'react-native-paper'
import Button from '~/src/components/elements/Button'
import Text from '~/src/components/elements/Text'
import { styling } from '~/src/constants/styleSheets'
import useCollection from '~/src/hooks/Firebase/useCollection'
import { InsitutionInformation } from '~/src/types/Firebase/MasterData/InsitutionInformation'
import { ValidationSchema } from '~/src/utils/ValidationSchema'
import Link from '~/src/components/elements/Link'
import LoadingScreen from '~/src/components/elements/LoadingScreen'

// Header Auth Form
interface HeaderForm {
    institution_information: {
        name: string
        slogan: string
    }
}

const HeaderForm = ({ data, loading }: { data?: Partial<InsitutionInformation> | null; loading: boolean }) => {
    if (loading) return <ActivityIndicator />
    return (
        <View Style={['itemsCenter', 'rowGap4']}>
            <View Style={['itemsCenter']}>
                <Image source={{ uri: data?.logo }} Width="w20" Height="h20" />
            </View>
            <View Style={['itemsCenter', 'rowGap2']}>
                <Text variant="headlineSmall" Weight="fontBlack" Decoration="capitalize">
                    {data?.name}
                </Text>
                <Text>{data?.slogan}</Text>
            </View>
        </View>
    )
}

// View Form Register
const FormRegister: FC<{ setLoad: Dispatch<SetStateAction<boolean>> }> = ({ setLoad }) => {
    return (
        <Formik
            initialValues={{
                username: '',
                phone_number: '',
                email: '',
                password: ''
            }}
            validationSchema={ValidationSchema.RegisterField}
            onSubmit={(values) => {
                console.log(values)
            }}
        >
            {({ handleSubmit, handleChange, errors: err, touched: submitted, isValid }) => (
                <View Style={['rowGap4']}>
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
                    <TextInput
                        textContentType="emailAddress"
                        mode="outlined"
                        placeholder="Email"
                        error={submitted.email && err.email ? true : false}
                        onChangeText={handleChange('email')}
                        keyboardType="email-address"
                        rightItem={{
                            text: err.email && submitted.email ? err.email : ''
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        placeholder="Password"
                        error={submitted.password && err.password ? true : false}
                        onChangeText={handleChange('password')}
                        secureTextEntry={true}
                        textContentType="password"
                        rightItem={{
                            text: err.password && submitted.password ? err.password : ''
                        }}
                    />
                    <Button mode="contained" onPress={() => setLoad((prev) => !prev)} disabled={!isValid}>
                        Daftar
                    </Button>
                </View>
            )}
        </Formik>
    )
}

// View Form Login
const FormLogin: FC<{ setLoad: Dispatch<SetStateAction<boolean>> }> = ({ setLoad }) => {
    return (
        <View style={styling()}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={ValidationSchema.LoginField}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ handleSubmit, handleChange, errors: err, touched: submitted, isValid }) => (
                    <View Style={['rowGap4']}>
                        <TextInput
                            error={err.email && submitted.email ? true : false}
                            mode="outlined"
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            rightItem={{
                                text: err.email && submitted.email ? err.email : ''
                            }}
                        />
                        <TextInput
                            mode="outlined"
                            placeholder="Password"
                            error={err.password && submitted.password ? true : false}
                            onChangeText={handleChange('password')}
                            rightItem={{
                                text: err.password && submitted.password ? err.password : ''
                            }}
                        />
                        <Button mode="contained" onPress={() => setLoad((prev) => !prev)} disabled={!isValid}>
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
    // AuthMethod
    const [formChange, setFormChange] = useState<boolean>(false)
    // Institution data
    const { data, error, isLoading, action } = useCollection('MasterData/Institution/Profile')
    // LoadingSet
    const [loadingScreen, setLoadingScreen] = useState<boolean>(false)
    return (
        <>
            {loadingScreen ? <LoadingScreen Style={['']} children /> : null}
            <View Style={['expand', 'rowGap8', 'px5', 'justifyCenter']}>
                <HeaderForm data={{ ...data }} loading={isLoading} />
                {formChange ? <FormRegister setLoad={setLoadingScreen} /> : <FormLogin setLoad={setLoadingScreen} />}
                <AuthChangeMethod changeAuth={setFormChange} auth={formChange} />
            </View>
        </>
    )
}

export default AuthForm
