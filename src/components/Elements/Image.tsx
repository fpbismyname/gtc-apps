import { Image as Img } from 'react-native'
import { sizeType } from '~/src/types/otherTypes/typeStyle'

interface imageInterface {
    imageSource?: any
    imageUri?: string
    size?: sizeType
}

const Image = ({ imageSource, imageUri, size }: imageInterface) => {
    const style = [size === 'none' && 'w-0 h-0', size === 'sm' && 'w-14 h-14', size === 'md' && 'w-32 h-32', size === 'xl' && 'w-72 h-72', size === 'lg' && 'w-96 h-96']
        .filter(Boolean)
        .join(' ')
    return <Img source={imageUri ? { uri: imageUri } : imageSource} className={style} />
}

export default Image
