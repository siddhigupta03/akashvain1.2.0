import React, { Component } from 'react';
import { StyleSheet, View, Image } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class Loading extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
      }
    
      checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.props.navigation.navigate("Dashboard");
          } else {
            this.props.navigation.navigate("Login");
          }
        });
      };

    render() {
        return(
            <View>
                <Image style={styles.loading} 
                source={require("../assets/load.gif")}></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        width: RFValue(100),
        height: RFValue(100)
    }
})