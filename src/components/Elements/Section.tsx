import { FC } from 'react'
import { Keyboard, TouchableWithoutFeedback, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styling, StylingType } from '~/src/constants/styleSheets'

interface SectionType extends ViewProps {
    Style?: StylingType[]
}
const Section: FC<SectionType> = (props) => {
    const { Style, children, ...rest } = props
    return (
        <TouchableWithoutFeedback style={styling('expand')} onPress={Keyboard.dismiss}>
            <SafeAreaView {...rest} style={styling(...(Style || []), 'expand')} edges={['top']}>
                <>{children}</>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default Section
