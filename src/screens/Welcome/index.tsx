import React from 'react'

import { 
	SafeAreaView,
	TouchableOpacity,
	Text,
	Image,
	View,
} from 'react-native'

import { NavigationProp, ParamListBase } from '@react-navigation/native'

import wateringImg from '../../assets/watering.png'

import { Feather } from '@expo/vector-icons'

import styles from './styles'

interface screenProps {
  navigation: NavigationProp<ParamListBase>
}

const index = ({ navigation } : screenProps) => {

	return(
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>
					Gerencie {'\n'}
					suas plantas de {'\n'}
					forma fácil {'\n'}
				</Text>
				<Image
					style={styles.image}
					resizeMode='contain'
					source={wateringImg}
				/>
				<Text style={styles.subtitle}>
					Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
				</Text>
				<TouchableOpacity 
					style={styles.button}
					activeOpacity={0.7}
					onPress={() => {
						navigation.navigate('UserIdentification')
					}}>
					<Text>
						<Feather 
							style={styles.buttonIcon}
							name='chevron-right'
						/>
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

export default index