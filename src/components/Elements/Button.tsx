import React, { FC } from 'react'
import { Button as BT, ButtonProps } from 'react-native-paper'
import { styling, StylingType } from '~/src/constants/styleSheets'
import { useTheme } from '~/src/constants/useTheme'

interface ButtonType extends ButtonProps {
    Style?: StylingType[]
    ContentStyle?: StylingType[]
}

const Button: FC<ButtonType> = ({ children, Style, ContentStyle, ...rest }) => {
    const { theme } = useTheme()
    return (
        <BT
            {...rest}
            mode={rest.mode || 'contained'}
            compact={!rest.compact || true}
            style={styling(...(Style || []), 'roundedMd')}
            textColor={theme.onPrimaryContainer}
            contentStyle={styling(...(ContentStyle || []), { backgroundColor: theme.primaryContainer })}
        >
            {children}
        </BT>
    )
}

export default Button
