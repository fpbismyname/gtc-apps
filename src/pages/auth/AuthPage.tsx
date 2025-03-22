import useToggleAuth from '~/src/hooks/Auth/useToggleAuth'
import AuthForm from './AuthForm'
import Alert from '../../components/Elements/Alert'

export default () => {
    // state Auth Method
    const { toggleAuth, changeAuthMethod } = useToggleAuth()
    return (
        <>
            <Alert />
            <AuthForm toggleAuth={toggleAuth} changeAuthMethod={changeAuthMethod} />
        </>
    )
}
