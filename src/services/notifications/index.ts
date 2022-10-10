import notifee, { Notification } from '@notifee/react-native';

export async function onDiplayNotification() {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'backgroundTask',
    name: 'Background Task',
  });

  await notifee.displayNotification({
    title: 'Tarefa concluída',
    body: 'Sua tarefa foi concluída com sucesso',
    android: {
      channelId,
      actions: [
        {
          title: 'Visualizar',
          pressAction: {
            id: 'open-app',
            launchActivity: 'default',
          },
        },
      ],
    },
  });
}
