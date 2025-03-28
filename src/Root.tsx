import App from './App'
import '../global.css'
import { Provider } from 'react-redux'
import store, { persistor } from './utils/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <App />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    )
}
export default Root
