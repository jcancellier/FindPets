import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Fonts } from '../../global';

const LinkedText = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={props.style}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

export { LinkedText };