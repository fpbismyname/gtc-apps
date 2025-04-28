const cleanWordFromNested = (values: string, getWhichWord: 'first' | 'last' = 'last') => {
    const splitWord = values.split('.')
    if (getWhichWord === 'first') {
        const getLastWord = splitWord.shift()
        return getLastWord
    }
    if (getWhichWord === 'last') {
        const getLastWord = splitWord.pop()
        return getLastWord
    }
}

export default cleanWordFromNested
