import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './index'
import { Colors } from '../../global';


const Button = (props) => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={
				[
					styles.button,
					props.disabled ? styles.buttonDisabled : styles.buttonEnabled,
					props.disabled ? props.disabledStyle : props.style,
					props.renderRightBorder ? { borderRightWidth: StyleSheet.hairlineWidth } : null
				]
			}
			disabled={props.disabled}>
			<Text style={[styles.text, props.disabled ? styles.textDisabled : null, props.textStyle,]} numberOfLines={1} adjustsFontSizeToFit>
				{props.children}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		justifyContent: 'center'
	},
	buttonEnabled: {
		backgroundColor: Colors.primary,
	},
	buttonDisabled: {
		backgroundColor: 'white'
	},
	text: {
		alignSelf: 'center',
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 3,
		paddingRight: 3
	},
	textDisabled: {
		color: Colors.flat.clouds
	},
	textEnabled: {
	}
});

export { Button };