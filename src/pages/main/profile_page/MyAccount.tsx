import { RouteProp, useRoute } from '@react-navigation/native'
import Section from '~/src/components/Elements/Section'
import Text from '~/src/components/Elements/Text'
import { AuthType } from '~/src/types/databaseType/AuthType'
import { StackParamList } from '~/src/types/navigatorType/Navigator'

const MyAccount = () => {
    const { params } = useRoute<RouteProp<StackParamList>>()
    const { ...data }: AuthType = params as AuthType
    return (
        <Section>
            <Text>{data.email}</Text>
        </Section>
    )
}

export default MyAccount
