import React from 'react'

import {
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps
} from 'react-native'

import colors from '../styles/colors'

interface ButtonProps extends TouchableOpacityProps{
	title: string;
}

export default ({title, ...TouchableOpacityProps } : ButtonProps) => {
	return(
		<TouchableOpacity 
			style={styles.container}
			activeOpacity={0.7}
			{...TouchableOpacityProps}>
			<Text style={styles.buttonText}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors.green,
		height: 56,
		width: 56,
		marginBottom: 10,
	},
	buttonText: {
		color: colors.white,
		fontSize: 24,
	},
})