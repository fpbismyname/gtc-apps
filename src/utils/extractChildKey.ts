export const extractChildKey = (arr: [string, any][], separator: '.' | '/') => {
    if (!Array.isArray(arr)) {
        arr = Object.entries(arr)
    }
    const Arr = arr.map(([key, value]) => {
        const extractedChildKey = key.includes(separator) ? key.split(separator).pop() : key
        return [extractedChildKey, value]
    })
    return Arr
}
