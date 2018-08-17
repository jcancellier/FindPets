import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = (props) => {
	return (
		<View style={styles.container}>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		flexDirection: 'column',   // 'column' is default direction
		position: 'relative',
		overflow: 'hidden'
	},
});

export { CardSection };