import { FC, useEffect, useState } from 'react'
import { ActivityIndicator, Surface, SurfaceProps } from 'react-native-paper'
import { styling, StylingType } from '~/src/constants/styleSheets'
import View from './View'
import { Dimensions } from 'react-native'
import { useTheme } from '~/src/constants/useTheme'

interface LSType extends SurfaceProps {
    Style?: StylingType[]
}

const LoadingScreen: FC<LSType> = ({ Style, children, ...rest }) => {
    const { theme } = useTheme()
    const { height, width } = Dimensions.get('window')
    const [dimension, setDimension] = useState<{ width: number; height: number } | null>(null)
    const [opacity, setOpacity] = useState<number>(0)

    useEffect(() => {
        const showLoad = setInterval(() => {
            setOpacity(100)
        }, 200)
        if (opacity > 0) clearInterval(showLoad)
    }, [opacity])

    return (
        <View Style={['absolute', 'wFull', 'hFull', 'z1', 'left0', 'top0', { backgroundColor: theme['inverseSurface/25'] }]}>
            <Surface
                {...rest}
                mode="flat"
                elevation={5}
                style={[
                    styling('absolute', 'p4', 'roundedMd', ...(Style || [])),
                    {
                        top: height / 2 - (dimension?.height || 0),
                        left: width / 2 - (dimension?.width || 0) / 2,
                        opacity: opacity
                    }
                ]}
                onLayout={({ nativeEvent }) => {
                    const { ...dimension } = nativeEvent.layout
                    setDimension(dimension)
                }}
            >
                {children ? <ActivityIndicator size={'small'} animating theme={theme} /> : null}
            </Surface>
        </View>
    )
}

export default LoadingScreen
