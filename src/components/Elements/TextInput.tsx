import React, { ReactNode, useState } from 'react'
import { TextInput as TI, View } from 'react-native'
import { colorType } from '../../types/otherTypes/typeStyle'
import { inputMode } from '~/src/types/otherTypes/inputMode'
import Section from './Section'
import Text from './Text'
import useRedux from '~/src/hooks/Redux/useRedux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Link from './Link'

interface textInputType {
    placeholder?: string
    color?: colorType
    size?: 'sm' | 'md' | 'xl' | 'lg'
    onChange?: (e: string) => void
    onBlur?: (e: any) => void
    inputMode?: inputMode
    label?: string
    labelIcon?: string
    value?: string
    expand?: boolean
    errors?: string
    children?: ReactNode
    disable?: boolean
}

export default function TextInput({
    placeholder,
    inputMode = 'default',
    color,
    size = 'sm',
    onChange,
    onBlur,
    value,
    expand,
    errors,
    children,
    disable,
    label,
    labelIcon
}: textInputType) {
    let inputText: any = []
    const { notifyState } = useRedux()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { loading } = notifyState

    if (inputMode === 'default') inputText = ['default', 'text']
    if (inputMode === 'numeric') inputText = ['numeric', 'numeric']
    if (inputMode === 'email') inputText = ['default', 'email']
    if (inputMode === 'search') inputText = ['web-search', 'search']
    if (inputMode === 'password') inputText = ['default', true]

    const style = [
        label && labelIcon ? 'flex-1' : 'rounded-xl outline-0 border flex-1',
        'flex  placeholder-inactive focus:bg-primary',
        expand && 'flex-1',
        color === 'light' && 'border-light',
        color === 'primary' && 'border-primary',
        color === 'secondary' && 'border-secondary',
        color === 'info' && 'border-info',
        color === 'warning' && 'border-warning',
        color === 'danger' && 'border-danger',
        color === 'active' && 'border-active',
        color === 'inactive' && 'border-inactive',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-4 py-4 text-base',
        size === 'xl' && 'px-6 py-6 text-xl',
        size === 'lg' && 'px-8 py-8 text-2xl'
    ]
        .filter(Boolean)
        .join(' ')

    const errorStyle = [size === 'sm' && 'text-sm', size === 'md' && 'text-base', size === 'xl' && 'text-xl', size === 'lg' && 'text-2xl'].filter(Boolean).join(' ')
    return (
        <Section direction="column">
            <Section direction="row" customStyle={`${label && labelIcon ? 'border' : ''} items-center rounded-xl`} gap="xs">
                {label && labelIcon ? (
                    <Section direction="row" customStyle="items-center gap-2 h-full p-2 w-1/3 rounded-l-xl border-r" color="primary">
                        <Icon name={labelIcon} />
                        <Text>{label}</Text>
                    </Section>
                ) : null}
                <TI
                    placeholder={placeholder}
                    className={style}
                    onChangeText={onChange}
                    keyboardType={inputText[0]}
                    inputMode={typeof inputText[1] !== 'boolean' ? inputText[1] : 'text'}
                    secureTextEntry={typeof inputText[1] === 'string' ? false : !showPassword ? true : false}
                    value={value}
                    onBlur={onBlur}
                    maxLength={37}
                    editable={disable ? !disable : !loading}
                >
                    {children ? <>{children}</> : null}
                </TI>
                {errors ? <Text customStyle={`absolute right-0 top-0 bg-danger rounded-md px-2 text-white ${errorStyle}`}>{errors}</Text> : null}
            </Section>
            {inputMode === 'password' ? (
                <Section padding="sm" direction="row">
                    <Link title={!showPassword ? 'Tampilkan' : 'Sembunyikan'} customStyle="absolute right-0 px-2" onPress={() => setShowPassword((prev) => !prev)} />
                </Section>
            ) : null}
        </Section>
    )
}
