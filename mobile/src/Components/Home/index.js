import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import api from '../../Services/api'

export default function Home(props) {

    const [emailOrUserName, setEmailOrUsername] = useState('') // Estado que armazena o e-mail ou nome de usuário digitado
    const [password_user, setPassword] = useState('') // Estado que armazena a senha digitada pelo usuário
    const [error, setError] = useState(false) // State que controla a exibição ou não da informação de usuário e/ou senha inválidos
    const [inactive, setInactive] = useState(false) // State que controla a exibição ou não da informação de usuário bloqueado

    function recoveryEmailOrUsername(event) { // Função que recupera e armazena o valor digitado no campo de Login
        const lower = event.toLowerCase() // Transforma todo o texto em minúsculo
        setEmailOrUsername(lower) // Armazena o valor digitado no estado email
        clearMessage() // Limpa mensagens de erro da tela, casa haja
    }

    function recoveryPassword(event) { // Função que recupera e armazena o valor digitado no campo de senha
        setPassword(event) // Armazena o valor digitado no estado password_user
        clearMessage() // Limpa mensagens de erro da tela, casa haja
    }

    function clearMessage() { // Função que limpa mensagens de erro da tela, casa haja
        setError(false) // Altera estado error para retirar mensagem da tela, caso esteja
        setInactive(false) // Altera estado inactive para retirar mensagem da tela, caso esteja
    }

    async function login() { // Função responsável pela autenticação
        const response = await api.post('/auth', { emailOrUserName, password_user }) // Chamada à API tipo POST para a rota /auth
        if (response.data.message === 'USER_NOT_FOUND') { // Executa caso o usuário não seja encontrado
            return setError(true) // Altera o estado para que mostre a mensagem
        }
        if (response.data.message === 'USER_NOT_ACTIVATED') { // Executa caso o usuário esteja bloqueado
            return setInactive(true) // Altera o estado para que mostre a mensagem
        }
        
        const { name_user, username, email_user, auth, token } = await response.data // Desestruturação para pegar os dados necessários
        
        if (auth) { // Executa se o usuário for autenticado
            props.navigation.dispatch(StackActions.reset({
                index: 0, // "apaga" histórico de navegação para não aparecer opção de retornar à tela anterior
                actions: [
                    NavigationActions.navigate({ routeName: 'Profile', params: { name_user, username, email_user, token } }) // Navega para a rota Profile passando parâmetros
                ]
            }))
        }
    }

    function register() {
        props.navigation.navigate({ routeName: 'New' }) // Navega para a rota New
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
