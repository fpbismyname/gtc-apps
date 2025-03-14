import TextUI from './Text'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { useNotify } from '../hooks/useNotify'
import { useRef } from 'react'
import { View } from 'react-native'

interface alertType {
  title: string
  type: alertType | string
}

export default function Alert({ title, type = 'success' }: alertType) {
  const timeoutNotify = useRef<NodeJS.Timeout | null>(null)

  const { notifyMessage } = useNotify()

  if (timeoutNotify.current) clearTimeout(timeoutNotify.current)

  // Close alert Manual
  const closeNotify = () => notifyMessage('reset')

  // Timeout Alert
  const AlertTimeout = () => {
    timeoutNotify.current = setTimeout(closeNotify, 3000)
  }

  // Call Timeout
  AlertTimeout()

  //style
  const styles = [
    'flex flex-row z-10 rounded-xl justify-between p-4 gap-4 flex-wrap',
    type === 'danger' && 'bg-danger',
    type === 'warning' && 'bg-warning',
    type === 'success' && 'bg-success',
  ]
    .filter(Boolean)
    .join(' ')
  const icons = [
    type === 'danger' && 'alert-circle-outline',
    type === 'warning' && 'warning-outline',
    type === 'success' && 'checkmark-circle-outline',
  ]
    .filter(Boolean)
    .toString()

  return (
    <View className="absolute p-4 w-screen">
      <View className={styles}>
        <View className="flex-row items-center">
          <IonIcon name={icons} size={16} />
        </View>
        <View className="flex-row items-center flex-1">
          <TextUI>{title}</TextUI>
        </View>
        <View className="flex-row items-center">
          <IonIcon name="close" size={16} onPress={closeNotify} />
        </View>
      </View>
    </View>
  )
}
