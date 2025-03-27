import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import CustomTabBar from '~/src/components/Elements/Navigation/CustomTabBar'
import Navigator from '../../hooks/Navigation/Navigator'
import Home from './Home'
import Module from './Module'
import Profile from './Profile'

const TabLayouts = () => {
    const { Tabs } = Navigator()
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
