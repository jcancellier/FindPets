import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ScrollView,
	SafeAreaView,
	Linking,
	ImageBackground,
	TouchableOpacity,
	Share
} from 'react-native';
import { connect } from 'react-redux';
import { addPetToFavorites, removePetFromFavorites } from '../actions';
import { Fonts, Colors } from '../global';
import FullWidthImage from 'react-native-fullwidth-image'
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, ReadMoreText, Footer } from '../components/common';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo';
import ToggleIcon from '../components/common/ToggleIcon';

var { height, width } = Dimensions.get('window');

class PetDetailsScreen extends React.Component {
	constructor(props) {
		super(props);
		id = this.props.navigation.getParam('id', '');
		name = this.props.navigation.getParam('name', '');
		breed = this.props.navigation.getParam('breed', '');
		image = this.props.navigation.getParam('image', '');
		description = this.props.navigation.getParam('description', 'No Description');

		this.state = {
			favoritesToggled: this.props.favoritePets.some(pet => pet.id.$t === id) ? true : false
		}
	}

	_renderReadMoreTextFooter = (handlePress) => {
		return (
			<Text style={styles.readMoreText} onPress={handlePress}>
				Read more
		  </Text>
		);
	}

	_renderFooter() {
		const email = this.props.navigation.getParam('email', '');
		const phone = this.props.navigation.getParam('phone', '');

		const callButton = <Button style={styles.callButton} textStyle={styles.callButtonText} onPress={() => Linking.openURL('tel:' + phone)}>Call</Button>;
		const emailButton = <Button style={styles.emailButton} textStyle={styles.emailButtonText} onPress={() => Linking.openURL('mailto:' + email)}>Email</Button>;

		if (phone && email) {
			return (
				<Footer>
					{callButton}
					<View style={{ paddingHorizontal: 5 }} />
					{emailButton}
				</Footer>
			);
		} else if (phone) {
			return (
				<Footer style={styles.footer}>
					{callButton}
				</Footer>
			);
		} else if (email) {
			return (
				<Footer style={styles.footer}>
					{emailButton}
				</Footer>
			);
		} else return null;
	}

	_handleShareButtonPress() {
		Share.share({
			message: 'Check out this ' + breed + ' I found on Pet Locator!',
			title: 'Pet Locator App',
			url: image
		}, {
				subject: 'I found an awesome pet on Pet Locator!',
				tintColor: 'black'
			});
	}

	_handleBackButtonPress() {
		this.props.navigation.goBack();
	}

	_handleFavoriteButtonPress() {
		this.setState((prevState) => { return { favoritesToggled: !prevState.favoritesToggled } }, () => {
			console.log(this.state.favoritesToggled);
			if (this.state.favoritesToggled) {
				this.props.addPetToFavorites(id);
			} else {
				this.props.removePetFromFavorites(id);
			}
		})
	}

	render() {
		return (
			<SafeAreaView style={styles.safeAreaView}>
				<ScrollView style={{ flex: 1 }}>
					<View style={styles.container}>
						{/* <FullWidthImage 
                        source={{uri: image}}
                    /> */}
						{/* <AutoHeightImage 
                        width={width}
                        source={{uri: image}}
                    /> */}
						<ImageBackground
							resizeMode="cover"
							style={styles.petImage}
							source={image ? { uri: image } : require('../../assets/icons/no-photo.png')}
						>
							<View style={styles.petImageTopButtonsContainer}>
								<TouchableOpacity onPress={this._handleBackButtonPress.bind(this)} style={styles.imageIconButton}>
									<Ionicons name="md-arrow-back" size={22} color={Colors.flat.clouds} style={styles.backIcon} />
								</TouchableOpacity>
							</View>
							<View style={styles.petImageBottomButtonsContainer}>
								<ToggleIcon
									activeIconName='ios-heart'
									inactiveIconName='ios-heart'
									toggled={this.state.favoritesToggled}
									activeOpacity={Colors.material.red500}
									inactiveOpacity={Colors.flat.clouds}
									onPress={this._handleFavoriteButtonPress.bind(this)}
								/>
								<TouchableOpacity onPress={this._handleShareButtonPress} style={[styles.imageIconButton, styles.shareIconButton]}>
									<Feather name="share" size={20} color={Colors.flat.clouds} style={styles.shareIcon} />
								</TouchableOpacity>
							</View>
						</ImageBackground>
						<View style={styles.body}>
							<View style={styles.header}>
								<Text style={styles.petName}>{name}</Text>
								<Text style={styles.petBreed}>{breed}</Text>
							</View>
							<View style={styles.divider} />
							<View style={styles.descriptionContainer}>
								<ReadMoreText
									numberOfLines={8}
									contentTextStyle={styles.description}
									readMoreTextStyle={styles.readMoreText}
								>
									{description}
								</ReadMoreText>
							</View>
						</View>
					</View>
				</ScrollView>
				{this._renderFooter()}

			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		backgroundColor: Colors.flat.clouds
	},
	safeAreaView: {
		flex: 1,
		backgroundColor: Colors.flat.clouds
	},
	petImage: {
		height: 400,
		width: width,
		padding: 10,
		paddingTop: Constants.statusBarHeight
	},
	petImageTopButtonsContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingTop: 5
	},
	petImageBottomButtonsContainer: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		flexDirection: 'row'
	},
	body: {
		alignSelf: 'stretch'
	},
	header: {
		paddingBottom: 5,
		margin: 15,
		backgroundColor: Colors.flat.clouds
	},
	description: {
		fontSize: 15,
		fontFamily: Fonts.primary
	},
	readMoreText: {
		color: Colors.primary,
		fontFamily: Fonts.primary,
		fontSize: 15
	},
	descriptionContainer: {
		margin: 15,
		backgroundColor: Colors.flat.clouds
	},
	petName: {
		fontSize: 30,
		fontFamily: Fonts.primary
	},
	petBreed: {
		color: Colors.flat.concrete,
		fontSize: 20,
		fontFamily: Fonts.primary
	},
	divider: {
		borderBottomWidth: 0.5,
		borderColor: 'rgba(0,0,0,0.2)',
	},
	footer: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: Colors.flat.clouds,
		borderTopWidth: 0.5,
		borderColor: 'rgba(0,0,0,0.2)',
	},
	callButton: {
		backgroundColor: Colors.flat.clouds,
		borderRadius: 5,
		borderColor: Colors.primary,
		borderWidth: 1
	},
	callButtonText: {
		fontFamily: Fonts.primary,
		color: Colors.primary
	},
	emailButton: {
		backgroundColor: Colors.primary,
		borderRadius: 5
	},
	emailButtonText: {
		fontFamily: Fonts.primary,
		color: Colors.flat.clouds
	},
	imageIconButton: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center'
	},
	shareIconButton: {
		marginLeft: 10
	},
	shareIcon: {
		padding: 8,
	},
	backIcon: {
		padding: 8,
		paddingHorizontal: 13
	}
});

const mapStateToProps = (state) => {
	return {
		favoritePets: state.favorites.pets
	}
}

export default connect(mapStateToProps, {
	addPetToFavorites,
	removePetFromFavorites
})(PetDetailsScreen);