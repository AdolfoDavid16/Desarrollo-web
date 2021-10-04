import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Articulos from './components/admin/Articulos';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Admin from './components/admin/Index';




function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={['/admin', '/admin/articulos']}>
              <Switch>
                <Route path='/admin/articulos'>
                  <Articulos />
                </Route>
                <Route path='/admin'>
                  <Admin />
                </Route>
              </Switch>
          </Route>
        </Switch>  
        <Switch>
          <Route exact path="/home"  component={Home}/>
          <Route exact path="/"  component={Login}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;