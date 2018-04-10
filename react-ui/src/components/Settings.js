// Content.js

import React, {Component} from 'react';

import spotifyLogo from '../spotify.jpg';
import deezerLogo  from  '../deezer.jpg';
import soundcloudLogo from '../soundcloud.png';

export default class Settings extends Component {


    
    render(){
        return (
            <div id="playlist-section" className="content-wrapper"  >
                <section className="content-header">
                <div  className="row">
                   <h1 class="text-center">Settings</h1>   
                </div>

                <br/>
                <br/>
                <br/>
                
                <div className="row">
                    <h3>You must connect to the 3 stream music provider. If you don't connect to one of the 3 they will not appear in the playlist and the search</h3>  
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                
                <div id="connection-row" className="row">
                    <div className="col-sm">
                        <table>
                            <tr  className="text-center"> 
                                <td><img src={spotifyLogo} className="img-fluid" alt="User Image" /></td>
                            </tr>
                            <tr className="text-center">
                                <td><button type="button" className="btn btn-primary btn-block " ><a href='http://localhost:5000/login'>Connect to Spotify</a ></button></td>
                            </tr>
                        </table>
                    </div>

                    <div className="col-sm offset-sm-1">
                         <table>
                            <tr>
                                <td><img src={deezerLogo} className="img-fluid" alt="User Image" /></td>
                            </tr>
                            <tr className="text-center">
                                <td><button type="button" className="btn btn-primary btn-block text-center">Connect to deezer</button></td>                             
                            </tr>
                        </table>
                    </div>
                    <div className="col-sm offset-sm-1">
                    <table>
                            <tr>
                                <td><img src={soundcloudLogo} className="img-fluid" alt="User Image" /></td>
                            </tr>
                            <tr className="text-center"> 
                                <td><button type="button" className="btn btn-primary btn-block">Connect to SoundCloud</button></td>                             
                            </tr>
                        </table>
                    </div>
                </div>
            </section>
       </div>   
        )
    }   
}