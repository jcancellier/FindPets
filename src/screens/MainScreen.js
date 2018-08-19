import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PetList from '../components/PetList';
import { Colors } from '../global';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: Colors.flat.clouds }}>
          <PetList navigation={this.props.navigation} />
        </View>
      </SafeAreaView>
    );
  }
};

