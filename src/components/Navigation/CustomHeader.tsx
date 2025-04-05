import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import Section from '../Elements/Section'
import Text from '../Elements/Text'
import Button from '../Elements/Button'
import useNavigator from '~/src/hooks/Navigation/useNavigator'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackParamList, TabMenuPage } from '~/src/types/navigatorType/Navigator'

const CustomHeader = ({ navigation }: NativeStackHeaderProps) => {
    const { router } = useNavigator()
    const { params } = useRoute<RouteProp<StackParamList>>()
    const data = params as TabMenuPage
    return (
        <Section customStyle="px-4 pt-2">
            {navigation.canGoBack() && (
                <Section direction="row" gap="xs" color="primary" customStyle="rounded-xl items-center">
                    <Section direction="column">
                        <Button icon="arrow-left" iconSize="2xl" color="transparent" onPress={() => router.navigate('TabLayouts', { screen: 'Profile' })} />
                    </Section>
                    <Section direction="column" customStyle="justify-center items-end">
                        <Text size="xl">{data?.title || ''}</Text>
                    </Section>
                </Section>
            )}
        </Section>
    )
}

export default CustomHeader
