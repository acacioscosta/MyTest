import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import api from '../../Services/api'

export default function Home(props) {

    const [emailOrUserName, setEmailOrUsername] = useState('') // Estado que armazena o e-mail ou nome de usuário digitado
    const [password_user, setPassword] = useState('') // Estado que armazena a senha digitada pelo usuário
    const [error, setError] = useState(false) // State que controla a exibição ou não da informação de usuário e/ou senha inválidos
    const [inactive, setInactive] = useState(false) // State que controla a exibição ou não da informação de usuário bloqueado

    function recoveryEmailOrUsername(event) {
        const lower = event.toLowerCase()
        setEmailOrUsername(lower)
        clearMessage()
    }

    function recoveryPassword(event) {
        setPassword(event)
        clearMessage()
    }

    function clearMessage() {
        setError(false)
        setInactive(false)
    }

    async function login() {
        const response = await api.post('/auth', { emailOrUserName, password_user })
        if (response.data.message === 'USER_NOT_FOUND') {
            return setError(true)
        }
        if (response.data.message === 'USER_NOT_ACTIVATED') { // Executa caso o usuário esteja bloqueado
            return setInactive(true) // Altera o estado para que mostre a mensagem
        }
        
        const { name_user, username, email_user, auth, token } = await response.data // Desestruturação para pegar os dados necessários
        
        if (auth) { // Executa se o usuário for autenticado
            props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Profile', params: { name_user, username, email_user, token } })
                ]
            }))
        }
    }

    function register() {
        props.navigation.navigate({ routeName: 'New' })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View >
                    <Text style={styles.txtInfo}>Faça Login</Text>
                    <Text style={styles.txtInfo}>ou</Text>
                    <Text style={styles.txtInfo}>Cadastre-se</Text>
                </View>
            </View>
            <View style={styles.form}>
                {error && <Text style={styles.txtError}>Usuário e/ou senha inválido(s)!</Text>}
                {inactive && <Text style={styles.txtError}>Bloqueado! Confirme seu cadastro</Text>}
                <Text style={styles.txtInput}>Login:</Text>
                <TextInput style={styles.input} placeholder='E-mail ou nome de usuário' onChangeText={event => recoveryEmailOrUsername(event)} />
                <Text style={styles.txtInput}>Senha:</Text>
                <TextInput style={styles.input} secureTextEntry={true} placeholder='Sua senha' onChangeText={event => recoveryPassword(event)} />
                <TouchableOpacity style={styles.btnBlue} onPress={login}>
                    <Text style={styles.txtBtn}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRed} onPress={register}>
                    <Text style={styles.txtBtn}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff'
  },
  content:{
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  txtInfo:{
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  form:{
    margin: 30
  },
  input:{
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: .3,
    shadowRadius: 2,
    elevation: 3,
    color: '#444',
    backgroundColor: '#fff'
  },
  txtInput:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444'
  },
  btnBlue:{
    marginTop: 20,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3678f2'
  },
  btnRed:{
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f05a5b'
  },
  txtBtn:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  },
  txtError:{
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f05a5b',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
  }
})
