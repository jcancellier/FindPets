import React from 'react';
import { Alert, Text, TextInput, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import filterData from '../global/filterData.json';
import { Fonts, Colors } from '../global';
import { Button, ButtonSelect, LinkedText } from '../components/common';
import {
	setAnimalFilter,
	setSizeFilter,
	setBreedFilter,
	setAgeFilter,
	fetchPets
} from '../actions';

class FilterScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (
				<LinkedText
					style={{ color: Colors.material.gray400, fontFamily: Fonts.primary, fontSize: 15, paddingLeft: 10}}
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
			animal: this.props.animal,
			animals: [
				...filterData["animals"]
			],
			size: this.props.size,
			sizes: [
				...filterData["sizes"]
			],
			breed: this.props.breed,
			breeds: [
				...filterData.breeds[this.props.animal]
			],
			age: this.props.age,
			ages: [
				...filterData["ages"],
			]
		};
	}

	_onSubmitFilters = () => {
		this.props.setAnimalFilter(this.state.animal);
		this.props.setSizeFilter(this.state.size);
		this.props.setBreedFilter(this.state.breed);
		this.props.setAgeFilter(this.state.age);
		this.props.fetchPets();
		this.props.navigation.goBack();
		// this.props.navigation.navigate('Pets');        
	}

	_onResetFilters = () => {
		this.setState({
			animal: null,
			size: null,
			breed: null,
			age: null
		})
	}

	componentDidMount() {
		// this.setState({breed: this.props.breed})
		// if the component is using the optional `value` prop, the parent
		// has the abililty to both set the initial value and also update it

		//persists form state
		// this.setState({
		//     // animal: this.props.animal,
		//     // size: this.props.size,
		//     // breed: this.props.breed
		// });
	}

	render() {
		return (
			<ScrollView
				style={styles.container}
				ref={(r) => this.scrollViewRef = r}
			>
				<Text style={styles.inputLabel}>Animal</Text>
				<RNPickerSelect
					mode="dropdown"
					// hideIcon={true}
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
					// onUpArrow={() => {
					//     this.inputRefs.name.focus();
					// }}
					onDownArrow={() => {
						this.inputRefs.picker2.togglePicker();
					}}
					style={{ ...pickerSelectStyles }}
					value={this.state.animal}
					ref={(el) => {
						this.inputRefs.picker = el;
					}}
				/>
				<View style={{ paddingVertical: 5 }} />


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
					// onDownArrow={() => {
					//     this.inputRefs.picker3.togglePicker();
					// }}
					style={{ ...pickerSelectStyles }}
					value={this.state.breed}
					ref={(el) => {
						this.inputRefs.picker2 = el;
					}}
				/>
				<View style={{ paddingVertical: 5 }} />
				{/* <Text style={styles.inputLabel}>Size</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Any',
                        value: null,
                    }}
                    items={this.state.sizes}
                    onValueChange={(value) => {
                        this.setState({
                            size: value,
                        });
                    }}
                    onUpArrow={() => {
                        this.inputRefs.picker2.togglePicker();
                    }}
                    // onDownArrow={() => {
                    //     this.inputRefs.picker3.togglePicker();
                    // }}
                    style={{ ...pickerSelectStyles }}
                    value={this.state.size}
                    ref={(el) => {
                        this.inputRefs.picker3 = el;
                    }}
                />
                <View style={{ paddingVertical: 5 }} /> */}

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

				<View style={{ paddingVertical: 5 }} />

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

				<View style={{ paddingVertical: 15 }} />

				<View style={styles.buttonsContainer}>
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
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		paddingHorizontal: 10,
	},
	inputLabel: {
		fontFamily: Fonts.primary,
		fontSize: 20,
		paddingBottom: 5
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
		backgroundColor: Colors.material.green700,
		borderRadius: 5,
	},
	resetButton: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		borderRadius: 5
	},
	buttonsContainer: {
		flexDirection: 'row',
		// justifyContent: 'space-around'
	}
});

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
		borderWidth: 0.5,
		borderColor: 'gray',
		borderRadius: 4,
		backgroundColor: 'white',
		color: 'black',
		fontFamily: Fonts.primary
	}
});

const mapStateToProps = (state) => {
	return {
		animal: state.filters.animal,
		size: state.filters.size,
		breed: state.filters.breed,
		age: state.filters.age
	}
}

export default connect(mapStateToProps, {
	setAnimalFilter,
	setSizeFilter,
	setBreedFilter,
	setAgeFilter,
	fetchPets
})(FilterScreen);
