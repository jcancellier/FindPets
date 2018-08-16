//Purpose: A text element that sets includeFontPadding to false by default to deal with custom font padding issues on Android
import React from 'react';
import { Text as RNText } from 'react-native';

const Text = (props) => {
    return <RNText style={[props.style, { includeFontPadding: false }]}>{props.children}</RNText>
}



export { Text };