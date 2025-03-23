import React from 'react'
import { Text } from 'react-native'
import { sizeType, weightType } from '~/src/types/otherTypes/typeStyle'

interface linkType {
    title: string
    size?: sizeType | '2xl' | '3xl'
    weight?: weightType
    onPress?: () => void
    customStyle?: string
}

export default function Link({ title, size = 'sm', weight, onPress, customStyle }: linkType) {
    const style = [
        customStyle,
        'flex',
        'underline',
        'underline-offset-4',
        'text-link',
        'active:text-hoverPrimary',
        'cursor-pointer',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'xl' && 'text-xl',
        size === '2xl' && 'text-2xl',
        size === '3xl' && 'text-3xl',
        weight === 'bolder' && 'font-bold',
        weight === 'bold' && 'font-semibold',
        weight === 'normal' && 'font-normal',
        weight === 'thin' && 'font-light'
    ]
        .filter(Boolean)
        .join(' ')
    return (
        <Text className={style} onPress={onPress}>
            <>{title}</>
        </Text>
    )
}
