import { ReactNode } from 'react'
import { colorType, directionType, sizeType } from './typeStyle'

export interface Layouts {
    children: ReactNode
    padding?: sizeType
    direction?: directionType
    color?: colorType
    expand?: boolean
    gap?: sizeType
    customStyle?: string
}
