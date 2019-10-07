import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import img from '../../assets/img.png'

export default function Profile(props) {

    const { name_user, username, email_user, token } = props.navigation.state.params // Desestruturação para pegar dados necessários enviados nas props
    
    const [name, setName] = useState('') // Estado que armazena o nome completo
    const [usernameProfile, setUsername] = useState('') // Estado que armazena o nome do usuário
    const [email, setEmail] = useState('') // Estado que armazena o e-mail
    const [tokenJWT, setToken] = useState('') // Estado que armazena o token jwt

    function logout() { // Função responsável por fazer logout
        props.navigation.dispatch(StackActions.reset({
            index: 0, // "apaga" histórico de navegação para não aparecer opção de retornar à tela anterior
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }) // Navega para a rota Home
            ]
        }))
    }

    useEffect(() => { // Executa quando componente está montado
        
        setName(name_user) // Altera estado name_user
        setUsername(username) // Altera estado username
        setEmail(email_user) // Altera estado email_user
        setToken(token) // Altera estado tokenJWT

    }, []) // Segundo parâmetro "[]" indica que será executado somente uma vez

    return(
        <View style={styles.container}>
            <Image source={img} style={styles.img} />
            <Text style={styles.txt}>{name}</Text>
            <Text style={styles.txt}>{usernameProfile}</Text>
            <Text style={styles.txt}>{email}</Text>
            <TouchableOpacity style={styles.btnRed} onPress={logout}>
                <Text style={styles.txtBtn}>SAIR</Text>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    img:{
        marginTop: 30,
        marginBottom: 30,
        width: 250,
        height: 250,
        borderRadius: 125
    },
    txt:{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5
    },
    btnRed:{
        marginTop: 20,
        marginBottom: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#f05a5b',
        width: '90%'
    },
    txtBtn:{
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20
    }
})