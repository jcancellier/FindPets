import { Fonts, Colors } from '../global'
const styles = {
	headerTitleStyle: {
		fontSize: 21,
		fontFamily: Fonts.primary,
		color: Colors.flat.clouds,
		includeFontPadding: false,
		fontWeight: 'normal'
	},
	headerStyle: {
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 1 },
		shadowRadius: 5,
		borderBottomWidth: 0,
		backgroundColor: Colors.primary
	}
}

export default styles;