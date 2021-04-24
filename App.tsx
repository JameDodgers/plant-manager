import React, { useEffect } from 'react';

import * as Notifications from 'expo-notifications'

import AppLoading from 'expo-app-loading'

import Routes from './src/routes'

import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost'

import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  // Check for scheduled notifications
  // useEffect(() => {
  //   const notifications = async () => {
  //     const data = await Notifications.getAllScheduledNotificationsAsync()
  //     console.log('Notificações agendadas:')
  //     console.log(data)
  //   }

  //   notifications()
  // }, [])

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data);
      }
    )
  
    return () => subscription.remove();
  }, [])

  if(!fontsLoaded){
    return <AppLoading />;
  }

  return (
    <Routes />
  );
}

