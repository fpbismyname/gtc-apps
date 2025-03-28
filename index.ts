import { registerRootComponent } from 'expo'
import '@expo/metro-runtime'
import Root from './src/Root'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Root)
