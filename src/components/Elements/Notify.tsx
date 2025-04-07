import { FC, useEffect, useState } from 'react'
import Toast, { ToastConfigParams } from 'react-native-toast-message'
import { colorPallet } from '~/src/constants/colorPallete'
import { useNotify } from '~/src/hooks/Redux/useNotify'
import { notifyInterface } from '~/src/types/otherTypes/typeNotify'
import Section from './Section'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Text from './Text'

const Notify = () => {
    // State for get message information
    const { setNotifyMessage, ...data } = useNotify()

    // func to show notify
    const showNotify = () => {
        if (data?.type === null || data?.message === null) return
        Toast.show({
            autoHide: true,
            type: data?.type,
            text1: data?.message,
            visibilityTime: 3000,
            topOffset: 12,
            swipeable: true,
            onHide: () => {
                setNotifyMessage('reset')
            }
        })
    }

    // Check message on every message change's
    useEffect(() => {
        if (data.message) {
            showNotify()
        }
    }, [data.message])

    // Styled Toast
    const configToast = {
        success: ({ text1 }: ToastConfigParams<'success'>) => (
            <Section color="primary" direction="row" customStyle="items-center rounded-full p-4 gap-2">
                <Icon name={'check-circle'} size={18} />
                <Text>{text1}</Text>
            </Section>
        ),
        info: ({ text1 }: ToastConfigParams<'info'>) => (
            <Section color="info" direction="row" customStyle="items-center rounded-full p-4 gap-2">
                <Icon name={'information'} size={18} />
                <Text>{text1}</Text>
            </Section>
        ),
        error: ({ text1 }: ToastConfigParams<'error'>) => (
            <Section color="danger" direction="row" customStyle="items-center rounded-full p-4 gap-2">
                <Icon name={'alert-circle'} size={18} />
                <Text>{text1}</Text>
            </Section>
        )
    }

    // Return toast
    return <Toast config={configToast} />
}

export default Notify
