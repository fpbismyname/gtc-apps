import { FC } from 'react'
import { Keyboard, TouchableWithoutFeedback, ViewProps } from 'react-native'
import { Surface as V } from 'react-native-paper'
import { styling, StylingType } from '~/src/constants/styleSheets'
import { useTheme } from '~/src/constants/useTheme'

interface ViewType extends ViewProps {
    Style?: StylingType[]
    Elevation?: 0 | 1 | 2 | 3 | 4 | 5
}

const View: FC<ViewType> = ({ Style, children, Elevation = 0, ...rest }) => {
    const { theme } = useTheme()
    return (
        <TouchableWithoutFeedback style={styling('expand')} onPress={Keyboard.dismiss}>
            <V {...rest} style={styling(...(Style || []))} theme={theme} elevation={Elevation}>
                <>{children}</>
            </V>
        </TouchableWithoutFeedback>
    )
}

export default View
