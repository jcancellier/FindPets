import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	ScrollView,
	SafeAreaView,
	Linking,
	ImageBackground,
	TouchableOpacity,
	Share
} from 'react-native';
import { Fonts, Colors } from '../global';
import FullWidthImage from 'react-native-fullwidth-image'
import AutoHeightImage from 'react-native-auto-height-image';
import { Button, ReadMoreText } from '../components/common';
import Feather from '@expo/vector-icons/Feather';

var { height, width } = Dimensions.get('window');

export default class PetDetailsScreen extends Component {
	constructor(props) {
		super(props);
		id = this.props.navigation.getParam('id', '');
		name = this.props.navigation.getParam('name', '');
		breed = this.props.navigation.getParam('breed', '');
		image = this.props.navigation.getParam('image', '');
		description = this.props.navigation.getParam('description', '');
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
				<View style={styles.footer}>
					{callButton}
					<View style={{ paddingHorizontal: 5 }} />
					{emailButton}
				</View>
			);
		} else if (phone) {
			return (
				<View style={styles.footer}>
					{callButton}
				</View>
			);
		} else if (email) {
			return (
				<View style={styles.footer}>
					{emailButton}
				</View>
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

	render() {
		// const {id} = this
		// const {name} = this
		// const {breed} = this
		// const {image} = this
		// const {description} = this
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
							<TouchableOpacity onPress={this._handleShareButtonPress}>
								<Feather name="share" size={28} color={Colors.flat.clouds} />
							</TouchableOpacity>
						</ImageBackground>
						<View style={styles.body}>
							<View style={styles.header}>
								<Text style={styles.petName}>{name}</Text>
								<Text style={styles.petBreed}>{breed}</Text>
							</View>
							<View style={styles.divider} />
							<View style={styles.descriptionContainer}>
								<ReadMoreText
									numberOfLines={6}
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
		//flex: 1,
		//justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: Colors.flat.clouds
	},
	safeAreaView: {
		flex: 1,
		backgroundColor: Colors.flat.clouds
	},
	petImage: {
		height: 400,
		//allows image to fit the width of screen
		//flex: 1,
		width: width,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		padding: 10
	},
	body: {
		// margin: 7
		alignSelf: 'stretch'
	},
	header: {
		paddingBottom: 5,
		margin: 15,
		backgroundColor: Colors.flat.clouds
	},
	description: {
		fontSize: 15,
		fontWeight: 'bold',
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
		fontWeight: 'bold',
		fontFamily: Fonts.primary
	},
	petBreed: {
		color: Colors.flat.concrete,
		fontWeight: 'bold',
		fontSize: 20,
		fontFamily: Fonts.primary
	},
	divider: {
		borderBottomWidth: 0.5,
		borderColor: 'rgba(0,0,0,0.2)',
		//width: '100%'
	},
	footer: {
		// flex: 0.1,
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
	}

});