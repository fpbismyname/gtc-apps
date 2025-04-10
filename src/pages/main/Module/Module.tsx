import { FC } from 'react'
import Section from '~/src/components/Elements/Section'
import Text from '~/src/components/Elements/Text'
import { Layouts } from '~/src/types/otherTypes/Layout'

const ModuleLayouts: FC<Layouts> = ({ children, ...props }) => {
    return (
        <Section {...props}>
            <>{children}</>
        </Section>
    )
}

const HeaderListModule: FC = () => {
    return (
        <Section>
            <Section>
                <Text>Daftar Module</Text>
            </Section>
        </Section>
    )
}

const Module = () => {
    return (
        <ModuleLayouts gap="sm" padding="sm">
            <HeaderListModule />
        </ModuleLayouts>
    )
}

export default Module
