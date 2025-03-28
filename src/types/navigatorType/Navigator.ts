import { AuthType } from '../databaseType/AuthType'
import { NavigatorScreenParams } from '@react-navigation/native'

export type StackParamList = {
    TabLayouts: NavigatorScreenParams<TabsParamList>
    Auth: {}
    // Profile Page
    MyAccount?: Partial<AuthType>
    Membership?: Partial<AuthType>
}

export type TabsParamList = {
    Profile?: {}
    Module?: {}
    Home?: {}
}
