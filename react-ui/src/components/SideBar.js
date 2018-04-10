// SideBar.js

import React, {Component} from 'react';
// Permet de faire un onePager
import {
    NavLink,
    HashRouter
  } from "react-router-dom";

import logo from '../avatar5.png';          

export default class SideBar extends Component {
    render(){
        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={logo} className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>Fabio Petrillo</p>
                            <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
                        </div>
                    </div>
                    <form action="#" method="get" className="sidebar-form">
                        <div className="input-group">
                        <input type="text" name="q" className="form-control" placeholder="Search..." />
                        <span className="input-group-btn">
                                <button type="submit" name="search" id="search-btn" className="btn btn-flat"><i className="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </form>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li className="header">
                            <div class="btn-audio" id="playBtn"></div>
                        </li>
                        <li>
                        <NavLink to="/">
                            <i className="fa fa-th"></i> <span>Playlists</span>
                            <span className="pull-right-container"> 
                            </span>
                        </NavLink>
                        </li>   
                        <li>
                        <NavLink to="/Search">
                            <i className="fa fa-calendar"></i> <span>Search</span>
                            <span className="pull-right-container">
                            </span>
                        </NavLink >
                        </li>
                        <li>
                        <NavLink to="/Settings">
                            <i className="fa fa-envelope"></i> <span>Settings</span>
                            <span className="pull-right-container">
                            </span>
                        </NavLink>
                        </li>
                    </ul>
                </section>
                
            </aside> 
        )
    }
}