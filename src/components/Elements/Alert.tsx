import Text from './Text'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNotify } from '~/src/hooks/Redux/useNotify'
import { notifyInterface } from '~/src/types/otherTypes/typeNotify'

const Alert: React.FC<{ duration?: '1-second' | '2-second' | '3-second' }> = ({ duration = '3-second' }) => {
    // Get notify
    const { message, type, loading, setNotifyMessage } = useNotify()

    // Set Timer from duration parameter
    const timerAlert: number =
        [duration === '1-second' && 1000, duration === '2-second' && 2000, duration === '3-second' && 3000].filter(Boolean)[0] || 0

    // State notify
    const [notify, setNotify] = useState<notifyInterface | null>(null)

    // Timer Notify
    const timerStart = () => {
        if (notify?.message === null) {
            setTimeout(() => {
                setNotifyMessage('reset')
            }, timerAlert)
        }
    }

    // Check Change Notify
    useEffect(() => {
        // Start Timer
        timerStart()
        // Get notify value
        setNotify({
            message: message,
            loading: loading,
            type: type
        })
    }, [message])

    //style
    const styles = [
        'flex flex-row z-10 rounded-xl justify-between p-4 gap-4 flex-wrap',
        !notify?.message && 'hidden',
        notify?.type === 'danger' && 'bg-danger',
        notify?.type === 'warning' && 'bg-warning',
        notify?.type === 'success' && 'bg-success'
    ]
        .filter(Boolean)
        .join(' ')
    const icons = [
        notify?.type === 'danger' && 'alert-circle-outline',
        notify?.type === 'warning' && 'warning-outline',
        notify?.type === 'success' && 'checkmark-circle-outline'
    ]
        .filter(Boolean)
        .toString()

    return (
        <View className="absolute p-4 w-screen">
            <View className={styles}>
                <View className="flex-row items-center">
                    <IonIcon name={icons} size={16} color={type === 'danger' ? 'white' : ''} />
                </View>
                <View className="flex-row items-center flex-1">
                    <Text customStyle={type === 'danger' ? 'text-light' : ''}>{message}</Text>
                </View>
                <View className="flex-row items-center">
                    <IonIcon name="close" size={16} color={type === 'danger' ? 'white' : ''} onPress={() => setNotifyMessage('reset')} />
                </View>
            </View>
        </View>
    )
}

export default Alert
