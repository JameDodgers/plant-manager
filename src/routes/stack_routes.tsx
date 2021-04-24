import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import AuthRoutes from './tab_routes'

import Welcome from '../screens/Welcome'
import UserIdentification from '../screens/UserIdentification'
import Confirmation from '../screens/Confirmation'
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
        component={AuthRoutes} 
      />
      <StackRoutes.Screen
        name="PlantSave"
        component={PlantSave} 
      />
      <StackRoutes.Screen
        name="MyPlants"
        component={AuthRoutes} 
      />
  </StackRoutes.Navigator>
)

export default index