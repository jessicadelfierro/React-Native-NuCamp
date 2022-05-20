import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campers: 1, 
            hikeIn: false,
            date: new Date(),
            showCalendar: false
        };
    }

    //gives it a title of Reserve Campsite
    static navigationOptions = {
        title: 'Reserve Campsite'
    }

    //event handle to handle form submition
    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            campers: 1,
            hikeIn: false,
            date: new Date(),
            showCalendar: false
        });
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.campers}
                        onValueChange={itemValue => this.setState({campers: itemValue})}
                        //gets passed a callback function with an itemValue parameter, it will update the components state "campers" property with that itemValue
                        //Picker.Item - label is what the user sees, value is what is passed to the onValueChange prop in Picker
                        //selectedValue prop will also be updated to match the current state so the picker knows what item to display as being the current selection
                    >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                        <Picker.Item label='6' value='6' />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike-In?</Text>
                    <Switch 
                        style={styles.formItem}
                        value={this.state.hikeIn}
                        trackColor={{true: '#5637DD', false: null}} //gives color for if the switch value is true and false
                        onValueChange={value => this.setState({hikeIn: value})}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date</Text>
                    <Button 
                        onPress={() =>
                            this.setState({showCalendar: !this.state.showCalendar})
                        }
                        title={this.state.date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date' //helps with screen readers
                    />
                </View>
                {this.state.showCalendar && (
                    <DateTimePicker 
                        value={this.state.date}
                        mode={'date'}
                        display='default'
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({date: selectedDate, showCalendar: false});
                        }} //selected date is saved to the state
                        style={styles.formItem}
                    />
                )}
                <View style={styles.formRow}>
                    <Button 
                        onPress={() => this.handleReservation()}
                        title='Search'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;