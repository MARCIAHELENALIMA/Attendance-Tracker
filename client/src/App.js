import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from '../src/components/LoginForm';
import ChatScreen from '../src/components/ChatScreen';
const API_BASE_URL = "http://localhost:8000";


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/chat" component={ChatScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
