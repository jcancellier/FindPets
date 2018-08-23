import React from 'react';
import { Text as RNText } from 'react-native';

//Purpose: A text element that sets includeFontPadding to false by default to deal with custom font padding issues on Android
const Text = (props) => {
    return <RNText {...props} style={[props.style, { includeFontPadding: false }]} >{props.children}</RNText>
}

export { Text };