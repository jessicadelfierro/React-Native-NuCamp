import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Constants from 'expo-constants';
import { View, Platform, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import { connect } from 'react-redux';
import { fetchCampsites, fetchComments, fetchPromotions, fetchPartners} from '../redux/ActionCreators';

//allows us to access these action creators as props
const mapDispatchToProps = {
    fetchCampsites,
    fetchComments,
    fetchPromotions,
    fetchPartners
};

//createStackNavigator is a function, that has 1 required argument called "Route Config Object"
// in this argument, we set what components will be available for this stack
// the second argument is optional, initialRouteName -- default to showing said component
// defaultNavigationOptions is where you'd configure the settings for the header
const DirectoryNavigator = createStackNavigator(
    {
        Directory: { 
            screen: Directory, 
            //can set navigation options for each individual screens in the stack
            //if there is only 1 screen, you can add to defaultNavigatinOptions
            navigationOptions: ({navigation}) => ({
                headerLeft: <Icon 
                    name='list'
                    type='font-awesome'
                    iconStyle={styles.stackIcon}
                    onPress={() => navigation.toggleDrawer()}
                />
            })
        },
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
    { //pass in navigation prop, by descructuring in the parameter lists
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='home'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

//stack navigator for about component
const AboutNavigator = createStackNavigator(
    {
        About: { screen: About }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='info-circle'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        }) 
    }
);

//stack navigator for contact component
const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='address-card'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })  
    }
);

//stack navigator for reservation
const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen: Reservation }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='tree'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })  
    }
);

//stack navigator for favorites
const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites }
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            },
            headerLeft: <Icon 
                name='heart'
                type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })  
    }
);


//this function will recieve props as it's parameter and return the view of our customized drawer
//SafeAreaView is specifically for iPhone X; defines part of the area as a safe area where nothing else will be laid out to account for the specific physical layout of the iPhone X with the rounded corners and the camera notch
//default drawer navigator layout already normally includes this, but because we're overwriting the default view, it needs to be added
//flex: 1 means that it will take up 1/3rd of the space of the drawer header view
const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{top: 'always', horizontal: 'never'}}
        >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image 
                        source={require('./images/logo.png')}
                        style={styles.drawerImage}
                    />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>NuCamp</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

//drawer navigator function needs the first argument to be an object that contains the screens that will be in the drawer
//want to route them to the stack navigator 
const MainNavigator = createDrawerNavigator(
    {
        Home: { 
            screen: HomeNavigator,
            navigationOptions: {
                //give prop a function, pass the function the tintColor which is available by default
                //the value of tintColor prop will change depending on whether this is the active screen or not; if active, color will change to a blue color; if inactive it will change to dark gray
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Directory: { 
            screen: DirectoryNavigator, 
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Reservation: { 
            screen: ReservationNavigator, 
            navigationOptions: {
                drawerLabel: 'Reserve Campsite',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='tree'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Favorites: { 
            screen: FavoritesNavigator, 
            navigationOptions: {
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        About: { 
            screen: AboutNavigator, 
            navigationOptions: {
                drawerLabel: 'About Us',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Contact: { 
            screen: ContactNavigator, 
            navigationOptions: {
                drawerLabel: 'Contact Us',
                drawerIcon: ({tintColor}) => (
                    <Icon 
                        name='address-card'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        drawerBackgroundColor: '#CEC8FF',
        //connects CustomDrawerContentComponent with the drawer navigator/main navigator
        //tells main navigator to use CustomDrawerContentComponent to render the content of the side drawer
        contentComponent: CustomDrawerContentComponent
    }
);

//stack navigator needs to be passed to the function createAppContainer
//createAppContainer will return a react component that handles connecting our top level navigator to the react native application environment to handle some functions such as responding to the back button on a device
const AppNavigator = createAppContainer(MainNavigator);

//Main component will act as the central hub that creates and holds all of the navigators
// (AppNavigator is a container for the DirectoryNavigator which contains the screens for both directory and campsiteinfo)
class Main extends Component {

    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

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

//set up a variable, then assign to it the method stylesheet.create
//in the parameter list, we can pass as many styles as we want
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#5637dd',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    },
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    }
});

export default connect(null, mapDispatchToProps)(Main);