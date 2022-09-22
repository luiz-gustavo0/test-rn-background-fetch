import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageData = {
  taskId: string;
  timestamp: string;
};

const KEY_STORAGE = '@myApp';

export const setLocalStorageData = async (value: StorageData[]) => {
  try {
    await AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorageData = async (): Promise<
  StorageData[] | undefined
> => {
  try {
    const storageData = await AsyncStorage.getItem(KEY_STORAGE);

    return JSON.parse(storageData as string);
  } catch (error) {
    console.log(error);
  }
};
