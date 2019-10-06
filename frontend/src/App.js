import React from 'react' // Importa React
import './App.css' // Importa arquivo CSS

import Routes from './routes' // Importa componente de rotas

const App = () => { // Stateless component App
  return(
    <div className="container">
      <Routes />
    </div>
  )
}

export default App