import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { colorType, directionType, sizeType } from '../../types/typeStyle'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View } from 'react-native'

interface sectionType {
    children: React.ReactNode
    expand?: boolean
    color?: colorType
    padding?: sizeType
    gap?: sizeType
    direction?: directionType
    customStyle?: string
}

const Section: React.FC<sectionType> = ({
    children,
    color = 'light',
    padding = 'none',
    gap = 'none',
    direction = 'column',
    customStyle = '',
    expand
}) => {
    const style = [
        'flex',
        customStyle,
        expand && 'flex-1',
        color === 'primary' && 'bg-primary',
        color === 'secondary' && 'bg-secondary',
        color === 'info' && 'bg-info',
        color === 'danger' && 'bg-danger',
        color === 'warning' && 'bg-warning',
        color === 'inactive' && 'bg-inactive',
        color === 'active' && 'bg-active',
        color === 'hoverPrimary' && 'bg-hoverPrimary',
        color === 'success' && 'bg-success',
        color === 'link' && 'bg-link',
        color === 'light' && 'bg-light',
        color === 'dark' && 'bg-dark',
        color === 'transparent' && 'bg-transparent',
        padding === 'none' && 'p-0',
        padding === 'sm' && 'p-2',
        padding === 'md' && 'p-6',
        padding === 'xl' && 'p-8',
        padding === 'lg' && 'p-12',
        gap === 'none' && 'gap-0',
        gap === 'sm' && 'gap-4',
        gap === 'md' && 'gap-6',
        gap === 'xl' && 'gap-8',
        gap === 'lg' && 'gap-12',
        direction === 'column' && 'flex-col',
        direction === 'row' && 'flex-row'
    ]
        .filter(Boolean)
        .join(' ')
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className={style}>
                <>{children}</>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Section
