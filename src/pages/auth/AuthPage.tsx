import useToggleAuth from '~/src/hooks/Redux/useToggleAuth'
import AuthForm from './AuthForm'
// import Alert from '../../components/Elements/Alert'

export default () => {
    // state Auth Method
    const { toggleAuth, changeAuthMethod } = useToggleAuth()
    return (
        <>
            <AuthForm toggleAuth={toggleAuth} changeAuthMethod={changeAuthMethod} />
        </>
    )
}
