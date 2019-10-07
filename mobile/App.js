import React from 'react'
import { createAppContainer } from 'react-navigation' // 
import { createStackNavigator } from 'react-navigation-stack'

import Home from './src/Components/Home' // Importa componente Home
import New from './src/Components/New' // Importa componente New
import ConfirmRegister from './src/Components/ConfirmRegister' // Importa componente ConfirmRegister
import Profile from './src/Components/Profile' // Importa componente Profile

const Navegador = createStackNavigator({ // Cria um arquivo de controle de rotas
  Home: { // Configurações da rota Home
    screen: Home,
    navigationOptions:{
      title: 'Home'
    }
  },
  New: { // Configurações da rota New (cadastro de usuário)
    screen: New,
    navigationOptions:{
      title: 'Register'
    }
  },
  ConfirmRegister: { // Configurações da rota ConfirmRegister (confirmação de cadastro)
    screen: ConfirmRegister,
    navigationOptions:{
      title: 'Confirm'
    }
  },
  Profile: { // Configurações da rota Profile
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  }
}, {
  initialRouteName: 'Home', // Define ponto de entrada
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor: '#444' // Define cor de fundo do header
    },
    headerTintColor: '#fff' // Define cor da fonte do title do header
  }
})

const AppContainer = createAppContainer(Navegador) // Cria um "container" com as rotas

export default AppContainer // Exporta o "container"