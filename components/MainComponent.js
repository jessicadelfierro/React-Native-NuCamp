import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

//createStackNavigator is a function, that has 1 required argument called "Route Config Object"
// in this argument, we set what components will be available for this stack
// the second argument is optional, initialRouteName -- default to showing said component
// defaultNavigationOptions is where you'd configure the settings for the header
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { screen: Directory },
        CampsiteInfo: { screen: CampsiteInfo }
    },
    {
        initialRouteName: 'Directory',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

//stack navigator for home component
const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }
);

//stack navigator for about component
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }   
    }
);

//stack navigator for contact component
const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        }   
    }
);

//drawer navigator function needs the first argument to be an object that contains the screens that will be in the drawer
//want to route them to the stack navigator 
const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeNavigator },
        Directory: { screen: DirectoryNavigator },
        About: { screen: AboutNavigator },
        Contact: { screen: ContactNavigator }
    },
    {
        drawerBackgroundColor: '#CEC8FF'
    }
);

//stack navigator needs to be passed to the function createAppContainer
//createAppContainer will return a react component that handles connecting our top level navigator to the react native application environment to handle some functions such as responding to the back button on a device
const AppNavigator = createAppContainer(MainNavigator);

//Main component will act as the central hub that creates and holds all of the navigators
// (AppNavigator is a container for the DirectoryNavigator which contains the screens for both directory and campsiteinfo)
class Main extends Component {
    render() {
        return (
            <View 
                style={{
                        flex: 1,
                        paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
                        //different paddingTop depending on the operating system
                        //Constants.statusBarHeight sets the dynamic status bar height
                        //Platform API is used to get the operating system of the device,
                    }}
            >
                <AppNavigator />
            </View>
        );
    }
}

export default Main;