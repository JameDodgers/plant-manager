import {
  Dimensions,
    StyleSheet,
} from 'react-native'

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const styles = StyleSheet.create({
  container: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	title:{
		fontSize: 28,
		fontFamily: fonts.heading,
		lineHeight: 34,
		marginTop: 38,
		color: colors.heading,
		textAlign: 'center',
	},
	image: {
		width: Dimensions.get('window').width * 0.8,
	},
	subtitle: {
		fontSize: 17,
		fontFamily: fonts.text,
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
		fontSize: 34,
		color: colors.white,
	},
});
  
export default styles