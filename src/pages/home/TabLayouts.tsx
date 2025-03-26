import useStackOptions from '~/src/hooks/Navigation/useStackOptions'
import CustomTabBar from '~/src/hooks/Navigation/CustomTabBar'
import Navigator from '../../hooks/Navigation/Navigator'
import Home from './Home'
import Materi from './Materi'
import Profile from './Profile'

const TabLayouts = () => {
    const { Tabs } = Navigator()
    const { bottomTabBar } = useStackOptions()

    return (
        <Tabs.Navigator initialRouteName="Home" screenOptions={bottomTabBar} tabBar={(props) => <CustomTabBar {...props} />}>
            <Tabs.Screen name="Home" component={Home} />
            <Tabs.Screen name="Materi" component={Materi} />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    )
}

export default TabLayouts
