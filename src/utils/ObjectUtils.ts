export const FlattenObject = (obj: any, prefix: any = '', result: [string, any][] = []) => {
    for (const key in obj) {
        const value = obj[key]
        const fullKey = prefix ? `${prefix}.${key}` : key
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            FlattenObject(value, fullKey, result)
        } else {
            result.push([fullKey, value])
        }
    }
    return result
}
