import React from 'react'

import {
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps
} from 'react-native'

import colors from '../styles/colors'

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
		paddingHorizontal: 10,
		borderRadius: 16,
		height: 56,
		marginBottom: 10,
	},
	label: {
		color: colors.white,
		fontSize: 24,
	},
})