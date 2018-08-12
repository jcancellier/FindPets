import React from 'react';
import { Text, View, LayoutAnimation } from 'react-native';
import ReadMore from 'react-native-read-more-text';
import { LinkedText } from './LinkedText';

class ReadMoreText extends React.Component {
  _renderReadMoreTextFooter = (handlePress) => {
    return (
      <LinkedText style={this.props.readMoreTextStyle} onPress={handlePress}>
        Read more
		  </LinkedText>
    );
  }

  render() {
    return (
      <ReadMore
        numberOfLines={this.props.numberOfLines || 0}
        renderTruncatedFooter={this.props.renderTruncatedFooter || this._renderReadMoreTextFooter}
        renderRevealedFooter={this.props.renderRevealedFooter || (() => null)}
      >
        <Text style={this.props.contentTextStyle}>
          {this.props.children}
        </Text>
      </ReadMore>
    );
  }
}

export { ReadMoreText };