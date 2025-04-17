import React, { FC } from 'react'
import { Image as Img, ImageProps } from 'react-native'
import { HeightType, styling, StylingType, WidthType } from '~/src/constants/styleSheets'

interface ImageType extends ImageProps {
    Style?: StylingType[]
    Height?: HeightType
    Width?: WidthType
}

const Image: FC<ImageType> = ({ Style, Width = 'w10', Height = 'h10', ...rest }) => {
    return <Img {...rest} style={styling(...(Style || []), Height, Width, 'p2')} />
}

export default Image
