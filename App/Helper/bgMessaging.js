// @flow
import firebase from 'react-native-firebase';
// Optional flow type
import type { RemoteMessage } from 'react-native-firebase';

export default async (data: RemoteMessage) => {
    // handle your message
    const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
    })
      .setNotificationId(data.messageId ? data.messageId : data.notificationId)
      .setTitle(data.title ? data.title : data.data.title)
      .setBody(data.body ? data.body : data.data.body)
      .setSound('notif.mp3')
      .android.setChannelId('ayodhya-channel')
      .android.setSmallIcon('ic_launcher')
      .android.setColorized(true)
      .android.setColor('#00a8ff')
      .android.setOnlyAlertOnce(true)
      .android.setVibrate([1000, 1000])
      .android.setDefaults([firebase.notifications.Android.Defaults.Vibrate])
      .android.setPriority(firebase.notifications.Android.Priority.High);

    firebase.notifications().displayNotification(localNotification);

    return Promise.resolve();
}
