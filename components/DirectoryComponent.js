import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES
        };
    }

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
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    onPress={() => navigate('CampsiteInfo', {campsiteId: item.id})}
                    // first argument is the name of the screen to navigate to
                    // second argument adds extra parameters to the route, specifying a parameter called 'campsiteId' and giving it the id of the campsite that was passed
                    //when an item in the directory is pressed, it will call the navigate function from react navigation in order to switch to the campsiteInfo screen.  the campsite id parameter will be used to pass the correct campsite object to it
                    leftAvatar={{ source: require('./images/react-lake.jpg')}}
                />
            )
        };
    
        return (
            <FlatList
                data={this.state.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default Directory;