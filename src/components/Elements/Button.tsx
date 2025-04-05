import React, { Children } from 'react'
import { Pressable, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colorType, sizeType, weightType } from '../../types/otherTypes/typeStyle'
import useRedux from '~/src/hooks/Redux/useRedux'
import { colorPallet } from '~/src/constants/colorPallete'

interface buttonType {
    title?: string
    color?: colorType
    size?: 'xs' | sizeType
    onPress?: () => void
    customStyle?: string
    expand?: boolean
    icon?: string
    iconSize?: sizeType | '2xl' | '3xl'
    iconColor?: colorType
    weight?: weightType
    text_position?: 'center' | 'left' | 'right'
}

export default function Button({
    title,
    color = 'secondary',
    size = 'md',
    onPress,
    icon,
    expand,
    text_position = 'left',
    weight = 'normal',
    iconSize,
    iconColor,
    customStyle
}: buttonType) {
    const { notifyState } = useRedux()
    const { loading } = notifyState
    const style = [
        customStyle,
        'flex flex-row rounded-xl items-center',
        // Text position
        text_position === 'center' && ' justify-center',
        text_position === 'left' && ' justify-left',
        text_position === 'right' && ' justify-right',
        // Expand
        expand && 'flex-1',
        // loading color
        color === 'primary' && loading && 'bg-primary-loading',
        color === 'secondary' && loading && 'bg-secondary-loading',
        color === 'info' && loading && 'bg-info-loading',
        color === 'warning' && loading && 'bg-warning-loading',
        color === 'danger' && loading && 'bg-danger-loading',
        color === 'active' && loading && 'bg-active-loading',
        color === 'inactive' && loading && 'bg-inactive-loading',
        // normal color
        color === 'primary' && !loading && 'bg-primary',
        color === 'secondary' && !loading && 'bg-secondary',
        color === 'info' && !loading && 'bg-info',
        color === 'warning' && !loading && 'bg-warning',
        color === 'danger' && !loading && 'bg-danger',
        color === 'active' && !loading && 'bg-active',
        color === 'inactive' && !loading && 'bg-inactive',
        color === 'gray' && !loading && 'bg-gray',
        color === 'dark' && !loading && 'bg-dark',
        // Size Buttom
        size === 'sm' && !customStyle && 'px-2 py-2 text-sm',
        size === 'md' && !customStyle && 'px-4 py-4 text-md',
        size === 'xl' && !customStyle && 'px-6 py-6 text-xl',
        size === 'lg' && !customStyle && 'px-8 py-8 text-2xl'
    ]
        .filter(Boolean)
        .join(' ')
    const iconStyleColor = [
        // normal color
        iconColor === 'primary' && !loading && colorPallet[iconColor],
        iconColor === 'secondary' && !loading && colorPallet[iconColor],
        iconColor === 'info' && !loading && colorPallet[iconColor],
        iconColor === 'warning' && !loading && colorPallet[iconColor],
        iconColor === 'danger' && !loading && colorPallet[iconColor],
        iconColor === 'active' && !loading && colorPallet[iconColor],
        iconColor === 'inactive' && !loading && colorPallet[iconColor],
        iconColor === 'gray' && !loading && colorPallet[iconColor]
    ]
        .filter(Boolean)
        .join(' ')
    const styleText = [
        // Size Text
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'xl' && 'text-xl',
        size === 'lg' && 'text-2xl',
        // Weight Text
        weight === 'bolder' && 'font-bold',
        weight === 'bold' && 'font-semibold',
        weight === 'normal' && 'font-normal',
        weight === 'thin' && 'font-light'
    ]
        .filter(Boolean)
        .join(' ')
    const styleIcon = [iconSize === 'sm' && 12, iconSize === 'md' && 14, iconSize === 'xl' && 16, iconSize === '2xl' && 20, iconSize === '3xl' && 24].filter(Boolean).join(' ')
    return (
        <Pressable onPress={onPress} className={style} disabled={loading}>
            {icon ? <Icon name={icon} size={parseInt(styleIcon)} color={iconStyleColor} className={icon && title ? 'mr-1' : ''} /> : null}
            {title ? <Text className={styleText}>{loading ? '•••' : title}</Text> : null}
        </Pressable>
    )
}
