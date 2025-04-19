import { ToastType } from 'react-native-toast-message'
import { create } from 'zustand'

type NotifyType = {
    states: {
        isLoading?: boolean
        message?: string | null
        type?: ToastType | null | undefined
    }
    setNotifyValue: ({ isLoading, message, type }: { isLoading?: boolean; message?: string | null; type?: ToastType | null }) => void
    clearNotify: () => void
}

export const useNotify = create<NotifyType>((set) => ({
    states: {
        message: null,
        isLoading: false,
        type: null
    },
    setNotifyValue: (value) => set((prev) => ({ states: { ...prev.states, ...value } })),
    clearNotify: () =>
        set((prev) => ({
            states: {
                isLoading: false,
                message: prev.states.message,
                type: 'info'
            }
        }))
}))
