import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import api from '../../Services/api'
import { StackActions, NavigationActions } from 'react-navigation'

export default function Register(props) {

    const [name_user, setName] = useState('') // Estado que armazena o nome completo do usuário
    const [username, setUsername] = useState('') // Estado que armazena o nome do usuário
    const [email_user, setEmail] = useState('') // Estado que armazena o e-mail do usuário
    const [password_user, setPassword] = useState('') // Estado que armazena a senha do usuário
    const [confirmPasswordUser, setConfirmPasswordUser] = useState('') // Estado que a armazena a confirmação de senha do usuário
    const [used, setUsed] = useState(false) // Estado que armazena se o usuário e/ou e-mail informado já está cadastrado e mostra mensagem em tela
    const [passwordInvalid, setPasswordInvalid] = useState(false) // Estado que armazena se a senha não está dentro das condições estabelecidas e mostra mensagem em tela
    const [errorDifferentPassword, setErrorDifferentPassword] = useState(false) // Estado que armazena se a senha e confirmação de senha estão divergentes e mostra mensagem em tela
    const [errorFieldEmpty, setErrorFieldEmpty] = useState(false) // Estado que armazena se existe algum campo vaxio

    async function register() {
      clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
      if (name_user === '' || username === '' || email_user === '' || password_user === '' || confirmPasswordUser === '') { // Verifica se todos os campos estão preenchidos
        return setErrorFieldEmpty(true) // Altera o estado para que mostre a mensagem
      }
      if ((password_user.length < 6) || (!password_user.match(/[a-z]+/)) || (!password_user.match(/[A-Z]+/))) { // Verifica se a senha informada atende aos requisitos
        return setPasswordInvalid(true) // Altera o estado para que mostre a mensagem
      }
      if (password_user !== confirmPasswordUser) { // Verifica se a senha e confirmação de senha estão divergentes
        return setErrorDifferentPassword(true) // Altera o estado para que mostre a mensagem
      }
      const response = await api.post('/register', { name_user, username, email_user, password_user}) // Chamada à API para cadastro
      if (response.data.message === 'USERNAME_OR_EMAIL_ALREADY_REGISTERED') { // Executa caso exista o usuário já cadastrado
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
        setUsed(true) // Altera o estado para que mostre a mensagem
      }
      if (response.data.message === 'USER_REGISTERED') { // Executa caso o usuário seja cadastrado
        props.navigation.dispatch(StackActions.reset({
          index: 0, // "apaga" histórico de navegação para não aparecer opção de retornar à tela anterior
          actions: [
              NavigationActions.navigate({ routeName: 'ConfirmRegister' }) // Navega para a rota ConfirmRegister
          ]
      }))
    }
    }

    function recoveryName(event) { // Função que recupera e armazena o valor digitado no campo de nome completo
      setName(event) // Armazena o valor digitado no estado name_user
      clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryUsername(event) { // Função que recupera e armazena o valor digitado no campo de usuário
      let lower = event.toLowerCase() // Transforma o texto em caixa baixa
      setUsername(lower) // Armazena o valor digitado no estado username
      clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryEmail(event) { // Função que recupera e armazena o valor digitado no campo de e-mail
      let lower = event.toLowerCase()  // Transforma o texto em caixa baixa
      setEmail(lower) // Armazena o valor digitado no estado email_user
      clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryPassword(event) { // Função que recupera e armazena o valor digitado no campo de senha
        setPassword(event) // Armazena o valor digitado no estado password_user
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function recoveryConfirmPassword(event) { // Função que recupera e armazena o valor digitado no campo de confirmação de senha
        setConfirmPasswordUser(event) // Armazena o valor digitado no estado confirmPasswordUser
        clearMsgError() // Executa função clearMsgError - Limpa mensagens de erro da tela, caso exista
    }
    
    function clearMsgError() { // Função que limpa todas as mensagens de erro da tela, caso haja
        setUsed(false) // Limpa mensagem de erro de usuário existente
        setPasswordInvalid(false) // Limpa mensagem de erro de senha inválida
        setErrorDifferentPassword(false) // Limpa mensagem de erro de senha e confirmação de senha divergentes
        setErrorFieldEmpty(false) // Limpa mensagem de erro de campo(s) vazio(s)
    }

    return (
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.txtInfo}>Cadastre-se no MyTest</Text>
            {errorFieldEmpty && <Text style={styles.txtError}>Todos os campos devem ser preenchidos!</Text>}
            {used && <Text style={styles.txtError}>Usuário e/ou e-mail já utilizado</Text>}
            {passwordInvalid && <Text style={styles.txtError}>Senha inválida!</Text>}
            {errorDifferentPassword && <Text style={styles.txtError}>Senha e confirmação de senha estão divergentes!</Text>}
          </View>
          <View style={styles.form}>
            <Text style={styles.txtInput}>Nome completo: *</Text>
            <TextInput style={styles.input} placeholder='Nome completo' onChangeText={event => recoveryName(event)} />
            <Text style={styles.txtInput}>Usuário: *</Text>
            <TextInput style={styles.input} placeholder='Nome de usuário' onChangeText={event => recoveryUsername(event)} />
            <Text style={styles.txtInput}>E-mail: *</Text>
            <TextInput style={styles.input} placeholder='Seu e-mail' onChangeText={event => recoveryEmail(event)} />
            <Text style={styles.txtInput}>Senha: *<Text style={styles.labelInfo}> (mínimo 6 dígitos, pelo menos uma letra minúscula, uma maiúscula e números)</Text></Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder='Sua senha' onChangeText={event => recoveryPassword(event)} />
            <Text style={styles.txtInput}>Confirme sua senha: *<Text style={styles.labelInfo}> (senha deve ser a mesma digitada anteriormente)</Text></Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder='Confirme sua senha' onChangeText={event => recoveryConfirmPassword(event)} />

            <TouchableOpacity style={styles.btnBlue} onPress={register}>
                <Text style={styles.txtBtn}>CADASTRAR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  content:{
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: 5,
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
  },
  labelInfo:{
      fontSize: 12,
      color: '#999'
  }
})
