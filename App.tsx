import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import notifee from '@notifee/react-native';

import { onDiplayNotification } from './src/services/notifications';

import { Task } from './src/utils/localStorage';
import { getRealm } from './src/databases/realm';
import { ECG } from './src/components/ECG';

const App = () => {
  // const [events, setEvents] = useState<Task[]>([]);
  // // const [loading, setLoading] = useState(true);

  // const initBackgroundFetch = useCallback(async () => {
  //   const onEvent = async (taskId: string) => {
  //     const data = {
  //       taskId,
  //       timestamp: new Date().toString(),
  //     };
  //     // setEvents(prevState => [...prevState, data]);
  //     await saveTask(data);
  //     await fetchGihubData();
  //     await onDiplayNotification();
  //     console.log('================', new Date(), '==============');
  //   };

  //   const onTimeout = async (taskId: string) => {
  //     BackgroundFetch.finish(taskId);
  //   };

  //   let status = await BackgroundFetch.configure(
  //     { minimumFetchInterval: 15, stopOnTerminate: false },
  //     onEvent,
  //     onTimeout,
  //   );

  //   console.log('[BackgroundFetch] configure status: ', status);
  // }, []);

  // async function saveTask(data) {
  //   const realm = await getRealm();
  //   try {
  //     realm.write(() => {
  //       const created = realm.create('Task', {
  //         _id: Math.random().toString(36).slice(2),
  //         name: data.taskId,
  //         created_at: data.timestamp,
  //       });

  //       console.log('Created', created);
  //     });
  //     realm.close();
  //   } catch (error) {
  //     console.log('Save Task', error);
  //   }
  //   // setEvents(prevState => [...prevState, data]);
  // }

  // async function fetchTasks() {
  //   try {
  //     const realm = await getRealm();

  //     const tasks = realm.objects<Task[]>('Task').toJSON();

  //     setEvents(tasks);

  //     realm.close();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function fetchGihubData() {
  //   const response = await fetch('https://api.github.com/users/luiz-gustavo0');
  //   const data = await response.json();

  //   console.log('Github Data', JSON.stringify(data, null, 2));
  // }

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  // useEffect(() => {
  //   initBackgroundFetch();
  // }, [initBackgroundFetch]);

  const [data, setData] = useState({
    amplitude: 0,
    timeStamp: new Date(),
  });

  // useEffect(() => {
  //   setInterval(() => {
  //     setData({
  //       amplitude: Math.floor(Math.random() * 100),
  //       timeStamp: new Date(),
  //     });
  //   }, 10);
  // }, []);

  return (
    <ECG
      height={100}
      width={370}
      amplitudeRange={{
        top: 100,
        bottom: 0,
      }}
      data={data}
      timeWidth={10000}
      scanBarWidth={1}
    />

    // <SafeAreaView>
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={styles.scrollView}>
    //     <View style={styles.body}>
    //       <View style={styles.sectionContainer}>
    //         <Text style={styles.sectionTitle}>BackgroundFetch Demo</Text>
    //       </View>
    //     </View>
    //   </ScrollView>
    //   <View style={styles.sectionContainer}>
    //     <FlatList
    //       data={events}
    //       renderItem={({ item }) => (
    //         <Text>
    //           [{item.name}]: {item.created_at.toString()}
    //         </Text>
    //       )}
    //       keyExtractor={item => item._id}
    //     />
    //   </View>
    //   </SafeAreaView>
  );
};

// BackgroundFetch.scheduleTask({
//   taskId: 'com.my.periodicTask',
//   delay: 30000, // milliseconds
//   forceAlarmManager: true,
//   periodic: true,
// });

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#f9f8f9',
  },
  body: {
    backgroundColor: '#fff',
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

export default App;
