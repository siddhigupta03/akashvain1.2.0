import React, { Component } from 'react';
import Draw from '../Navigation/DrawerNav';
import { NavigationContainer } from '@react-navigation/native';

export default class Dashboard extends Component{
    render() {
        return(
            <NavigationContainer>
                <Draw/>
            </NavigationContainer>
        )
    }
}