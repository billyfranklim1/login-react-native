import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';

export default function Home() {

  const navigation = useNavigation();

  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  function logout() {
    AsyncStorage.removeItem("token");
    navigation.navigate("Welcome");
  }

  const getUser = async () => {
    var url = Constants.manifest.extra.API_URL + '/api/user/me';
    const response = await axios.get(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }}).then(res => {
        console.log(res.data);
        setUser(res.data);
      }).catch(function (error) {
      console.log(error);
    });
    setUser(response.data);
  }

  const getToken = async () => {
    const AStoken = await AsyncStorage.getItem('token')
    setToken(AStoken)
  }

  useEffect(() => {
    getToken()
    getUser()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to the app, {user.name.split(' ')[0]}
      </Text>scripts
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 100,
    marginLeft: 20,
  },
  button: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#38a69d",
    fontSize: 20,
    fontWeight: "bold",
  }
    
 

});