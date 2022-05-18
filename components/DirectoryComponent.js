import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//receives the state as a prop and returns the partners data from the state
const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};

class Directory extends Component {

    //configure title text for the header
    //static is a javascript keyword that sets a method on the class itself rather than the object that is instantiated from the class
    //it's being used by react native to communicate this title to the directory navigator's navigation option
    static navigationOptions = {
        title: 'Directory'
    };

    render() {

        const { navigate } = this.props.navigation; 
        const renderDirectoryItem = ({item}) => {
            return (
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    // first argument is the name of the screen to navigate to
                    // second argument adds extra parameters to the route, specifying a parameter called 'campsiteId' and giving it the id of the campsite that was passed
                    //when an item in the directory is pressed, it will call the navigate function from react navigation in order to switch to the campsiteInfo screen.  the campsite id parameter will be used to pass the correct campsite object to it
                    imageSrc={{uri: baseUrl + item.image}}
                />
            )
        };
    
        return (
            //flat list uses lazy loading
            //lazy loading: only a part of a list is rendered at a time, the parts that have scrolled far off screen are removed from memory
            <FlatList
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps)(Directory);