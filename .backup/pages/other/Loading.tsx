import View from '~/src/components/elements/View'
import { ActivityIndicator, Text } from 'react-native-paper'
import { styling } from '~/src/constants/styleSheets'

const Loading = () => {
    return (
        <View style={styling('itemsCenter', 'justifyCenter', 'expand', 'flexColumn')}>
            <ActivityIndicator></ActivityIndicator>
        </View>
    )
}
export default Loading
