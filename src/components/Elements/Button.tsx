import React, { FC } from 'react'
import { Button as BT, ButtonProps } from 'react-native-paper'
import { styling, StylingType } from '~/src/constants/styleSheets'

interface ButtonType extends ButtonProps {
    Style?: StylingType[]
    ContentStyle?: StylingType[]
}

const Button: FC<ButtonType> = ({ children, Style, ContentStyle, ...rest }) => {
    return (
        <BT {...rest} compact={!rest.compact || true} style={styling(...(Style || []), 'roundedMd')} contentStyle={styling(...(ContentStyle || []), 'py1')}>
            {children}
        </BT>
    )
}

export default Button
