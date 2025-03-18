import React, { Children } from 'react'
import { Pressable, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colorType, sizeType } from '../../../types/typeStyle'

interface buttonType {
    title?: string
    color?: colorType
    size?: sizeType
    onPress?: () => void
    expand?: boolean
    icon?: string
}

export default function Button({ title, color = 'secondary', size = 'md', onPress, icon, expand }: buttonType) {
    const style = [
        'flex flex-row rounded-xl items-center justify-center',
        expand && 'flex-1',
        color === 'primary' && 'bg-primary',
        color === 'secondary' && 'bg-secondary',
        color === 'info' && 'bg-info',
        color === 'warning' && 'bg-warning',
        color === 'danger' && 'bg-danger',
        color === 'active' && 'bg-active',
        color === 'inactive' && 'bg-inactive',
        size === 'sm' && 'px-2 py-2',
        size === 'md' && 'px-4 py-4',
        size === 'xl' && 'px-6 py-6',
        size === 'lg' && 'px-8 py-8'
    ]
        .filter(Boolean)
        .join(' ')
    const styleText = [size === 'sm' && 'text-sm', size === 'md' && 'text-base', size === 'xl' && 'text-xl', size === 'lg' && 'text-2xl']
        .filter(Boolean)
        .join(' ')
    const styleIcon = [size === 'sm' && 12, size === 'md' && 14, size === 'xl' && 16, size === 'lg' && 20].filter(Boolean).join(' ')
    return (
        <Pressable onPress={onPress} className={style}>
            {icon ? <Icon name={icon} size={parseInt(styleIcon)} className={icon && title ? 'mr-1' : ''} /> : null}
            {title ? <Text className={styleText}>{title}</Text> : null}
        </Pressable>
    )
}
