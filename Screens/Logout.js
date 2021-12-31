import React,{Component} from "react";
import { Text, View, StyleSheet } from "react-native";
import firebase from "firebase";

export default class extends Component {
    componentDidMount() {
        firebase.auth().signOut();
    }
    render() {
        return(
            <View style={styles.con}>
                <Text>Logout</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    con:{
        flex:1
    }
})