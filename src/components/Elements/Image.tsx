import { Image as Img } from 'react-native'
import { sizeType } from '~/src/types/otherTypes/typeStyle'

interface imageInterface {
    imageSource?: any
    imageUri?: string
    rounded?: boolean
    size?: sizeType | 'panorama' | '16/9' | '1/1'
    customStyle?: string
}

const Image = ({ imageSource, imageUri, size, rounded, customStyle }: imageInterface) => {
    const style = [
        customStyle,
        size === 'none' && 'w-0 h-0',
        size === 'sm' && 'w-14 h-14',
        size === 'md' && 'w-32 h-32',
        size === 'xl' && 'w-72 h-72',
        size === 'lg' && 'w-96 h-96',
        size === '1/1' && 'aspect-[1/1]',
        size === '16/9' && 'aspect-[16/9]',
        size === 'panorama' && 'aspect-[3/1]',
        rounded && 'rounded-xl'
    ]
        .filter(Boolean)
        .join(' ')

    return <Img source={imageUri ? { uri: imageUri } : imageSource} className={style} />
}

export default Image
