import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform, SafeAreaView, Image, Text } from "react-native";
import * as Font from "expo-font"; 
import AppLoading from 'expo-app-loading';

let costoms = {
    'Bubblegum': require("../assets/fonts/BubblegumSans-Regular.ttf")
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: '',
            fonts_loaded: false
        }
    }

    loadFontsAsync = async() => {
        await Font.loadAsync(costoms);
        this.setState({ fonts_loaded: true });
    }

    componentDidMount() {
        this.loadFontsAsync();
        this.getWeather();
    }

    getWeather = async() => {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=Hyderabad,india&APPID=835cf2050dc07130a45e193f80e65ff5'
        return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            weather: responseJson,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
        if(!this.state.fonts_loaded && this.state.weather === ''){
            return <Image style={styles.loading} source={require("../assets/load.gif")}></Image>
        } else {
            return(
                <View style = {styles.con}>
                    <Image  style={styles.logo} source={require("../assets/logo.jpg")}/>
                    <Text style={styles.appName}>Akashvani</Text>
                    
                    <View style={styles.weatherCon}>
                        <View>
                            <Text>Description: {this.state.weather[0].descriptions}</Text>
                        </View>

                        <View>
                            <Text>Humidity: {this.state.weather.humidity}</Text>
                        </View>

                        <View>
                            <Text>Minimum temperature: {this.state.weather.main.temp_min}</Text>
                        </View>

                        <View>
                            <Text>Maximum temperature: {this.state.weather.main.temp_max}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.whatToTake}>
                       {this.state.weather[0].descriptions === "light rain" || this.state.weather[0].descriptions === "rain" || this.state.weather[0].descriptions === "heavy rain" ? <Text>Please don't forget to take your umbrella.</Text> : null }
                    </View>

                    <View style={styles.whatToTake}>
                       {this.state.weather.main.temp_min === "<29" ? <Text>Please don't forget to take your napkin.</Text> : null }
                    </View>
                </View>
            );
        }
    }
}