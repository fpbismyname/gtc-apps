import { MaterialCommunityIcons } from '@expo/vector-icons'
import Toast, { ToastConfigParams } from 'react-native-toast-message'
import { useNotify } from '~/src/store/useNotify'
import Text from './Text'
import View from './View'
import { useEffect } from 'react'
import { useTheme } from '~/src/constants/useTheme'

const Notify = () => {
    const { states, action } = useNotify()
    const { theme } = useTheme()
    const ShowNotify = () => {
        if (!states.message) return
        Toast.show({
            autoHide: true,
            type: states.type || 'info',
            text1: states.message,
            visibilityTime: 3000,
            swipeable: true,
            onHide: () => {
                action.setNotifyValue({
                    isLoading: false,
                    message: '',
                    type: 'info'
                })
            }
        })
    }

    useEffect(() => {
        if (states.message) ShowNotify()
    }, [states.message])

    const configToast = {
        success: ({ text1 }: ToastConfigParams<'success'>) => (
            <View
                Style={[
                    'absolute',
                    'flexRow',
                    'z5',
                    'top2',
                    'p4',
                    'gap4',
                    'itemsCenter',
                    'flexWrap',
                    'roundedMd',
                    'border1',
                    { backgroundColor: theme.primaryContainer, borderColor: theme.outline }
                ]}
            >
                <MaterialCommunityIcons name={'check-circle'} size={24} color={theme.onPrimaryContainer} />
                <Text>{text1}</Text>
            </View>
        ),
        info: ({ text1 }: ToastConfigParams<'info'>) => (
            <View
                Style={[
                    'absolute',
                    'flexRow',
                    'z5',
                    'top2',
                    'p4',
                    'gap4',
                    'itemsCenter',
                    'flexWrap',
                    'roundedMd',
                    'border1',
                    { backgroundColor: theme.tertiaryContainer, borderColor: theme.outline }
                ]}
            >
                <MaterialCommunityIcons name={'information'} size={24} color={theme.onTertiaryContainer} />
                <Text>{text1}</Text>
            </View>
        ),
        error: ({ text1 }: ToastConfigParams<'error'>) => (
            <View
                Style={[
                    'absolute',
                    'flexRow',
                    'z5',
                    'top2',
                    'p4',
                    'gap4',
                    'itemsCenter',
                    'flexWrap',
                    'roundedMd',
                    'border1',
                    { backgroundColor: theme.errorContainer, borderColor: theme.outline }
                ]}
            >
                <MaterialCommunityIcons name={'alert-circle'} size={24} color={theme.onErrorContainer} />
                <Text>{text1}</Text>
            </View>
        )
    }
    return <Toast config={configToast} />
}

export default Notify
