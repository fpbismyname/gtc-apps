import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import CustomTabBar from '~/src/components/Navigation/CustomTabBar'
import useNavigator from '../../hooks/Navigation/useNavigator'
import Home from './Home/Home'
import Module from './Module/Module'
import Profile from './Profile/Profile'

const TabLayouts = () => {
    const { Tabs } = useNavigator()
    const { bottomTabBar } = useStackOptions()

    return (
        <Tabs.Navigator initialRouteName="Home" screenOptions={bottomTabBar} tabBar={(props) => <CustomTabBar {...props} />}>
            <Tabs.Screen name="Home" component={Home} options={{ title: 'Beranda' }} />
            <Tabs.Screen name="Module" component={Module} options={{ title: 'Materi' }} />
            <Tabs.Screen name="Profile" component={Profile} options={{ title: 'Profil' }} />
        </Tabs.Navigator>
    )
}

export default TabLayouts
