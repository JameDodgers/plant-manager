import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  Image,
  FlatList,
  Alert,
} from 'react-native'

import { loadPlants, PlantProps, removePlant } from '../../libs/storage'

import Header from '../../components/Header'
import PlantCardSecondary from '../../components/PlantCardSecondary'
import Load from '../../components/Load'

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

  const handleRemove = (plant : PlantProps) => {
    Alert.alert('Remover', `Desejaa remover a sua planta ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            
            setMyPlants((myPlants) => 
              myPlants.filter(item => item.id != plant.id)
            );
          } catch(e) {
            Alert.alert('Não foi possível remover! 😥')
          }
        }
      }
    ])
  }

  if(loading)
    return <Load />

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
              handleRemove={() => {
                handleRemove(item)
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default index