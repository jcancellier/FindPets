import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { Fonts } from '../global';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { DotIndicator, PacmanIndicator } from 'react-native-indicators';
import { CenteredView, LinkedText } from '../components/common';
import { Colors } from '../global'
import PetListItem from './PetListItem';
import { fetchPets } from '../actions';
import Fab from './common/Fab';

//class component
class PetList extends React.PureComponent {

	scrollOffset = 0;

	state = {
		fabVisible: false,
	}

	componentDidMount() {
		this._fetchData();
	}

	_fetchData = () => {
		this.props.fetchPets(true);
	}

	_onScrollStart = (event) => {
		// console.log(event.nativeEvent.contentOffset.y);
		// this.setState({scrollPosition: event.nativeEvent.contentOffset.y})
		// if(event.nativeEvent.contentOffset.y > 100 && this.state.fabVisible == false){
		// 	this.fab.show();
		// 	console.log('showing fab')
		// }
		// else if(event.nativeEvent.contentOffset.y <=100 && this.state.fabVisible == true){
		// 	this.fab.hide();
		// 	console.log('showing fab')
		// }
		const currentOffset = event.nativeEvent.contentOffset.y;
		if (currentOffset > 0 && currentOffset < 1000) {
			console.log('hide it!!!!');
			if (this.state.fabVisible) {
				this.fab.hide()
				return;
			}
		}


		const dif = currentOffset - (this.scrollOffset || 0);

		if (Math.abs(dif) < 3) {
			//unclear
		} else if (dif < 0) {
			// scrolling up
			if (this.state.fabVisible == false && currentOffset >= 1000)
				this.fab.show()
		} else {
			//scrolling down
			if (this.state.fabVisible)
				this.fab.hide()
		}

		this.scrollOffset = currentOffset;
	}

	_onScrollEndReached = () => {
		if (this.props.disableMorePetsFetch)
			return;
		if (!this.props.isMorePetsLoading)
			this.props.fetchPets(false)
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

	_scrollListToTop = () => {
		this.list.scrollToIndex({
			animated: true,
			index: 0,
			viewOffset: 0,
			viewPosition: 0
		})
		if (this.state.fabVisible)
			this.fab.hide();
	}

	_renderListFooter = () => {
		if (this.props.isMorePetsLoading)
			return <PacmanIndicator color={Colors.primary} />
		return null;
	}

	_renderNoContent = () => {
		return (
			<View style={{ flex: 1 }}>
				<CenteredView>
					<Image source={require('../../assets/icons/not-found.png')} style={styles.noPetsImage} />
					<Text style={styles.noPetsText}>
						No Pets Found :(
					</Text>
				</CenteredView>
				<View style={{ justifyContent: 'flex-start', flex: 1, alignItems: 'center' }}>
					<LinkedText
						onPress={() => this.props.navigation.navigate('Filter')}
						style={styles.linkedText}
					>
						Try a different filter
					</LinkedText>
					<Text style={styles.orText}>or</Text>
					<LinkedText
						onPress={() => this.props.navigation.navigate('SetLocation')}
						style={styles.linkedText}
					>
						Change your location
					</LinkedText>
				</View>
			</View>
		);
	}


	render() {
		//TODO: when searching for a pet and no pets are received back then the next time you search for an animal this if-statement crashes the app
		// the error it gives is "undefined is not an object (evaluating 'this.props.pets.length'"
		if (this.props.isLoading && this.props.pets.length == 0) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<DotIndicator count={5} color={Colors.primary} style={{ flex: 0, marginBottom: 10 }} />
					<View style={styles.loadingTextContainer}>
						{this.props.zipcode &&
							<Text style={styles.loadingText}>
								{`Searching near ${this.props.zipcode}`}
							</Text>
						}
					</View>
				</View>
			);
			//TODO
			//if there is only 1 item in api-call response then this.props.pets won't be an array
			//which would cause an error passing it into to FlatList (data={this.props.pets}) thus
			//I check if it is an array before passing it in meaning if there's only 1 pet to show
			//then nothing will show
		} else if (Array.isArray(this.props.pets)) {
			return (
				<Animatable.View animation="fadeIn">
					<FlatList
						data={this.props.pets}
						renderItem={this._renderPet}
						extraData={[this.props.pets, this.props.isMorePetsLoading]}
						keyExtractor={item => item.id.$t.toString()}
						onRefresh={() => this._fetchData()}
						refreshing={this.props.isLoading}
						onEndReached={this._onScrollEndReached}
						onEndReachedThreshold={100}
						ref={(ref) => this.list = ref}
						onScrollBeginDrag={this._onScrollStart}
						onScrollEndDrag={this._onScrollStart}
						scrollEventThrottle={0}
						ListFooterComponent={this._renderListFooter()}
					//TODO: possibly enable this line to prevent console warning: 'virtualizedList ...etc'
					// disableVirtualization={false}
					/>
					<Fab
						ref={(ref) => this.fab = ref}
						onPress={this._scrollListToTop}
						onVisibilityChanged={(visible) => this.setState({ fabVisible: visible })}
					/>
				</Animatable.View>
			);
		} else if (!this.props.isLoading) {
			return (
				this._renderNoContent()
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
		fontSize: 18
	},
	orText: {
		fontSize: 15,
		fontFamily: Fonts.primary
	},
	noPetsImage: {
		width: 180,
		height: 180
	},
	loadingText: {
		fontFamily: Fonts.primary,
		color: Colors.primary
	},
	loadingTextContainer: {
		justifyContent: 'flex-start'
	}
})


const mapStateToProps = (state) => {
	return {
		isLoading: state.pets.isLoading,
		pets: state.pets.posts,
		isMorePetsLoading: state.pets.isMorePetsLoading,
		disableMorePetsFetch: state.pets.morePetsFetchEmpty,
		zipcode: state.filters.location
	}
}

export default connect(mapStateToProps, {
	fetchPets
})(PetList);