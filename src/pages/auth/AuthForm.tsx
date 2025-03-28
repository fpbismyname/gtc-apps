import React from 'react'
import Section from '../../components/Elements/Section'
import Text from '../../components/Elements/Text'
import Gtcicon from '~/src/assets/images/gtc_icon_outline.png'
import Image from '../../components/Elements/Image'
import TextInput from '../../components/Elements/TextInput'
import Button from '../../components/Elements/Button'
import Link from '../../components/Elements/Link'
import useAuth from '~/src/hooks/Auth/useAuth'
import { sizeType } from '~/src/types/otherTypes/typeStyle'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { inputMessage } from '~/src/types/authType/AuthInterface'
import { AuthSignIn, AuthSignUp } from '~/src/types/authType/authType'
import Notify from '~/src/components/Elements/Notify'
// Card Auth Form
const CardForm: React.FC<{ children: React.ReactNode; gap: sizeType }> = ({ children, gap }) => {
    return (
        <Section color="light" direction="column" gap={gap} customStyle="justify-center" expand>
            {children}
        </Section>
    )
}

// Header Auth Form
const HeaderForm: React.FC = () => {
    return (
        <Section customStyle="items-center" gap="sm">
            <Image imageSource={Gtcicon} size="md" />
            <Section gap="sm">
                <Text weight="bolder" size="2xl" customStyle="text-center">
                    Gading Training Center
                </Text>
                <Text weight="normal" size="sm" customStyle="text-center">
                    Raih kesuksesan mu bersama kami.
                </Text>
            </Section>
        </Section>
    )
}
// Validation Auth Schema
const ValidationSchema = {
    Register: Yup.object().shape({
        username: Yup.string().required(inputMessage.signUp.username.required).min(2, inputMessage.signUp.username.min).max(50, inputMessage.signUp.username.max),
        phone_number: Yup.number().typeError(inputMessage.signUp.phone_number.typeError).required(inputMessage.signUp.phone_number.required),
        email: Yup.string()
            .required(inputMessage.signUp.email.required)
            .email(inputMessage.signUp.email.email)
            .min(4, inputMessage.signUp.email.min)
            .max(50, inputMessage.signUp.email.max),
        password: Yup.string().required(inputMessage.signUp.password.required).min(4, inputMessage.signUp.password.min).max(50, inputMessage.signUp.password.max)
    }),
    Login: Yup.object().shape({
        email: Yup.string()
            .required(inputMessage.signUp.email.required)
            .email(inputMessage.signUp.email.email)
            .min(4, inputMessage.signUp.email.min)
            .max(50, inputMessage.signUp.email.max),
        password: Yup.string().required(inputMessage.signUp.password.required).min(4, inputMessage.signUp.password.min).max(50, inputMessage.signUp.password.max)
    })
}

// View Form Register
const FormRegister: React.FC = () => {
    // Auth Check
    const { authSignUp } = useAuth()
    return (
        <Section padding="md" gap="sm">
            <Formik
                initialValues={{
                    username: '',
                    phone_number: '',
                    email: '',
                    password: ''
                }}
                validationSchema={ValidationSchema.Register}
                onSubmit={(values: AuthSignUp) => {
                    authSignUp(values)
                }}
            >
                {({ handleSubmit, handleChange, values, errors }) => (
                    <>
                        <TextInput
                            placeholder="Username"
                            size="md"
                            color={errors.username ? 'danger' : 'dark'}
                            inputMode="default"
                            onChange={handleChange('username')}
                            errors={errors.username}
                        />
                        <TextInput
                            placeholder="Nomor Whatsapp"
                            size="md"
                            color={errors.phone_number ? 'danger' : 'dark'}
                            inputMode="default"
                            onChange={handleChange('phone_number')}
                            errors={errors.phone_number}
                            value={values.phone_number}
                        />
                        <TextInput
                            placeholder="Email"
                            size="md"
                            color={errors.email ? 'danger' : 'dark'}
                            inputMode="default"
                            onChange={handleChange('email')}
                            errors={errors.email}
                        />
                        <TextInput
                            placeholder="Password"
                            size="md"
                            color={errors.password ? 'danger' : 'dark'}
                            inputMode="password"
                            onChange={handleChange('password')}
                            errors={errors.password}
                        />
                        <Button key={12} title="Daftar" color="primary" text_position="center" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </Section>
    )
}

// View Form Login
const FormLogin: React.FC = () => {
    // Auth Check
    const { authSignIn } = useAuth()
    return (
        <Section padding="md" gap="sm">
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={ValidationSchema.Login}
                onSubmit={(values: AuthSignIn) => {
                    authSignIn(values)
                }}
            >
                {({ handleSubmit, handleChange, errors }) => (
                    <>
                        <TextInput
                            placeholder="Email"
                            size="md"
                            color={errors.email ? 'danger' : 'dark'}
                            inputMode="default"
                            onChange={handleChange('email')}
                            errors={errors.email}
                        />
                        <TextInput
                            placeholder="Password"
                            size="md"
                            color={errors.password ? 'danger' : 'dark'}
                            inputMode="password"
                            onChange={handleChange('password')}
                            errors={errors.password}
                        />
                        <Button title="Login" color="primary" text_position="center" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
        </Section>
    )
}

// View Method auth change
const AuthChangeMethod: React.FC<{ sizeFont?: sizeType; onPress?: () => void; authMethod: boolean }> = ({ sizeFont, onPress, authMethod }) => {
    return (
        <Section direction="row" customStyle="justify-center">
            <Text size={sizeFont}>{authMethod ? 'Sudah punya akun ?' : 'Belum punya akun ?'}</Text>
            <Link customStyle="ml-1" title={authMethod ? 'Login sekarang' : 'Daftar sekarang'} size={sizeFont} onPress={onPress} />
        </Section>
    )
}

// Auth Form
const AuthForm: React.FC<{ toggleAuth: boolean; changeAuthMethod: () => void }> = ({ toggleAuth, changeAuthMethod }) => {
    return (
        <CardForm gap="sm">
            <Notify />
            <HeaderForm />
            {toggleAuth ? <FormRegister /> : <FormLogin />}
            <AuthChangeMethod sizeFont="md" onPress={changeAuthMethod} authMethod={toggleAuth} />
        </CardForm>
    )
}

export default AuthForm
