import useStackOptions from '~/src/hooks/Others/useStackOptions'
import Navigator from '../../hooks/Others/Navigator'
import Home from './Home'
import Materi from './Materi'
import Profile from './Profile'

export default () => {
    const { Tabs } = Navigator()
    const { bottomTabBar } = useStackOptions()
    return (
        <Tabs.Navigator initialRouteName="home" screenOptions={bottomTabBar}>
            <Tabs.Screen name="home" component={Home} />
            <Tabs.Screen name="materi" component={Materi} />
            <Tabs.Screen name="profile" component={Profile} />
        </Tabs.Navigator>
    )
}
