import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const NoInternet = () => {
    return (
        <View>
            <Text>No Internet</Text>
            <ActivityIndicator></ActivityIndicator>
        </View>
    )
}
export default NoInternet
