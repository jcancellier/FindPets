import React, { Component } from 'react';
import { FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PetListItem from './PetListItem';

//class component
export default class PetList extends Component {
  _fetchData = () => {
    this.props.fetchPets();
  }

  _renderPet = ({ item, index }) => {
    return <PetListItem pet={item}
      onPress={() => this.props.navigation.navigate('PetDetails', {
        id: item.id.$t.toString(),
        name: item.name.$t,
        breed: item.breeds.breed.$t || item.animal.$t,
        image: (item.media.photos) ? item.media.photos.photo[2].$t : '',
        description: item.description.$t || 'No description :(',
        email: item.contact.email.$t,
        phone: item.contact.phone.$t
      })}
    />;
  }

  render() {
    return (
      <Animatable.View animation="fadeIn" style={{ flex: 1 }}>
        <FlatList
          data={this.props.pets}
          renderItem={this._renderPet}
          keyExtractor={item => item.id.$t.toString()}
        //TODO: possibly enable this line to prevent console warning: 'virtualizedList ...etc'
        // disableVirtualization={false}
        />
      </Animatable.View>
    );
  }
};