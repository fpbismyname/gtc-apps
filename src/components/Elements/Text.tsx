import React from 'react'
import { Text as T } from 'react-native'
import { colorType, sizeType, weightType } from '../../types/otherTypes/typeStyle'

interface typeText {
    size?: 'xs' | sizeType | '2xl' | '3xl'
    weight?: weightType
    color?: colorType
    customStyle?: string
    children: React.ReactNode
    padding?: sizeType
}

const Text = ({ size = 'md', weight = 'normal', children, customStyle = '', color = 'dark', padding }: typeText) => {
    const style = [
        customStyle,
        // Padding size
        padding === 'sm' && 'px-2 py-2',
        padding === 'md' && 'px-4 py-4',
        padding === 'xl' && 'px-6 py-6',
        padding === 'lg' && 'px-8 py-8',
        color === 'primary' && 'text-primary',
        color === 'secondary' && 'text-secondary',
        color === 'info' && 'text-info',
        color === 'danger' && 'text-danger',
        color === 'warning' && 'text-warning',
        color === 'inactive' && 'text-inactive',
        color === 'active' && 'text-active',
        color === 'hoverPrimary' && 'text-hoverPrimary',
        color === 'success' && 'text-success',
        color === 'link' && 'text-link',
        color === 'light' && 'text-light',
        color === 'dark' && 'text-dark',
        color === 'transparent' && 'text-transparent',
        color === 'gray' && 'text-gray',
        weight === 'bolder' && 'font-bold',
        weight === 'bold' && 'font-semibold',
        weight === 'normal' && 'font-normal',
        weight === 'thin' && 'font-light',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'xl' && 'text-xl',
        size === '2xl' && 'text-2xl',
        size === '3xl' && 'text-3xl'
    ]
        .filter(Boolean)
        .join(' ')
    return (
        <T className={style}>
            <>{children}</>
        </T>
    )
}

export default Text
