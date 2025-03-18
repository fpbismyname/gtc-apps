import Section from './Section'
import Icon from 'react-native-vector-icons/Ionicons'
import Text from './Text'
import { weightType } from '../../../types/typeStyle'

interface cardType {
    title?: string
    description?: string
    weight?: weightType
    icon?: string
}

export default ({ title, description, icon = 'triangle', weight }: cardType) => {
    return (
        <Section padding="md" direction="row" customStyle="items-center bg-primary rounded-xl" gap="sm" expand>
            <Section direction="column" customStyle="items-center" padding="sm" color="transparent">
                <Icon name={icon} size={24} />
            </Section>
            <Section direction="column" color="transparent" expand>
                <Text weight="bolder">{title}</Text>
                <Text>{description}</Text>
            </Section>
        </Section>
    )
}
