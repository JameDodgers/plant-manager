import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native'

import { loadPlants, PlantProps } from '../../libs/storage'

import Header from '../../components/Header'
import PlantCardSecondary from '../../components/PlantCardSecondary'

import waterDropImg from '../../assets/waterdrop.png'

import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'

import styles from './styles'

const index = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>('');

  const loadStoragedData = async () => {
    const plantsStoraged = await loadPlants();
    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      {locale: pt}
    );
    
    setNextWatered(`Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}`)
    setMyPlants(plantsStoraged)
    setLoading(false)
  }

  useEffect(() => {
    loadStoragedData()
  }, [])

  useEffect(() => {
    const reloadData = setTimeout(() => {
      loadStoragedData()
    }, 60 * 1000);

    return () => {
      clearTimeout(reloadData)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image
          style={styles.spotlightImage}
          source={waterDropImg}
        />
        <Text style={styles.spotlightText}>
          {nextWatered}
        </Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default index