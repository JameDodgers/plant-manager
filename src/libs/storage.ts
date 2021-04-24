import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Notifications from 'expo-notifications'

import { differenceInMinutes, format } from 'date-fns';

import { mod } from '../util/functions';

export interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  },
  dateTimeNotification: Date;
  hour: string;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string;
  }
}

export async function savePlant(plant : PlantProps) : Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency

    if(repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    }

    const seconds = Math.abs(
      (Math.ceil(now.getTime() - nextTime.getTime())) / 1000)

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌿',
        body: `Está na hora de cuidar da sua planta ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      }
    })

    const data = await AsyncStorage.getItem('@plantManager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId 
      }
    }

    await AsyncStorage.setItem('@plantManager:plants',
    JSON.stringify({
      ...newPlant,
      ...oldPlants
    }))
  }catch(e){
    throw new Error(e);
  }
}

export async function loadPlants() : Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants).map((plant) => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
      }
    })
    .sort((a, b) => {

      const period = {
        day: 1,
        week: 7
      }

      const aMinutesSinceSave = differenceInMinutes(new Date(a.dateTimeNotification), new Date())
      const bMinutesSinceSave = differenceInMinutes(new Date(b.dateTimeNotification), new Date())
    
      const aPeriod = period[a.frequency.repeat_every as keyof typeof period]
      const bPeriod = period[b.frequency.repeat_every as keyof typeof period]

      const aTimes = a.frequency.times
      const bTimes = b.frequency.times

      const aInterval = Math.trunc(aPeriod / aTimes)
      const bInterval = Math.trunc(bPeriod / bTimes)

      const aAbsoluteTime = mod(aMinutesSinceSave, (aInterval * 1440))
      const bAbsoluteTime = mod(bMinutesSinceSave, (bInterval * 1440))

      return (aAbsoluteTime - bAbsoluteTime)
    })

    return plantsSorted;
  }catch(e){
    throw new Error(e);
  }
}

export async function removePlant(id: string) : Promise<void> {
  const data = await AsyncStorage.getItem('@plantManager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)

  delete plants[id];

  await AsyncStorage.setItem(
    '@plantManager:plants',
    JSON.stringify(plants));
}