import React from 'react'

import { 
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	Dimensions,
} from 'react-native'

import wateringImg from '../../assets/watering.png'

import { Feather } from '@expo/vector-icons'

import colors from '../../styles/colors'

const index = () => {
	return(
		<SafeAreaView style={styles.container}>
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
				onPress={() => [

				]}>
				<Text>
					<Feather 
						style={styles.buttonIcon}
						name='chevron-right'
					/>
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	title:{
		fontSize:32,
		marginTop: 38,
		fontWeight: 'bold',
		color: colors.heading,
		textAlign: 'center',
	},
	image: {
		width: Dimensions.get('window').width * 0.7,
	},
	subtitle: {
		fontSize: 17,
		color: colors.heading,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors.green,
		height: 56,
		width: 56,
		marginBottom: 10,
	},
	buttonIcon: {
		color: colors.white,
		fontSize: 24,
	},
})

export default index