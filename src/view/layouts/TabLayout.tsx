import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../main/Home';
import Materi from '../main/Materi';
import Profile from '../main/Profile';
import { TabsColor } from '~/src/constants/colorPallete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      screenOptions={{
        animation: 'none',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: TabsColor.background,
          paddingTop:8,
          height: 65,
        },
        tabBarActiveTintColor: TabsColor.activeButton,
        tabBarInactiveTintColor: TabsColor.inactiveButton
      }}
    >
      <Tabs.Screen name="home" component={Home} options={{
        title:"Home",
        tabBarIcon: ({color, size, focused})=><Icon name={focused ? "home" : "home-outline"} size={size} color={color}/>
    }}/>
      <Tabs.Screen name="materi" component={Materi} options={{
          title:"Materi",
          tabBarIcon: ({color, size, focused})=><Icon name={focused ? "book" : "book-outline"} size={size} color={color}/>
        }}/>
      <Tabs.Screen name="profile" component={Profile} options={{
          title:"Profile",
          tabBarIcon: ({color, size, focused})=><Icon name={focused ? "account" : "account-outline"} size={size} color={color}/>
      }}/>
    </Tabs.Navigator>
  );
};
