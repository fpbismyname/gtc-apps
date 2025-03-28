import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import Section from '../Elements/Section'
import Text from '../Elements/Text'
import Button from '../Elements/Button'
import useNavigator from '~/src/hooks/Navigation/useNavigator'

const CustomHeader = ({ navigation, options }: NativeStackHeaderProps) => {
    const { router } = useNavigator()
    return (
        <Section padding="sm">
            {navigation.canGoBack() && (
                <Section direction="row" gap="xs" color="primary" customStyle="rounded-xl items-center">
                    <Section direction="column">
                        <Button icon="arrow-left" iconSize="2xl" color="transparent" onPress={() => router.navigate('TabLayouts', { screen: 'Profile' })} />
                    </Section>
                    <Section direction="column" customStyle="justify-center items-end">
                        <Text size="xl">{options.title}</Text>
                    </Section>
                </Section>
            )}
        </Section>
    )
}

export default CustomHeader
