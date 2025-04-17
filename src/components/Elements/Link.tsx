import React, { FC } from 'react'
import { MD3Theme, Text as Links, TextProps, Icon } from 'react-native-paper'
import { TextDecorationType, FontWeightType, styling, StylingType } from '~/src/constants/styleSheets'
import View from './View'
import { IconNameType } from '~/src/constants/useTheme'

interface LinkType extends TextProps<MD3Theme> {
    Style?: StylingType[]
    Weight?: FontWeightType
    Decoration?: TextDecorationType
    IconName?: IconNameType
}

const Link: FC<LinkType> = ({ Style, Weight, Decoration, IconName, variant, style, ...rest }) => {
    const combinedStyle = styling(...(Style || []), Weight, Decoration, style as object)
    return (
        <View Style={['flexRow', 'itemsCenter', 'gap1']}>
            <Links {...rest} style={combinedStyle} adjustsFontSizeToFit={!rest.adjustsFontSizeToFit || true} variant={variant || 'bodyMedium'}>
                {rest.children}
            </Links>
            <Icon source={IconName} size={12} />
        </View>
    )
}

export default Link
