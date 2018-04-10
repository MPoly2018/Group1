// App.js

import React, { Component } from 'react';
import ReactDOM from "react-dom";

// Permet de faire un onePager
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

//Ce sont toutes les pages différentes
import Header from './components/Header';
import SideBar from './components/SideBar';

import Playlists from './components/Playlists';
import Browse from './components/Browse';
import Search from './components/Search';
import Settings from './components/Settings';
import AudioPlayer from './components/AudioPlayer';


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <SideBar />       
        <Route exact path="/" component={Playlists}/>
        <Route path="/Search" component={Search}/>
        <Route path="/Settings" component={Settings}/>
    
      </div>
    );
  }
}


export default App;