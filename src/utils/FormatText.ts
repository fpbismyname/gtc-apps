export const ConvertToPath = (value: string[] | '') => {
    const path = typeof value === 'object' ? value.join('/') : typeof value === 'string' ? value.split(' ').join('/') : ''
    const formattedArray = encodeURIComponent(path)
    return path
}

export const FormatUri = (value: string) => {
    const path = encodeURIComponent(value)
    return path
}

export const UpperCaseText = (value: string | string[]) => {
    if (typeof value !== 'string') return
    const splitText = value.includes('_') ? value.split('_') : [value]
    const ResultText = splitText.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    return ResultText
}
