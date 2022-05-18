import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//receives the state as a prop and returns the partners data from the state
const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        promotions: state.promotions,
        partners: state.partners
    };
};

//view: generic container component that supports layout with flexbox styles and more (like html div element)
//text: generic container for displaying text

function RenderItem({item}) {
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}
            >
                <Text style={{margin:10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            //scrollview component used to render groups or lists of items like flatlist
            //loads all its children at once
            <ScrollView>
                <RenderItem
                    item={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]} />
                <RenderItem 
                    item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
                <RenderItem 
                    item={this.props.partners.partners.filter(partner => partner.featured)[0]} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);