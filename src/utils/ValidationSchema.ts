import * as Yup from 'yup'
import { textMessages } from '../constants/textMessages'

type MaxLenghtType = keyof typeof InputLength.maxLength

// Rules Lengh Schema Input
export const InputLength = {
    'minLength': {
        'text': 2,
        'username': 2,
        'title': 2,
        'description': 2,
        'email': 6,
        'password': 6,
        'phone': 4,
        'address': 10
    },
    'maxLength': {
        'text': 12,
        'username': 75,
        'title': 50,
        'description': 250,
        'email': 254,
        'password': 64,
        'phone': 16,
        'address': 200
    }
}

// setInputLength
export const setInputLength = (type: MaxLenghtType, lengthType: 'minLength' | 'maxLength') => {
    return InputLength[lengthType]?.[type]
}

// Validation Auth Schema
export const ValidationSchema = {
    RegisterField: Yup.object().shape({
        username: Yup.string()
            .required(textMessages.required)
            .min(setInputLength('username', 'minLength'), textMessages.tooShort(setInputLength('username', 'minLength')))
            .max(setInputLength('username', 'maxLength'), textMessages.tooLong(setInputLength('username', 'maxLength'))),
        phone_number: Yup.string()
            .required(textMessages.required)
            .matches(/^\d+$/, textMessages.phone)
            .min(setInputLength('phone', 'minLength'), textMessages.tooShort(setInputLength('phone', 'minLength')))
            .max(setInputLength('phone', 'maxLength'), textMessages.tooLong(setInputLength('phone', 'maxLength'))),
        email: Yup.string()
            .required(textMessages.required)
            .email(textMessages.email)
            .min(setInputLength('email', 'minLength'), textMessages.tooShort(setInputLength('email', 'minLength')))
            .max(setInputLength('email', 'maxLength'), textMessages.tooLong(setInputLength('email', 'maxLength'))),
        password: Yup.string()
            .required(textMessages.required)
            .min(setInputLength('password', 'minLength'), textMessages.tooShort(setInputLength('password', 'minLength')))
            .max(setInputLength('password', 'maxLength'), textMessages.tooLong(setInputLength('password', 'maxLength')))
    }),
    RegisterFieldNoRequired: Yup.object().shape({
        username: Yup.string()
            .min(setInputLength('username', 'minLength'), textMessages.tooShort(setInputLength('username', 'minLength')))
            .max(setInputLength('username', 'maxLength'), textMessages.tooLong(setInputLength('username', 'maxLength'))),
        phone_number: Yup.string()
            .matches(/^\d+$/, textMessages.phone)
            .min(setInputLength('phone', 'minLength'), textMessages.tooShort(setInputLength('phone', 'minLength')))
            .max(setInputLength('phone', 'maxLength'), textMessages.tooLong(setInputLength('phone', 'maxLength'))),
        email: Yup.string()
            .email(textMessages.email)
            .min(setInputLength('email', 'minLength'), textMessages.tooShort(setInputLength('email', 'minLength')))
            .max(setInputLength('email', 'maxLength'), textMessages.tooLong(setInputLength('email', 'maxLength'))),
        password: Yup.string()
            .min(setInputLength('password', 'minLength'), textMessages.tooShort(setInputLength('password', 'minLength')))
            .max(setInputLength('password', 'maxLength'), textMessages.tooLong(setInputLength('password', 'maxLength')))
    }),
    LoginField: Yup.object().shape({
        email: Yup.string()
            .required(textMessages.required)
            .email(textMessages.email)
            .min(setInputLength('email', 'minLength'), textMessages.tooShort(setInputLength('email', 'minLength')))
            .max(setInputLength('email', 'maxLength'), textMessages.tooLong(setInputLength('email', 'maxLength'))),
        password: Yup.string()
            .required(textMessages.required)
            .min(setInputLength('password', 'minLength'), textMessages.tooShort(setInputLength('password', 'minLength')))
            .max(setInputLength('password', 'maxLength'), textMessages.tooLong(setInputLength('password', 'maxLength')))
    })
}
