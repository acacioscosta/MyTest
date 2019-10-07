import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from './src/Components/Home'
import New from './src/Components/New'
import ConfirmRegister from './src/Components/ConfirmRegister'
import Profile from './src/Components/Profile'

const Navegador = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      title: 'Home'
    }
  },
  New: {
    screen: New,
    navigationOptions:{
      title: 'Register'
    }
  },
  ConfirmRegister: {
    screen: ConfirmRegister,
    navigationOptions:{
      title: 'Confirm'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  }
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions:{
    headerStyle:{
      backgroundColor: '#444'
    },
    headerTintColor: '#fff'
  }
})

const AppContainer = createAppContainer(Navegador)

export default AppContainer