import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

export default function ConfirmRegister(props) {

    function goHome() { // Executa quando o botão VOLTAR é acionado
        props.navigation.dispatch(StackActions.reset({
            index: 0, // "apaga" histórico de navegação para não aparecer opção de retornar à tela anterior
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }) // Navega para a rota Home
            ]
        }))
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtInfo}>Cadastro efetuado com sucesso!</Text>
            <Text style={styles.txtInfo}>Você receberá um e-mail com um link para ativação do cadastro!</Text>
            <TouchableOpacity style={styles.btn} onPress={goHome}>
                <Text style={styles.txtBtn}>VOLTAR</Text>
            </TouchableOpacity>
        </View>
    )
}

// CSS para estilização do componente
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInfo: {
        fontSize: 20,
        margin: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        marginTop: 20,
        marginBottom: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#3678f2'
    },
    txtBtn: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    }
})