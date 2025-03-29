import Alert from '~/src/components/Elements/Alert'
import Section from '../../../components/Elements/Section'
import Text from '../../../components/Elements/Text'
import { FC } from 'react'

const Home = () => {
    return (
        <Section direction="column" expand>
            <Alert />
            <Text>Home</Text>
        </Section>
    )
}

export default Home
