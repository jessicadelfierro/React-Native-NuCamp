import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Constants from 'expo-constants';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
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

//stack navigator needs to be passed to the function createAppContainer
//createAppContainer will return a react component that handles connecting our top level navigator to the react native application environment to handle some functions such as responding to the back button on a device

const AppNavigator = createAppContainer(DirectoryNavigator);

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