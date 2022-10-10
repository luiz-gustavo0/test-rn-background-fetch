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
import notifee, { EventType } from '@notifee/react-native';

import { onDiplayNotification } from './src/services/notifications';

import { StorageData } from './src/utils/localStorage';

const App = () => {
  const [events, setEvents] = useState<StorageData[]>([]);
  const [loading, setLoading] = useState(true);

  const initBackgroundFetch = useCallback(async () => {
    const onEvent = async (taskId: string) => {
      const data = {
        taskId,
        timestamp: new Date().toString(),
      };
      // setEvents(prevState => [...prevState, data]);
      await saveTask(data);
      await onDiplayNotification();
      console.log(data);
    };

    const onTimeout = async (taskId: string) => {
      BackgroundFetch.finish(taskId);
    };

    let status = await BackgroundFetch.configure(
      { minimumFetchInterval: 15, stopOnTerminate: false },
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  }, []);

  async function saveTask(data) {
    setEvents(prevState => [...prevState, data]);
  }

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification,
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction,
      );
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  useEffect(() => {
    initBackgroundFetch();
  }, [initBackgroundFetch]);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>BackgroundFetch Demo</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.sectionContainer}>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <Text>
              [{item.taskId}]: {item.timestamp}
            </Text>
          )}
          keyExtractor={item => item.timestamp}
        />
      </View>
    </SafeAreaView>
  );
};

BackgroundFetch.scheduleTask({
  taskId: 'com.my.periodicTask',
  delay: 30000, // milliseconds
  forceAlarmManager: true,
  periodic: true,
});

const styles = StyleSheet.create({
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
