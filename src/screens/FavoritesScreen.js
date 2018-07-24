import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class FavoritesScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Favorites</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    }
});