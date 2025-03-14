import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AuthLayout from './view/layouts/AuthLayout'
import MainLayout from './view/layouts/MainLayout'
import { useEffect, useState } from 'react'
import { useUser } from './hooks/useUser'
import { jwtDecode } from 'jwt-decode'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNotify } from './hooks/useNotify'
import { useSelector } from 'react-redux'
import { RootState } from './utils/redux/store'
import * as SplashScreen from 'expo-splash-screen'
import { Platform } from 'react-native'

const App = () => {
  // Get Redux
  const { userUID, userToken, getUserAccount } = useUser()
  const { notifyMessage } = useNotify()
  const { loading } = useSelector((state: RootState) => state.notify)

  // Get Data from local storage
  const [UserID, setUserID] = useState<string | null>(null)
  const [UserToken, setUserToken] = useState<string | null>(null)
  const [tokenValid, setTokenValid] = useState<boolean>(false)
  const [appReady, setAppReady] = useState<boolean>(false)

  // check Token
  const checkToken = () => {
    try {
      const token = jwtDecode(UserToken || '')
      const currentTime = Math.floor(Date.now() / 1000)
      if (token.exp) {
        token.exp > currentTime ? setTokenValid(true) : setTokenValid(false)
      }
    } catch {
      setTokenValid(false)
    }
  }

  // Get Data User
  const splashScreen = async () => {
    try {
      notifyMessage('loading')
      getUserAccount()
      setUserID(userUID)
      setUserToken(userToken)
      checkToken()
      notifyMessage('reset')
    } catch {
      setAppReady(true)
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setAppReady(true)
      await SplashScreen.hideAsync()
    }
  }

  // Get id in first load
  useEffect(() => {
    splashScreen()
  }, [userUID, userToken, UserID, UserToken, appReady])

  if (!appReady) return null

  if (Platform.OS === 'android' || Platform.OS === 'ios')
    return (
      <NavigationContainer>
        <SafeAreaView className='flex-1'>
          <StatusBar style="auto" />
          {tokenValid ? <MainLayout /> : <AuthLayout />}
        </SafeAreaView>
      </NavigationContainer>
    )
  else
    return (
      <NavigationContainer>
        <StatusBar style="auto" />
        {tokenValid ? <MainLayout /> : <AuthLayout />}
      </NavigationContainer>
    )
}

export default App
