import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from '../src/components/LoginForm';
import ChatScreen from '../src/components/ChatScreen';
import styles from './App.module.css';

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/chat" component={ChatScreen} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
