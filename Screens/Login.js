import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, SafeAreaView, Image, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { StatusBar } from 'expo-status-bar';

let costom = {
    'Bubblegum-Sans': require("../assets/fonts/BubblegumSans-Regular.ttf")
}

export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fontsLoaded: false
      };
    }
  
    async _loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }
  
    componentDidMount() {
      this._loadFontsAsync();
    }

    isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
          const providerData = firebaseUser.providerData;
          for (let i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };

      onSignIn = googleUser => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken
            );
    
            // Sign in with credential from the Google user.
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(function(result) {
                if (result.additionalUserInfo.isNewUser) {
                  firebase
                    .database()
                    .ref("/users/" + result.user.uid)
                    .set({
                      gmail: result.user.email,
                      profile_picture: result.additionalUserInfo.profile.picture,
                      locale: result.additionalUserInfo.profile.locale,
                      first_name: result.additionalUserInfo.profile.given_name,
                      last_name: result.additionalUserInfo.profile.family_name,
                      current_theme: "dark"
                    })
                    .then(function(snapshot) {});
                }
              })
              .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
          } else {
            console.log("User already signed-in Firebase.");
          }
        });
      };
      signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            behaviour: "web",
            iosClientId:
              "948611370069-a1rlabhl1m9c42sgqn2nth7k9o6pdp7u.apps.googleusercontent.com",
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log(e.message);
          return { error: true };
        }
      };

      render() {
          if(!this.state.fontsLoaded){
              return <AppLoading/>
          } else {
              return(
                  <View style={styles.con}>
                      <SafeAreaView style={styles.droide}/>

                      <Image styles={styles.logo} source={require("../assets/logo.jpg")}></Image>

                      <Text style={styles.appName}>Empty</Text>

                      <TouchableOpacity 
                      styles={styles.signIn}
                      onPress={() => this.signInWithGoogleAsync()}>
                          <Text style = {styles.signInT}>Sign In With Google</Text>
                      </TouchableOpacity>

                  </View>
              );
          }
      }
}

const styles = StyleSheet.create({
    con: {
        flex:1,
        color: "#123456"
    },
    droide: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    logo: {
        width: RFValue(100),
        height: RFValue(100)
    },
    appName:{
        fontSize: RFValue(20),
        color: "#fff",
        marginTop: 20
    },
    signIn:{
        borderWidth: 1.5,
        borderRadius: 30,
        backgroundColor: "#ffffff"
    },
    signInT:{
        fontSize: RFValue(13),
        color: "black"
    }
})