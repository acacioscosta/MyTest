import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import img from '../../assets/img.png'

export default function Profile(props) {

    const { name_user, username, email_user, token } = props.navigation.state.params
    
    const [name, setName] = useState('')
    const [usernameProfile, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [tokenT, setToken] = useState('')

    function logout() {
        props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        }))
    }

    useEffect(() => {
        
        setName(name_user)
        setUsername(username)
        setEmail(email_user)
        setToken(token)

    }, [])

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