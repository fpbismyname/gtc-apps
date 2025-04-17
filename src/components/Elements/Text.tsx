import React, { FC } from 'react'
import { MD3Theme, Text as T, TextProps } from 'react-native-paper'
import { TextDecorationType, FontWeightType, styling, StylingType } from '~/src/constants/styleSheets'

interface TextType extends TextProps<MD3Theme> {
    Style?: StylingType[]
    Weight?: FontWeightType
    Decoration?: TextDecorationType
}

const Text: FC<TextType> = ({ Style, Weight, Decoration, variant, style, ...rest }) => {
    const WeightStyle: Partial<StylingType[]> = [Weight] as Partial<StylingType[]>
    const DecorationStyle: Partial<StylingType[]> = [Decoration] as Partial<StylingType[]>
    const combinedStyle = [styling(...(Style || []), ...WeightStyle, ...DecorationStyle), style]
    return (
        <T {...rest} style={combinedStyle} variant={variant || 'bodyMedium'}>
            {rest.children}
        </T>
    )
}

export default Text
