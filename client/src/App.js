import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginForm from '../src/components/LoginForm';
import ChatScreen from '../src/components/ChatScreen';

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
