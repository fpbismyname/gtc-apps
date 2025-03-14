import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string):Promise<string|null> => {
    try{
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch {
        return null
    }
};

export const setItem = async (key:string, value:string): Promise<boolean> => {
    try{
        await AsyncStorage.setItem(key, value)
        return true
    } catch{
        return false
    }
}

export const deleteAllItem = async (): Promise<boolean> => {
    try{
        await AsyncStorage.clear()
        return true
    } catch{
        return false
    }
}

export const deleteItem = async (key:string): Promise<boolean> => {
    try{
        await AsyncStorage.removeItem(key)
        return true
    } catch{
        return false
    }
}
