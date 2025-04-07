import { FC } from 'react'
import Section from '~/src/components/Elements/Section'
import Text from '~/src/components/Elements/Text'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const NoInternetConnection: FC = () => {
    return (
        <Section direction="column" expand>
            <Section direction="row" customStyle="justify-center items-end" expand>
                <Section direction="column" color="primary" padding="md" gap="sm" customStyle="items-center rounded-xl">
                    <Icon name="web-cancel" size={36} />
                    <Text size="sm">Koneksi internet terputus.</Text>
                    <Icon name="reload" className="animate-spin" size={16} />
                </Section>
            </Section>
            <Section direction="row" customStyle="items-end justify-center" expand>
                <Section direction="row" customStyle="" padding="xl">
                    <Text color="secondary">Gading Training Center</Text>
                </Section>
            </Section>
        </Section>
    )
}

export default NoInternetConnection
