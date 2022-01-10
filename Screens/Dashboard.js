import React, { Component } from 'react';
import DrawNavigator from '../Navigation/DrawerNav';
import { NavigationContainer } from '@react-navigation/native';

export default class Dashboard extends Component{
    render() {
        return(
            <NavigationContainer>
                <DrawNavigator/>
            </NavigationContainer>
        )
    }
}