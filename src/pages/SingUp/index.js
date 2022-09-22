import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import Constants from 'expo-constants';

export default function SingUp() {

  const navigation = useNavigation();
  const toast = useToast();


  const [isAuth, setIsAuth] = useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
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


  function singUp() {
    setErros([]);
    setLoading(true);
    var errors = [];

    if (name === ''){
      errors.push({ name: 'name', message: 'O nome é obrigatório' });
    }

    if (email === '') {
      errors.push({ name: 'email', message: 'Email é obrigatório' });
    }

    if (password === '') {
      errors.push({ name: 'password', message: 'Senha é obrigatória' });
    }

    if (confirmPassword === '') {
      errors.push({ name: 'confirmPassword', message: 'Confirmação de senha é obrigatória' });
    }


    if (errors.length > 0) {
      setErros(errors);
      setLoading(false);
      return;
    }

    var url = Constants.manifest.extra.API_URL + '/api/auth/signup';
    var data = {
      name: name,
      email: email,
      password: password
    };

    axios.post(url, data).then(function (response) {
      let token = response.data.token;
      AsyncStorage.setItem("token", token);
      navigation.navigate('Home');
    }).catch(function (error) {
      if(error.response.data.message.errors){
        let errosResponse = error.response.data.message.errors;
        let newErros = [];

        for (const key in errosResponse) {
          newErros.push({ name: key, message: errosResponse[key].message });
        }
        setErros(newErros);

      }else{
        toast.show(error.response.data.message, {
          type: "danger",
          duration: 3000,
          animationType: "slide-in",
        });
      }
     
    }).finally(() => {
      setLoading(false);
    })

  }


  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" style={styles.loading} color="#38a69d" />}
      {/* button back icon arrow */}
      <TouchableOpacity onPress={() => navigation.navigate('SingIn')} style={styles.buttonBack}>
        <Text style={styles.textBack}>Voltar</Text>
      </TouchableOpacity>

      <Animatable.View animation="fadeInLeft" duration={500} style={styles.containerHeader}>
        <Text style={styles.message}>Olá!</Text>
        <Text style={styles.text}>
        Crie sua conta para continuar
        </Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" duration={500} style={styles.containerForm}>
      <Text style={styles.title}>Nome</Text>
        <TextInput style={styles.input} placeholder="Digite seu nome completo" placeholderTextColor="#a1a1a1" name="name" value={name} onChangeText={(text) => setName(text)} accessibilityActionsLabel="Digite seu nome completo"  />
        {erros.filter(e => e.name === 'name').map((erro, index) => {
          return (
            <Text key={index} style={styles.erro}>{erro.message}</Text>
          )
        })}

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
        <Text style={styles.title}>Confirme sua senha</Text>
        <TextInput style={styles.input} placeholder="Confirme sua senha" placeholderTextColor="#a1a1a1" name="confirmPassword" value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} accessibilityActionsLabel="Confirme sua senha" />
        {erros.filter(e => e.name === 'confirmPassword').map((erro, index) => {
          return (
            <Text key={index} style={styles.erro}>{erro.message}</Text>
          )
        })}
        <TouchableOpacity style={styles.button} onPress={singUp}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.buttonRegister} onPress={() => { navigation.navigate('SingIn') }}>
          <Text style={styles.RegisterText}>
            Já tem uma conta? {""}
            <Text style={styles.buttonSingIn}>Entrar</Text>
          </Text>
        </TouchableOpacity> */}

        <View style={styles.buttonRegister}>
          <Text style={styles.goToSingIn}>
            Já tem uma conta? {""}
            <Text style={styles.buttonSingIn} onPress={() => { navigation.navigate('SingIn') }}>Entrar</Text>
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
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: "2%",
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
    marginTop: '15%',
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
    alignItems: "center",
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