export const ConvertToPath = (value: string[] | '') => {
    const path = typeof value === 'object' ? value.join('/') : typeof value === 'string' ? value.split(' ').join('/') : ''
    const formattedArray = encodeURIComponent(path)
    return path
}

export const FormatPath = (value: string) => {
    const path = encodeURIComponent(value)
    return path
}
