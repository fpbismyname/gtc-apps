import App from './App'
import '../global.css'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import store, { persistor } from './utils/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

enableScreens()

const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}
export default Root
