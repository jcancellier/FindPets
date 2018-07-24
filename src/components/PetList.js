import React, { Component } from 'react';
import { View, FlatList, LayoutAnimation, Text, StyleSheet } from 'react-native';
import { Fonts } from '../global';
import { connect } from 'react-redux';
import { DotIndicator } from 'react-native-indicators';
import { CenteredView, LinkedText } from '../components/common';
import { Colors } from '../global'
import PetListItem from './PetListItem';
import { fetchPets } from '../actions';
import { url } from '../api'
import { store } from '../store';

var CustomLayoutSpring = {
	duration: 500,
	create: {
		type: LayoutAnimation.Types.easeOut,
		property: LayoutAnimation.Properties.opacity,
		springDamping: 0.1,
	},
	delete: {
		type: LayoutAnimation.Types.easeOut,
		property: LayoutAnimation.Properties.opacity,
	}
};

//class component
class PetList extends Component {

	componentWillUpdate() {
		//LayoutAnimation.linear();
		//LayoutAnimation.configureNext(CustomLayoutSpring);
	}

	componentDidMount() {
		this._fetchData();
	}

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
				description: item.description.$t,
				email: item.contact.email.$t,
				phone: item.contact.phone.$t
			})}
		/>;
	}

	render() {
		//console.log(store.getState());
		//TODO: when searching for a pet and no pets are received back then the next time you search for an animal this if-statement crashes the app
		// the error it gives is "undefined is not an object (evaluating 'this.props.pets.length'"
		// if (this.props.isLoading && this.props.pets.length == 0) {
		if (this.props.isLoading) {
			return (
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<DotIndicator count={5} color={Colors.primary} />
				</View>
			);
			//TODO
			//if there is only 1 item in api-call response then this.props.pets won't be an array
			//which would cause an error passing it into to FlatList (data={this.props.pets}) thus
			//I check if it is an array before passing it in meaning if there's only 1 pet to show
			//then nothing will show
		} else if (Array.isArray(this.props.pets)) {
			return (
				<FlatList
					data={this.props.pets}
					renderItem={this._renderPet}
					keyExtractor={item => item.id.$t.toString()}
					// onRefresh={() => this._fetchData()}
					// refreshing={this.props.isLoading}
					//TODO: possibly enable this line to prevent console warning: 'virtualizedList ...etc'
					// disableVirtualization={false}
				/>
			);
		} else if(!this.props.isLoading) {
			return (
				<CenteredView>
					<Text style={styles.noPetsText}>
						No Pets Found :(
          </Text>
					<LinkedText 
						onPress={() => this.props.navigation.navigate('Filter')}
						style={styles.linkedText}
					>
						Try a different filter
					</LinkedText>
				</CenteredView>
			);
		} else return null;
	}
};

const styles = StyleSheet.create({
	noPetsText: {
		fontFamily: Fonts.primary, 
		fontSize: 25
	},
	linkedText: {
		color: Colors.material.blue500,
		fontFamily: Fonts.primary,
		fontSize: 15
	}
})


const mapStateToProps = (state) => {
	return {
		isLoading: state.pets.isLoading,
		pets: state.pets.posts
	}
}

export default connect(mapStateToProps, {
	fetchPets
})(PetList);