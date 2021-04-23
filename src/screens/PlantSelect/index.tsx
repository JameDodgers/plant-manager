import React, { useEffect, useState } from 'react'

import {
  StyleSheet, 
  View, 
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native'

import { 
  // useNavigation, 
  NavigationProp, 
  ParamListBase 
} from '@react-navigation/native'

import api from '../../services/axios'

import Header from '../../components/Header'

import EnvironmentButton from '../../components/EnvironmentButton'

import Load from '../../components/Load'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import PlantCardPrimary from '../../components/PlantCardPrimary'

interface screenProps {
  name: string
  navigation: NavigationProp<ParamListBase>
}

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

const index = ({ navigation } : screenProps) => { 
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    const fetchEnvironment = async () => {
      const { data } = await api.get('plants_environments?_sort=title');

      setEnvironments([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    fetchEnvironment()
  }, [])

  const fetchPlants = async () => {
    const { data } = await api.get(`plants?_sort=name&_page=${page}&_limit=8`);

    if(!data)
      return setLoading(true)

    if(page > 1) {
      setPlants(plants => [...plants, ...data])
      setFilteredPlants(filteredPlants => [...filteredPlants, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);  
    }

    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    fetchPlants()
  }, [])

  const handleEnvironmentSelected = (environment : string) => {
    setEnvironmentSelected(environment);

    if(environment == 'all')
      return setFilteredPlants(plants);
    
      const filtered = plants.filter(plant => 
        plant.environments.includes(environment)
      );

      setFilteredPlants(filtered);
  }

  const handleFetchMore = (distance : number) => {
    if(distance < 1)
      return;

    setLoadingMore(true);
    setPage(page => page + 1);
    fetchPlants();
  }

  const handlePlantSelect = (plant: PlantProps) => {
    navigation.navigate('PlantSave', { plant });
  }

  if(loading)
    return <Load />
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View>
        <FlatList
          data={environments}
          keyExtractor={item => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton 
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => {
                handlePlantSelect(item)
                // navigation.navigate('PlantSave', { plant: item }); // Alternative way
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => 
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore 
            ? <ActivityIndicator color={colors.green} />
            : <></>
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
    paddingRight: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  }
})

export default index