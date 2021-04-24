import React from 'react'

import {
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface ButtonProps extends TouchableOpacityProps{
	label: string;
}

export default ({label, ...TouchableOpacityProps } : ButtonProps) => {
	return(
		<TouchableOpacity 
			style={styles.container}
			activeOpacity={0.7}
			{...TouchableOpacityProps}>
			<Text style={styles.label}>
				{label}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.green,
		borderRadius: 16,
		height: 56,
	},
	label: {
		color: colors.white,
		fontFamily: fonts.heading,
		fontSize: 16,
	},
})