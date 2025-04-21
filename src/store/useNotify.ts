import { ToastType } from 'react-native-toast-message'
import { create } from 'zustand'

type NotifyType = {
    states: {
        message?: string | null
        type?: ToastType | null | undefined
    }
    setNotifyValue: ({ message, type }: { message?: string | null; type?: ToastType | null }) => void
    clearNotify: () => void
}

export const useNotify = create<NotifyType>((set) => ({
    states: {
        message: null,
        type: null
    },
    setNotifyValue: (value) => set((prev) => ({ states: { ...prev.states, ...value } })),
    clearNotify: () =>
        set({
            states: {
                message: '',
                type: 'info'
            }
        })
}))
