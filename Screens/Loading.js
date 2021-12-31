import React, { Component } from 'react';
import { StyleSheet, View, Image } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';

export default class Loading extends Component {
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