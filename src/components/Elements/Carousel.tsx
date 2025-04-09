import { FC, useEffect, useRef, useState } from 'react'
import Section from './Section'
import { Dimensions, ScrollView } from 'react-native'
import Image from './Image'
import { sizeType } from '~/src/types/otherTypes/typeStyle'
import Text from './Text'

interface ImageItem {
    image: string
    date?: string
}
interface CarouselInterface {
    images: Partial<ImageItem[]>
    imagesSize?: sizeType | 'panorama' | '16/9' | '1/1'
    duration: number
    title?: string
}

const Carousel: FC<CarouselInterface> = ({ images, imagesSize, duration = 3000, title = '' }) => {
    const imageData = images
    if (!imageData) return null
    const carouselRef = useRef<ScrollView>(null)
    const [currentImage, setCurrentImage] = useState<number>(0)

    useEffect(() => {
        const Scroll = setInterval(() => {
            const nextScroll = (currentImage + 1) % imageData.length
            carouselRef.current?.scrollTo({
                x: Dimensions.get('window').width * nextScroll,
                animated: true
            })
            setCurrentImage(nextScroll)
            // console.log('scrolled')
        }, duration + Math.floor(Math.random() * (100 - -500) + -500))

        return () => clearInterval(Scroll)
    }, [currentImage])

    const styleCarousel = [
        'w-full rounded-xl',
        imagesSize === 'none' && 'w-0 h-0',
        imagesSize === 'sm' && 'w-14 h-14',
        imagesSize === 'md' && 'w-32 h-32',
        imagesSize === 'xl' && 'w-72 h-72',
        imagesSize === 'lg' && 'w-96 h-96',
        imagesSize === '1/1' && 'aspect-[1/1]',
        imagesSize === '16/9' && 'aspect-[16/9]',
        imagesSize === 'panorama' && 'aspect-[3/1]'
    ]
        .filter(Boolean)
        .join(' ')
    return (
        <Section direction="column" gap="sm">
            {title ? <Text size="xl">{title}</Text> : null}
            <Section customStyle="items-center">
                <ScrollView className={styleCarousel} showsHorizontalScrollIndicator={false} ref={carouselRef} horizontal pagingEnabled overScrollMode="never">
                    {imageData.map((data, index) => (
                        <>
                            <Image key={index} imageUri={data?.image} size={imagesSize} />
                        </>
                    ))}
                </ScrollView>
            </Section>
        </Section>
    )
}

export default Carousel
