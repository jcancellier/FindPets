import React from 'react';
import { View } from 'react-native';

const CenteredView = (props) => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			{props.children}
		</View>
	);
}

export { CenteredView };