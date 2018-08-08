import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image,
	Keyboard,
} from 'react-native';
import { Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { setZipcodeFilter, fetchPets } from '../actions';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-navigation';
import { Colors, Fonts } from '../global';
import { LinkedText, Footer, Button } from '../components/common';

class SetLocationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			zipcode: this.props.zipcode,
			city: '',
			country: ''
		}
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (
				<LinkedText
					style={{ color: Colors.flat.clouds, fontSize: 16, paddingLeft: 10 }}
					onPress={() => navigation.goBack()}
				>
					Cancel
				</LinkedText>
			)
		};
	};

	_getLocationAsync = async () => {
		//TODO: handle location retrieval on app start
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		const toSend = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude
		}

		Location.reverseGeocodeAsync(toSend)
			.then((res) => {
				console.log(res)
				this.setState({ 
					zipcode: res[0].postalCode,
					city: res[0].city,
					country: res[0].region
				})
			})
			.catch((err) => console.log(err))
	};

	_onSaveLocationPress = () => {
		this.props.setZipcodeFilter(this.state.zipcode);
		this.props.fetchPets();
		this.props.navigation.navigate('Pets');
	}

	render() {
		return (
			<TouchableOpacity style={styles.container} activeOpacity={1.0} onPress={Keyboard.dismiss}>

				<KeyboardAvoidingView
					behavior="padding"
					enabled
					keyboardVerticalOffset={Header.HEIGHT}
					style={styles.container}
				>
					<View style={styles.header} >
						<Image source={require('../../assets/icons/location.png')} style={styles.locationIcon} />
					</View>
					<View style={styles.body}>
						<View>
							<TouchableOpacity
								style={styles.getLocationButton}
								onPress={this._getLocationAsync}
							>
								<Ionicons name='md-pin' size={20} color={Colors.flat.clouds} style={styles.getLocationButtonIcon} />
								<Text style={styles.getLocationButtonText}>Get Location</Text>
							</TouchableOpacity>
							<TextInput
								style={styles.zipcodeInput}
								placeholder='Zip Code'
								onChangeText={(zipcode) => this.setState({ zipcode })}
								value={this.state.zipcode}
								keyboardType='number-pad'
								maxLength={5}
							/>
							<Text style={styles.cityAndCountryText}>{(this.state.city && this.state.country) ? `${this.state.city}, ${this.state.country}` : ''}</Text>
						</View>
					</View>
					<Footer style={{ backgroundColor: 'white' }}>
						<Button
							textStyle={styles.saveLocationButtonText}
							style={styles.saveLocationButton}
							onPress={this._onSaveLocationPress}
						>
							Save Location
						</Button>
					</Footer>
				</KeyboardAvoidingView>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: Colors.flat.clouds
	},
	getLocationButton: {
		backgroundColor: Colors.primary,
		borderRadius: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	getLocationButtonText: {
		padding: 8,
		fontSize: 20,
		fontFamily: Fonts.primary,
		color: Colors.flat.clouds,
		alignSelf: 'center'
	},
	getLocationButtonIcon: {
		padding: 5,
		paddingLeft: 8
	},
	zipcodeInput: {
		backgroundColor: 'white',
		fontSize: 20,
		fontFamily: Fonts.primary,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: 'rgba(0,0,0,0.2)',
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 10,
		marginTop: 20,
		marginBottom: 10,
		textAlign: 'center'
	},
	locationIcon: {
		width: 100,
		height: 100,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	body: {
		flex: 1,
		alignItems: 'center',
	},
	saveLocationButton: {
		backgroundColor: Colors.material.green600,
		borderRadius: 5
	},
	saveLocationButtonText: {
		fontFamily: Fonts.primary,
		color: Colors.flat.clouds,
		fontSize: 18
	},
	cityAndCountryText: {
		textAlign: 'center',
		fontFamily: Fonts.primary,
		fontSize: 16
	}
})

const mapStateToProps = (state) => {
	return {
		zipcode: state.filters.location
	}
}

export default connect(mapStateToProps, {
	setZipcodeFilter,
	fetchPets
})(SetLocationScreen);