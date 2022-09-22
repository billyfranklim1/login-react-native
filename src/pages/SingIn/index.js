import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import Constants from 'expo-constants';

export default function SingIn() {

  const navigation = useNavigation();
  const toast = useToast();


  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [erros, setErros] = React.useState([]);
  const [loading, setLoading] = React.useState(false);


  useEffect(() => {
    const token = AsyncStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);


  function withErro(name) {
    var border = 'border-gray-400 focus:border-blue-400'
    if (name === 'name')
      border = 'border-red-400 focus:border-red-400 border-2';
    return border;
  }


  function singIn() {
    setErros([]);
    setLoading(true);
    var errors = [];
    if (email === '') {
      errors.push({ name: 'email', message: 'Email é obrigatório' });
    }

    if (password === '') {
      errors.push({ name: 'password', message: 'Senha é obrigatória' });
    }
    if (errors.length > 0) {
      setErros(errors);
      setLoading(false);
      return;
    }

    var url = Constants.manifest.extra.API_URL + '/api/auth/signin';
    var data = {
      email: email,
      password: password
    };

    axios.post(url, data).then(function (response) {
      let token = response.data.token;
      AsyncStorage.setItem("token", token);
      navigation.navigate('Home');
    }).catch(function (error) {
      toast.show(error.response.data.message, {
        type: "danger",
        duration: 3000,
        animationType: "slide-in",
      });
    }).finally(() => {
      setLoading(false);
    })

  }


  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" style={styles.loading} color="#38a69d" />}
      <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.buttonBack}>
        <Text style={styles.textBack}>Voltar</Text>
      </TouchableOpacity>
      <Animatable.View animation="fadeInLeft" duration={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)!</Text>
        <Text style={styles.text}>
          Faça seu login para continuar
        </Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUpBig" duration={500} style={styles.containerForm}>
        <Text style={styles.title}>E-mail</Text>
        <TextInput style={styles.input} placeholder="Digite seu e-mail" placeholderTextColor="#a1a1a1" name="email" value={email} onChangeText={(text) => setEmail(text)} accessibilityActionsLabel="Digite seu e-mail" keyboardType="email-address" />
        {erros.filter(e => e.name === 'email').map((erro, index) => {
          return (
            <Text key={index} style={styles.erro}>{erro.message}</Text>
          )
        })}
        <Text style={styles.title}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#a1a1a1" name="password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} accessibilityActionsLabel="Digite sua senha" />
        {erros.filter(e => e.name === 'password').map((erro, index) => {
          return (
            <Text key={index} style={styles.erro}>{erro.message}</Text>
          )
        })}
        <TouchableOpacity style={styles.button} onPress={singIn}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => { }}>
          <Text style={styles.buttonTextForgetPassword}>
            Esqueceu sua senha?
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonRegister}>
          <Text style={styles.goToSingIn}>
            Não tem conta? {""}
            <Text style={styles.buttonSingIn} onPress={() => { navigation.navigate('SingUp') }}>Criar</Text>
          </Text>
        </View>

      </Animatable.View>
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonTextForgetPassword: {
    color: '#38a69d',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonSingIn: {
    color: '#38a69d',
    fontWeight: 'bold',
    marginLeft: 10,
    textDecorationColor: '#38a69d',
  },
  buttonBack: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 25,
  },
  textBack: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonBack: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowOpacity: 0,
    marginTop: 25,
  },
  textBack: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor GRAY TRANSPARENT  
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: "#38a69d",
  },
  containerHeader: {
    marginTop: "20%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  containerForm: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    marginTop: 14,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  RegisterText: {
    color: "#a1a1a1",
  },
  erro: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  }

});