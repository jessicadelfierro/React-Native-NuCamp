import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//receives the state as a prop and returns the partners data from the state
const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

function Mission() {
    return(
        <Card
            title="Our Mission">
            <Text
                style={{margin:10}}>
                    We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other
                </Text>
        </Card>
    );
}

class About extends Component {

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        const renderPartner = ({item}) => {
            return(
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: {uri: baseUrl + item.image}}} />
            )
        };

        return (
            <ScrollView>
                <Mission />
                <Card
                    title="Community Partners">
                    <FlatList 
                    //first partners refers to the entire part of the state that handles the partners data, including the is loading and error message properties, along with the partners array
                    //second partners refers to the partner's data's array
                        data={this.props.partners.partners}
                        renderItem={renderPartner}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </ScrollView>
        );
    }
}

//this makes sure that the about component now receives the partners props from the redux store
export default connect(mapStateToProps)(About);