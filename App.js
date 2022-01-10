import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createSwitchNavigator } from 'react-navigation';

import Dashboard from './Screens/Dashboard';
import Login from './Screens/Login';
import Loading from './Screens/Loading'

import firebase from 'firebase';
import { firebaseConfig } from './config';

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitcher = createSwitchNavigator({
    'Login': Login,
    'Loading': Loading,
    'Dashboard': Dashboard
})

const Appcon = createAppContainer(AppSwitcher);

export default function App() {
    return <Appcon/>
}