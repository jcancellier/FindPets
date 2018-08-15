import React from 'react';
import { View, StyleSheet } from 'react-native';

//functional component
const Card = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 11,
        elevation: 5,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 40,
        backgroundColor: '#fff',
        marginBottom: 10
    }
});

export { Card };