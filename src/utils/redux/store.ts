import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import authReducer from './slices/authToggleMethod'
import notifyReducer from './slices/notifyMessage'
import userReducer from './slices/userInformation'

const persistConfig = {
    key: 'gtc-apps',
    storage: AsyncStorage,
    whitelist: ['userInformation'],
    transform: []
}

const combinedReducer = combineReducers({
    authToggleMethod: authReducer,
    notifyMessage: notifyReducer,
    userInformation: userReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
