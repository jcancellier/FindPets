// import a library to help create a component
import React from 'react';
import { View } from 'react-native';

import PetList from '../components/PetList';

// create a component
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PetList navigation={this.props.navigation}/>
      </View>
    );
  }
};

