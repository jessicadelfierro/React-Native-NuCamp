import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux'; //need to access the campsites from the redux store 
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        favorites: state.favorites
    };
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'My Favorites'
    }

    render() {

        //every favorite in the list able to be pressed/clicked to route the user to the corresponding campsiteinfo component
        //destructuring navigation function
        const { navigate } = this.props.navigation;
        //destructure the current item from the array 
        const renderFavoriteItem = ({item}) => {
            return (
                <ListItem 
                    title={item.name}
                    subtitle={item.description}
                    //gets source from baseUrl plus the item image
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    //turn it into a link, pass a callback containing the navigate function which will route to the campsiteinfo screen along with the campsiteId as a parameter
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                />
            );
        };

        //checks if campsites is loading
        if (this.props.campsites.isLoading) {
            return <Loading />;
        }
        //checks if there is error messages
        if (this.props.campsites.errMess) {
            return (
                <View>
                    <Text>{this.props.campsites.errMess}</Text>
                </View>
            );
        }
        return(
            <FlatList 
                data={this.props.campsites.campsites.filter(campsite => this.props.favorites.includes(campsite.id))}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );

    }
}

export default connect(mapStateToProps)(Favorites);