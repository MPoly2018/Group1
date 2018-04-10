// Header.js
import React, {Component} from 'react';

export default class Header extends Component {
    render(){
        return (
        
        <div id="audio-player">
            <div id="title">
                <span id="track"></span>
                <div id="timer">0:00</div>
                <div id="duration">0:00</div>
            </div>


            <div class="controlsOuter">
                <div class="controlsInner">
                    <div id="loading"></div>
                    <div class="btn" id="playBtn"></div>
                    <div class="btn" id="pauseBtn"></div>
                    <div class="btn" id="prevBtn"></div>
                    <div class="btn" id="nextBtn"></div>
                </div>
                <div class="btn" id="playlistBtn"></div>
                <div class="btn" id="volumeBtn"></div>
            </div>


            <div id="waveform"></div>
         
            <div id="progress"></div>

            <div id="playlist">
                <div id="list"></div>
            </div>


            <div id="volume" class="fadeout">
                <div id="barFull" class="bar"></div>
                <div id="barEmpty" class="bar"></div>
                <div id="sliderBtn"></div>
            </div>
        </div>
        )
    }
}


