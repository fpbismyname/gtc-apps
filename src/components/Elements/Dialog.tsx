import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Dialog as DG, DialogProps, Portal } from 'react-native-paper'
import LoadingScreen from './LoadingScreen'
import { IconNameType } from '~/src/constants/useTheme'
import TextInput from './TextInput'
import { styling } from '~/src/constants/styleSheets'
import Button from './Button'
import { getIconKey, getLabelKey } from '~/src/utils/defaultValueKeyorValue'

interface DialogType extends DialogProps {
    type: 'form' | 'alert'
    setVisible: Dispatch<SetStateAction<any>>
    visible: boolean
    title: string
    onSubmitFormDialog: (data: any) => void
}

const Dialog: FC<DialogType> = ({ type, setVisible, title, visible = false, onSubmitFormDialog, ...rest }) => {
    if (type === 'form') {
        const formInitialValues = { [title]: '' }
        const [formValues, setFormValues] = useState<typeof formInitialValues>(formInitialValues)
        const [valueInput, setValueInput] = useState<string>('')
        const titleDialog = title && title.includes('social_media.') ? title.replace('social_media.', '') : title
        // error value
        const [errorValue, setErrorValue] = useState<boolean>(false)
        // Set form values
        useEffect(() => {
            setFormValues({ [title]: valueInput })
        }, [valueInput])
        return (
            <Portal>
                <DG visible={visible} style={styling('w25', 'selfCenter', 'roundedXl')} {...rest}>
                    <DG.Icon icon={getIconKey(titleDialog || '')} size={32} />
                    <DG.Title style={styling('selfCenter')}>{title ? `Edit ${getLabelKey(titleDialog)}` : <LoadingScreen children />}</DG.Title>
                    <DG.Content>
                        <TextInput style={styling('itemsCenter')} error={errorValue} onChangeText={(text) => setValueInput(text)} value={valueInput} />
                    </DG.Content>
                    <DG.Actions style={styling('justifyCenter', 'gap2')}>
                        <Button icon={'close' as IconNameType} onPress={() => setVisible(false)}>
                            Batal
                        </Button>
                        <Button
                            icon={'check' as IconNameType}
                            onPress={() => {
                                if (valueInput) {
                                    setVisible(null)
                                    onSubmitFormDialog(formValues)
                                } else {
                                    setErrorValue(true)
                                }
                            }}
                        >
                            Submit
                        </Button>
                    </DG.Actions>
                </DG>
            </Portal>
        )
    }
}

export default Dialog
