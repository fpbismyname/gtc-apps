const cleanWordFromNested = (values: string) => {
    const splitWord = values.split('.')
    const getLastWord = splitWord[splitWord.length - 1]
    return getLastWord
}

export default cleanWordFromNested
