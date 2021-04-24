import AsyncStorage from '@react-native-async-storage/async-storage'
import { differenceInDays, differenceInMinutes, format } from 'date-fns';

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

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
  }
}

export async function savePlant(plant : PlantProps) : Promise<void> {
  try {
    const data = await AsyncStorage.getItem('@plantManager:plants');
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant
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

const mod = (n : number, m : number) => {
  return ((n % m) + m) % m;
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

      const aInterval = aPeriod / aTimes
      const bInterval = bPeriod / bTimes

      const aAbsoluteTime = mod(aMinutesSinceSave, Math.floor((aInterval * 1440)))
      const bAbsoluteTime = mod(bMinutesSinceSave, Math.floor((bInterval * 1440)))

      // const aMinutesAbsolute = (new Date(a.dateTimeNotification).getHours() * 60 + new Date(a.dateTimeNotification).getMinutes()) / 1000
      // const bMinutesAbsolute = (new Date(b.dateTimeNotification).getHours() * 60 + new Date(b.dateTimeNotification).getMinutes()) / 1000
      return (aAbsoluteTime - bAbsoluteTime)
    })

    return plantsSorted;
  }catch(e){
    throw new Error(e);
  }
}