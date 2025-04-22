import { forwardRef } from 'react'
import { ViewProps } from 'react-native'
import { View as V } from 'react-native'
import { styling, StylingType } from '~/src/constants/styleSheets'

interface ViewType extends ViewProps {
    Style?: StylingType[]
}

const View = forwardRef<V, ViewType>(({ Style, ...rest }, ref) => {
    return <V ref={ref} style={styling(...(Style || []))} {...rest} />
})

export default View
