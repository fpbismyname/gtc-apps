import { NavigatorScreenParams } from '@react-navigation/native'

export type StackParamList = {
    TabLayouts: NavigatorScreenParams<TabsParamList>
    Auth: {}
    // Profile Page
    ProfileMenu?: TabMenuPage
}

export interface TabMenuPage {
    title?: string
    route?: routeTabMenu
    data?: any
}

export type routeTabMenu = 'institution_information' | 'membership_information' | 'account_information'

export type TabsParamList = {
    Profile?: {}
    Module?: {}
    Home?: {}
}
