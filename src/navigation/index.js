import React from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import HeaderButtons from 'react-navigation-header-buttons'

import { LinkedText } from '../components/common';
import { Fonts, Colors } from "../global";
import styles from './styles';

//Screens
import MainScreen from '../screens/MainScreen';
import FilterScreen from '../screens/FilterScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OnboardingScreen from '../screens/OnBoardingScreen';
import PetDetailsScreen from '../screens/PetDetailsScreen';
import SetLocationScreen from '../screens/SetLocationScreen';

//Stack navigator (consists of petlist and filter screen)
const Primary = createStackNavigator({
	Pets: {
		screen: MainScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Pet Locator',
			headerStyle: {
				//TODO: Add android shadows
				shadowOpacity: 0.4,
				shadowOffset: { width: 0, height: 1 },
				shadowRadius: 5,
				borderBottomWidth: 0,
				backgroundColor: Colors.primary
			},
			headerTitleStyle: styles.headerTitleStyle,
			headerLeft: (
				<HeaderButtons IconComponent={Ionicons} iconSize={27} color={Colors.flat.clouds}>
					<HeaderButtons.Item title="drawer" iconName="md-menu" onPress={() => navigation.toggleDrawer()} />
				</HeaderButtons>
			),
			headerRight: (
				<HeaderButtons IconComponent={Ionicons} iconSize={27} color={Colors.flat.clouds}>
					<HeaderButtons.Item title="location" iconName="md-pin" onPress={() => navigation.navigate('SetLocation')} />
					<HeaderButtons.Item title="filter" iconName="ios-funnel" onPress={() => navigation.navigate('Filter')} />
				</HeaderButtons>
			),
		}),
	},
	Filter: {
		screen: FilterScreen,
		navigationOptions: {
			title: 'Filter',
			headerStyle: {
				//TODO: Add android shadows
				shadowOpacity: 0.4,
				shadowOffset: { width: 0, height: 1 },
				shadowRadius: 5,
				borderBottomWidth: 0,
				backgroundColor: Colors.primary
			},
			headerTitleStyle: styles.headerTitleStyle,
			gesturesEnabled: false
		}
	},
	SetLocation: {
		screen: SetLocationScreen,
		navigationOptions: ({ navigation }) => ({
				headerLeft: (
					<LinkedText
						style={{ color: Colors.flat.clouds, fontSize: 16, paddingLeft: 10 }}
						onPress={() => {
							navigation.state.params.clearFetchedLocationInfo()
							navigation.goBack()
						}}
					>
						Cancel
				</LinkedText>
				)
		})
	}
}, {
		mode: 'modal',
	});

const SharedTransition = createStackNavigator({
	First: { screen: Primary },
	PetDetails: {
		screen: PetDetailsScreen,
		navigationOptions: {
			gestureResponseDistance: {
				horizontal: 250
			}
		}
	}
}, {
		// mode: 'modal',
		navigationOptions: {
			header: null,
		}
	}
);

//Stack Navigator (only Favorites Screen)
const FavoritesScreenStack = createStackNavigator({
	Screen: {
		screen: FavoritesScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Favorites',
			headerStyle: {
				//TODO: Add android shadows
				shadowOpacity: 0.4,
				shadowOffset: { width: 0, height: 1 },
				shadowRadius: 5,
				borderBottomWidth: 0,
				backgroundColor: Colors.primary
			},
			headerTitleStyle: styles.headerTitleStyle,
			headerLeft: (
				<HeaderButtons IconComponent={Ionicons} iconSize={27} color={Colors.flat.clouds}>
					<HeaderButtons.Item title="drawer" iconName="md-menu" onPress={() => navigation.toggleDrawer()} />
				</HeaderButtons>
			),
		}),
	}
})

const FavoritesStack = createStackNavigator({
	First: {
		screen: FavoritesScreenStack,
		navigationOptions: {
			header: null
		}
	},
	PetDetailsFromFavorites: {
		screen: PetDetailsScreen,
		navigationOptions: {
			gestureResponseDistance: {
				horizontal: 250
			},
			header: null
		}
	}
});

//InitialLaunch stack
const InitialLaunchStack = createStackNavigator({
	Onboarding: {
		screen: OnboardingScreen,
		navigationOptions: {
			header: null,
		}
	},
	SetLocationInitialLaunch: {
		screen: SetLocationScreen,
		navigationOptions: {
			headerLeft: null
		}
	}
}, {
		mode: 'modal'
	})

//Main navigator (Drawer)
const MainDrawerNavigator = createDrawerNavigator({
	Main: {
		screen: SharedTransition,//Primary,
		navigationOptions: {
			drawerLockMode: 'locked-closed',
			title: 'Pets',
			drawerIcon: (<Ionicons name="ios-paw" size={23} color={Colors.flat.clouds} />),
		},
	},
	Favorites: {
		screen: FavoritesStack,
		navigationOptions: {
			drawerLockMode: 'locked-closed',
			title: 'Favorites',
			drawerIcon: (<Ionicons name="ios-heart" size={23} color={Colors.flat.clouds} />),
		},
	}
}, {
		drawerBackgroundColor: Colors.primary,
		contentOptions: {
			activeTintColor: Colors.flat.clouds,
			inactiveTintColor: 'rgba(236,240,241,0.6)',
			labelStyle: {
				fontFamily: Fonts.primary,
				fontSize: 25,
				includeFontPadding: false,
				fontWeight: 'normal'
			}
		}
	});



export const createRootNavigator = (initialLaunch = true) => {
	return createSwitchNavigator(
		{
			Onboarding: InitialLaunchStack,
			Main: MainDrawerNavigator
		},
		{
			initialRouteName: initialLaunch ? 'Onboarding' : 'Main'
		}
	);
};
