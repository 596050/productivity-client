import { AsyncStorage } from "react-native";
// import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "UdaciCards:notifications";

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to study today!"
  };
}
export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayUTC = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  return todayUTC.toISOString().split("T")[0];
}

export function clearLocalNotification() {
  return Promise.resolve();
  // return Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
  return {
    title: "Study your flash cards!",
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  return Promise.resolve();
  // return Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
  //   if (status === "granted") {
  //     // Notifications.cancelAllScheduledNotificationsAsync();
  //     const tomorrow = new Date();
  //     // const tomorrow = Date.now() + 10000;
  //     tomorrow.setDate(tomorrow.getDate() + 1);
  //     tomorrow.setHours(20);
  //     tomorrow.setMinutes(0);
  //     return Notifications.scheduleLocalNotificationAsync(
  //       createNotification(),
  //       {
  //         time: tomorrow,
  //         repeat: "day"
  //       }
  //     );
  //   }
  //   return Promise.resolve();
  // });
}
