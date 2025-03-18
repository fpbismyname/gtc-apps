import React, { ChangeEvent } from 'react'
import { TextInputProps, TextInput as TI } from 'react-native'
import { colorType } from '../../../types/typeStyle'
import { inputMode } from '~/src/types/inputMode'
import Section from './Section'
import Text from './Text'
import { FormikErrors } from 'formik'

interface textInputType {
    placeholder: string
    color?: colorType
    size?: 'sm' | 'md' | 'xl' | 'lg'
    onChange?: (e: string) => void
    onBlur?: (e: any) => void
    inputMode?: inputMode
    value?: string
    expand?: boolean
    disabled?: boolean
    errors?: string
}

export default function TextInput({
    placeholder,
    inputMode = 'default',
    color,
    size = 'sm',
    onChange,
    onBlur,
    value,
    disabled = false,
    expand,
    errors
}: textInputType) {
    let inputText: any = []

    if (inputMode === 'default') inputText = ['default', 'text']
    if (inputMode === 'numeric') inputText = ['numeric', 'numeric']
    if (inputMode === 'email') inputText = ['default', 'email']
    if (inputMode === 'search') inputText = ['web-search', 'search']
    if (inputMode === 'password') inputText = ['default', true]

    const style = [
        'flex rounded-xl placeholder-inactive outline-0 border focus:bg-primary',
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

    return (
        <Section>
            <TI
                placeholder={placeholder}
                className={style}
                onChangeText={onChange}
                keyboardType={inputText[0]}
                inputMode={typeof inputText[1] !== 'boolean' ? inputText[1] : 'text'}
                secureTextEntry={typeof inputText[1] === 'string' ? false : true}
                value={value}
                onBlur={onBlur}
                editable={!disabled}
            />
            {errors ? <Text customStyle="absolute right-0 bg-danger rounded-md px-2 text-white">{errors}</Text> : null}
        </Section>
    )
}
