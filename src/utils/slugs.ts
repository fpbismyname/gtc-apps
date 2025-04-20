export const slugsMaker = (value: string | string[]) => {
    if (typeof value !== 'string') return
    const slugResult = value
        .split(' ')
        .map((word) => word.toLowerCase())
        .join('-')
    return slugResult
}

export const titleFromSlug = (value: string | string[]) => {
    if (typeof value !== 'string') return
    const titleResult = value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    return titleResult
}
