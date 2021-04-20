import React from 'react'

import { 
	SafeAreaView,
	StyleSheet,
	Text,
	Image,
} from 'react-native'

import wateringImg from '../../assets/watering.png'

import Button from '../../components/Button'

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
				source={wateringImg}
			/>
			<Text style={styles.subtitle}>
				Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
			</Text>
			<Button
				title=">"
				onPress={() => {

				}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
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
		height: 284,
		width: 292,
	},
	subtitle: {
		fontSize: 17,
		color: colors.heading,
		textAlign: 'center',
		paddingHorizontal: 20,
	},
})

export default index