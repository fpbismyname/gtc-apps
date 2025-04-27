import { IconNameType } from '../constants/useTheme'
import * as Linking from 'expo-linking'

export const accountInfoIconMap: Record<string, string> = {
    username: 'tag',
    email: 'email',
    password: 'asterisk',
    phone_number: 'whatsapp',
    expiration_date: 'clock'
}
export const accountInfoLabelMap: Record<string, string> = {
    username: 'Nama pengguna',
    email: 'Alamat email',
    password: 'Password',
    phone_number: 'No. Whatsapp',
    expiration_date: 'Masa berlaku'
}
export const convertPassToAsterisk = (pass: string, length?: number) => {
    if (!pass) return null
    const password = '*'.repeat(length || 8)
    return password
}
export const getAccountInfoIcon = (key: string) => accountInfoIconMap[key || ('information' as IconNameType)]

export const getAccountInfoLabel = (key: string) => accountInfoLabelMap[key || ('information' as IconNameType)]

// ICon & label maps
export const iconKeyMap: Record<string, string> = {
    established_at: 'calendar-check',
    email: 'email-outline',
    slogan: 'format-quote-close',
    social_media: 'share-variant',
    name: 'office-building',
    logo: 'image-outline',
    address: 'map-marker',
    maps: 'google-maps',
    instagram: 'instagram',
    phone_number: 'whatsapp',
    website: 'web'
}
export const titleLabelMap: Record<string, string> = {
    established_at: 'Didirikan pada',
    email: 'Email',
    slogan: 'Slogan',
    social_media: 'Media Sosial',
    name: 'Nama Institusi',
    logo: 'Logo',
    address: 'Alamat',
    maps: 'Lokasi lembaga',
    instagram: 'Instagram',
    phone_number: 'No. WhatsApp',
    website: 'Website Resmi'
}
export const linkInstitution: Record<string, (value: string) => void> = {
    email: (value: string) => Linking.openURL(`mailto:${value}`),
    maps: (value: string) => {
        Linking.openURL(value)
    },
    instagram: (value: string) => Linking.openURL(`https://instagram.com/${value.replace('@', '')}`),
    phone_number: (value: string) => {
        const phoneNumber = value.replace(/^0/, '62')
        Linking.openURL(`https://wa.me/${phoneNumber}`)
    },
    website: (value: string) => Linking.openURL(`https://${value}`)
}
export const getLinkKey = (key: string, value: string) => {
    linkInstitution[key]?.(value)
}
export const getIconKey = (key: string) => iconKeyMap[key] || 'information-outline'
export const getLabelKey = (key: string) => titleLabelMap[key] || 'informasi'
export const checkKeyForDefaultValue = (key: string, value: string) => {
    if (key === 'maps') return 'Klik untuk cek lokasinya'
    return value
}
