import React, { FC, useState } from 'react'
import { HelperText, TextInput as TI, TextInputProps } from 'react-native-paper'
import { styling, StylingType } from '~/src/constants/styleSheets'
import { IconNameType, useTheme } from '~/src/constants/useTheme'
import View from './View'

interface TextInputType extends TextInputProps {
    Style?: StylingType[]
    unDense?: boolean
    rightItem?: Partial<RightItemType>
}

interface RightItemType {
    icon: {
        name: IconNameType
        size?: number
    } | null
    text: string
    style: StylingType[]
    onPress: () => void
}

const TextInput: FC<TextInputType> = ({ Style, unDense, rightItem, ...rest }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const typeInputPassword = rest.textContentType === 'password'
    const { theme } = useTheme()
    return (
        <View>
            <TI
                {...rest}
                mode={rest.mode || 'outlined'}
                dense={!unDense}
                style={styling(...(Style || []))}
                secureTextEntry={typeInputPassword ? !showPassword : false}
                right={
                    rightItem?.icon ? (
                        <TI.Icon icon={rightItem?.icon?.name} size={rightItem?.icon?.size} onPress={rightItem?.onPress} />
                    ) : rightItem?.text && !typeInputPassword ? (
                        <TI.Affix text={rightItem?.text} textStyle={styling('textSm', ...(rightItem?.style || []), { color: theme.error })} onPress={rightItem?.onPress} />
                    ) : typeInputPassword ? (
                        <TI.Icon icon={!showPassword ? 'eye' : 'eye-off'} size={rightItem?.icon?.size} onPress={() => setShowPassword((prev) => !prev)} />
                    ) : null
                }
            />
            {typeInputPassword && rightItem?.text ? <HelperText type="error">{rightItem?.text}</HelperText> : null}
        </View>
    )
}

export default TextInput
