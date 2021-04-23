import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import Welcome from '../screens/Welcome'
import UserIdentification from '../screens/UserIdentification'
import Confirmation from '../screens/Confirmation'
import PlantSelect from '../screens/PlantSelect'
import PlantSave from '../screens/PlantSave'
import MyPlants from '../screens/MyPlants'

import colors from '../styles/colors'

const StackRoutes = createStackNavigator()

const index : React.FC = ({}) => (
  <StackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}>
      <StackRoutes.Screen
        name="Welcome"
        component={Welcome} 
      />
      <StackRoutes.Screen
        name="UserIdentification"
        component={UserIdentification} 
      />
      <StackRoutes.Screen
        name="Confirmation"
        component={Confirmation} 
      />
      <StackRoutes.Screen
        name="PlantSelect"
        component={PlantSelect} 
      />
      <StackRoutes.Screen
        name="PlantSave"
        component={PlantSave} 
      />
      <StackRoutes.Screen
        name="MyPlants"
        component={MyPlants} 
      />
  </StackRoutes.Navigator>
)

export default index