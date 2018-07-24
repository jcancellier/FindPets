import React from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';
import { createFluidNavigator, FluidNavigator } from 'react-navigation-fluid-transitions'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderButtons from 'react-navigation-header-buttons'

import { Fonts, Colors } from "../global";

//Screens
import MainScreen from '../screens/MainScreen';
import FilterScreen from '../screens/FilterScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OnboardingScreen from '../screens/OnBoardingScreen';
import PetDetailsScreen from '../screens/PetDetailsScreen';

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
            headerTitleStyle: {
                fontSize: 21,
                fontFamily: Fonts.primary,
                color: Colors.flat.clouds
            },
            headerLeft: (
                <HeaderButtons IconComponent={Ionicons} iconSize={32} color={Colors.flat.clouds}>
                    <HeaderButtons.Item title="drawer" iconName="ios-paw" onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
            headerRight: (
                <HeaderButtons IconComponent={MaterialCommunityIcons} iconSize={27} color={Colors.flat.clouds}>
                    <HeaderButtons.Item title="filter" iconName="filter" onPress={() => navigation.navigate('Filter')} />
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
            headerTitleStyle: {
                fontSize: 21,
                fontFamily: Fonts.primary,
                color: Colors.flat.clouds
            },
            headerLeft: (
                null
            ),
        }
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
const FavoritesNavigation = createStackNavigator({
    First: {
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
            headerTitleStyle: {
                fontSize: 21,
                fontFamily: Fonts.primary,
                color: Colors.flat.clouds
            },
            headerLeft: (
                <HeaderButtons IconComponent={Ionicons} OverflowIcon={<Ionicons name="ios-more" size={23} color="blue" />} iconSize={32} color={Colors.flat.clouds}>
                    <HeaderButtons.Item title="add" iconName="ios-paw" onPress={() => navigation.toggleDrawer()} />
                </HeaderButtons>
            ),
        }),
    },
});

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
        screen: FavoritesNavigation,
        navigationOptions: {
            // drawerLockMode: 'locked-closed',
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
                fontSize: 25
            }
        }
    });

export const createRootNavigator = (initialLaunch = true) => {
    return createSwitchNavigator(
        {
            Onboarding: OnboardingScreen,
            Main: MainDrawerNavigator
        },
        {
            initialRouteName: initialLaunch ? 'Onboarding' : 'Main'
        }
    );
};
