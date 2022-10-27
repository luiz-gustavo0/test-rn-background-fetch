import Realm from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageData = {
  _id: string;
  name: string;
  created_at: string;
};

export type Task = StorageData & Realm.Object;

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
