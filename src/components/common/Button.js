import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from './index'
import { Colors } from '../../global';


const Button = (props) => {
    return(
        <TouchableOpacity 
            onPress={props.onPress} 
            style={ 
                [props.selected ? styles.buttonSelected : styles.buttonNotSelected, styles.button, props.style, props.renderRightBorder ? {borderRightWidth: StyleSheet.hairlineWidth} : null ]
            } 
            disabled={props.selected}>
            <Text style={[styles.text, props.textStyle, props.selected ? styles.textSelected : null]} numberOfLines={1} adjustsFontSizeToFit>
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
    buttonSelected: {
        backgroundColor: Colors.primary,
    },
    buttonNotSelected: {
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
    textSelected: {
        color: Colors.flat.clouds
    },
    textNotSelected: {
    }
});

export { Button };