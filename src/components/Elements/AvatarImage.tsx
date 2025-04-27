import { FC } from 'react'
import { Avatar, AvatarImageProps } from 'react-native-paper'
import { styling, StylingType } from '~/src/constants/styleSheets'

interface AvatarImageType extends AvatarImageProps {
    Style?: StylingType[]
}
const AvatarImage: FC<AvatarImageType> = ({ Style, ...rest }) => {
    return <Avatar.Image style={styling(...(Style || []), rest.style || {}, { backgroundColor: 'transparent' })} {...rest} />
}

export default AvatarImage
