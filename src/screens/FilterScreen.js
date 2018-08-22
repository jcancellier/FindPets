import React from 'react';
import { Alert, TextInput, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import filterData from '../global/filterData.json';
import { Fonts, Colors, Styles } from '../global';
import { Button, ButtonSelect, LinkedText, Text, Footer } from '../components/common';
import {
	setAnimalFilter,
	setSizeFilter,
	setBreedFilter,
	setAgeFilter,
	setSexFilter,
	fetchPets
} from '../actions';

class FilterScreen extends React.Component {

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

	constructor(props) {
		super(props);
		this.inputRefs = {};

		this.state = {
			animal: props.animal,
			animals: [
				...filterData["animals"]
			],
			size: props.size,
			sizes: [
				...filterData["sizes"]
			],
			breed: props.breed,
			breeds:
				//prevents accessing an index of null 
				props.animal ? [...filterData.breeds[props.animal]] : [],
			age: props.age,
			ages: [
				...filterData["ages"],
			],
			sex: props.sex,
			sexes: [
				...filterData["sexes"]
			]
		};
	}

	_onSubmitFilters = () => {
		this.props.setAnimalFilter(this.state.animal);
		this.props.setSizeFilter(this.state.size);
		this.props.setBreedFilter(this.state.breed);
		this.props.setAgeFilter(this.state.age);
		this.props.setSexFilter(this.state.sex);
		this.props.fetchPets(true, true);
		this.props.navigation.goBack();
	}

	_onResetFilters = () => {
		this.setState({
			animal: null,
			size: null,
			breed: null,
			age: null,
			sex: null
		})
	}

	render() {
		return (
			<SafeAreaView style={styles.safeAreaViewContainer}>
				<View style={styles.container}>
					<ScrollView
						style={styles.scrollViewContainer}
						ref={(r) => this.scrollViewRef = r}
					>
						<Text style={styles.inputLabel}>Animal</Text>
						<RNPickerSelect
							mode="dropdown"
							placeholder={{
								label: 'Any',
								value: null,
							}}
							items={this.state.animals}
							onValueChange={(value) => {
								this.setState({
									animal: value,
								}, () => {
									if (this.state.animal && this.state.animal != null) {
										this.setState({
											breeds: [...filterData.breeds[this.state.animal]],
										});
									} else {
										this.setState({ breeds: [], breed: null });
									}
								}
								)
							}}
							onDownArrow={() => {
								this.inputRefs.picker2.togglePicker();
							}}
							style={{ ...pickerSelectStyles }}
							value={this.state.animal}
							ref={(el) => {
								this.inputRefs.picker = el;
							}}
						/>
						<View style={{ paddingVertical: 10 }} />

						<Text style={styles.inputLabel}>Breed</Text>
						<RNPickerSelect
							placeholder={{
								label: 'Any',
								value: null,
							}}
							items={this.state.breeds}
							onValueChange={(value) => {
								this.setState({
									breed: value
								})
							}}
							onUpArrow={() => {
								this.inputRefs.picker.togglePicker();
							}}
							style={{ ...pickerSelectStyles }}
							value={this.state.breed}
							ref={(el) => {
								this.inputRefs.picker2 = el;
							}}
						/>
						<View style={{ paddingVertical: 10 }} />

						<Text style={styles.inputLabel}>Size</Text>
						<ButtonSelect
							placeholder={{
								label: 'Any',
								value: null,
							}}
							onValueChange={(value) => {
								this.setState({
									size: value,
								});
							}}
							textStyle={{ fontFamily: Fonts.primary }}
							items={this.state.sizes}
							value={this.state.size}
						/>
						<View style={{ paddingVertical: 10 }} />

						<Text style={styles.inputLabel}>Age</Text>
						<ButtonSelect
							placeholder={{
								label: 'Any',
								value: null,
							}}
							onValueChange={(value) => {
								this.setState({
									age: value,
								});
							}}
							textStyle={{ fontFamily: Fonts.primary }}
							items={this.state.ages}
							value={this.state.age}
						/>
						<View style={{ paddingVertical: 10 }} />

						<Text style={styles.inputLabel}>Gender</Text>
						<ButtonSelect
							placeholder={{
								label: 'Any',
								value: null,
							}}
							onValueChange={(value) => {
								this.setState({
									sex: value,
								});
							}}
							textStyle={{ fontFamily: Fonts.primary }}
							items={this.state.sexes}
							value={this.state.sex}
						/>
						<View style={{ paddingVertical: 15 }} />

					</ScrollView>
					<Footer style={styles.footer}>
						<Button
							onPress={this._onResetFilters}
							textStyle={styles.resetButtonText}
							style={styles.resetButton}
						>
							Reset
          		</Button>
						<View style={{ paddingHorizontal: 10 }} />
						<Button
							onPress={this._onSubmitFilters}
							textStyle={styles.submitButtonText}
							style={styles.submitButton}
						>
							Submit
          		</Button>
					</Footer>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	safeAreaViewContainer: {
		flex: 1
	},
	scrollViewContainer: {
		flex: 1,
		paddingHorizontal: 10,
	},
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	inputLabel: {
		fontFamily: Fonts.primary,
		fontSize: 20,
		paddingBottom: 5,
		marginLeft: 2
	},
	submitButtonText: {
		fontFamily: Fonts.primary,
		color: Colors.flat.clouds,
		fontSize: 20
	},
	resetButtonText: {
		fontFamily: Fonts.primary,
		fontSize: 20
	},
	submitButton: {
		backgroundColor: Colors.material.green600,
		borderRadius: 5,
		...Styles.shadow
	},
	resetButton: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		borderRadius: 5,
		...Styles.shadow
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	footer: {
		flex: 0.08
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
		borderWidth: 0.5,
		borderColor: 'rgba(0,0,0,0.2)',
		borderRadius: 5,
		backgroundColor: 'white',
		color: 'black',
		fontFamily: Fonts.primary,
		...Styles.shadow
	}
});

const mapStateToProps = (state) => {
	return {
		animal: state.filters.animal,
		size: state.filters.size,
		breed: state.filters.breed,
		age: state.filters.age,
		sex: state.filters.sex
	}
}

export default connect(mapStateToProps, {
	setAnimalFilter,
	setSizeFilter,
	setBreedFilter,
	setAgeFilter,
	setSexFilter,
	fetchPets
})(FilterScreen);
