import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   const token = AsyncStorage.getItem("token");
  //   if (token) {
  //     navigation.navigate("Home");
  //   }
  // }, []);


  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image animation="flipInY" source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
      </View>

      <Animatable.View style={styles.containerForm} animation="fadeInUpBig" duration={600}>
        <Text style={styles.title}>
          Monitore, organize e acompanhe seus gastos com facilidade.
        </Text>
        <Text style={styles.text}>
          Faça seu login ou cadastre-se para começar.
        </Text>
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("SingIn") }}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => { navigation.navigate("SingUp") }}>
            <Text style={styles.buttonTextSecondary}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  logo: {
    width: "100%",
  },
  containerLogo: {
    flex: 6,
    backgroundColor: "#38a69d",
    justifyContent: "center",
    alignItems: "center",
  },
  containerButton: {
    marginTop: "15%",
  },
  containerForm: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    paddingVertical: "10%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    color: "#a1a1a1",
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    // position: "absolute",
    marginBottom: "5%",
    backgroundColor: "#38a69d",
    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    // position: "absolute",
    marginBottom: "5%",
    backgroundColor: "#fff",
    borderColor: "#38a69d",
    borderWidth: 3,

    borderRadius: 50,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    bottom: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextSecondary: {
    fontSize: 18,
    color: "#38a69d",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  }
});