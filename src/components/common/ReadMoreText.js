import React from 'react';
import { Text, View, LayoutAnimation } from 'react-native';
import { LinkedText } from './LinkedText';


const maxLines = 1000;
const minLines = 8;

class ReadMoreText extends React.Component {
  state = {
    lines: minLines
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  _shouldRenderShowMoreText() {
    if (this.state.lines == minLines) {
      return (
        <LinkedText
          style={this.props.linkTextStyle}
          onPress={() => {
            this.setState({ lines: maxLines })
            LayoutAnimation.spring();
          }}>
          Read More
        </LinkedText>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View>
        <Text
          {...this.props}
          numberOfLines={this.state.lines}
        >
          {this.props.children}
        </Text>
        {this._shouldRenderShowMoreText()}
      </View>
    );
  }
}

export { ReadMoreText };