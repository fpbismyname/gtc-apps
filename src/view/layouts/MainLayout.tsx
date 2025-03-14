import { createStackNavigator } from '@react-navigation/stack';
import TabLayout from './TabLayout';
import MateriView from '../main/materi-view/MateriView';
import { SafeAreaView } from 'react-native';
import { useStackOptions } from '~/src/hooks/useStackOptions';

export default () => {
  const Stack = createStackNavigator();
  const {StackOptions} = useStackOptions()
  return (
    <SafeAreaView className='flex-1'>
      <Stack.Navigator screenOptions={StackOptions("MainLayout")}>
        <Stack.Screen name="mainTabLayout" component={TabLayout} />
        <Stack.Screen name="materiView" component={MateriView} options={StackOptions("materiView", "Materi-1")} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
