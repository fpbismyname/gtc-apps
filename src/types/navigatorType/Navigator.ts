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

export type routeTabMenu = 'institution_information' | 'done_module' | 'membership' | 'my_account'

export type TabsParamList = {
    Profile?: {}
    Module?: {}
    Home?: {}
}
