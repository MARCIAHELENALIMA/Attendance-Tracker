import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from '../src/components/LoginForm';
import ChatScreen from '../src/components/ChatScreen';
import { ThemeProvider } from 'react-bootstrap';
import './bootstrap/css/bootstrap.min.css'; // Importar os estilos do Bootstrap

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app"> {/* Remova a importação do arquivo de estilos e adicione a classe diretamente */}
          <Switch>
            <Route exact path="/" component={LoginForm} />
            <Route path="/chat" component={ChatScreen} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
