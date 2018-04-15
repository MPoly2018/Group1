// Content.js

import React, {Component} from 'react';

export default class Playlists extends Component {


    
    constructor(props) {
        super(props);
    
        this.state = {
          Playlists: [],
          PlaylistContent: [],
          newPlaylist :  ""
        };
      }

    componentDidMount() {
        fetch('/playlist')
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
      
        }).then(json => {
            debugger;
            this.setState({Playlists : json});
        })
        .catch(e => {
          this.setState({
            message: `API call failed: ${e}`,
            fetching: false
          });
        })

    }

    onInputChange(e){
        this.setState({ input: e.target.value });
    }

    onplaylistClick(){
        fetch('/api')
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
      
        }).then(json => {
            this.setState({Playlists : this.state.Playlists
                          ,PlaylistContent:json });
        })
        .catch(e => {
          this.setState({
            message: `API call failed: ${e}`,
            fetching: false
          });
        })

        this.setState({ showMe : true} );
    }
    addPlaylist(){
        var self = this;
        fetch('/playlist',{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                name: self.state.input,
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
      
        }).then(json => {
            this.setState({Playlists:json});
        })
        .catch(e => {
          this.setState({
            message: `API call failed: ${e}`,
            fetching: false
          });
        })
    }

    onplaylistClick(e){
        var self = this;
        fetch('/playlist-content',{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                playlistName: e.nativeEvent.target.innerText
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
      
        }).then(json => {
            this.setState({PlaylistContent:json});
        })
        .catch(e => {
          this.setState({
            message: `API call failed: ${e}`,
            fetching: false
          });
        })
    }
    

    render(){
        var self= this;
        return (

            <div id="playlist-section" className="content-wrapper" >
                <section >
                <div className="row">
                    <div className="col-sm">
                        <h2>Playlists</h2>
                    

                        <form class="form-inline" method="POST" action="">
                            <div class="form-group">
                                <input type="text" placeholder="Add a playlist" onChange={this.onInputChange.bind(this)} name="playlistName" class="form-control" id="new-playlist" />
                            </div>

                            <button  type="button" onClick={this.addPlaylist.bind(this)} class="btn btn-success">+</button>
                        </form>

                        <table className="table table-dark table-striped">
                            <thead>
                            <tr>
                                <th>Playlist name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {           
                                
                                this.state.Playlists.map(function(playlist){
                                    return(
                                    <tr ><td onClick={self.onplaylistClick.bind(self)}  >{playlist.Name}</td></tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm">
                        <h2>Playlist content</h2>
                        <table className="table table-dark table-striped">
                            <thead>
                            <tr>
                                <th>Artist</th>
                                <th>Song name</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.PlaylistContent.map(function(song){
                                return(
                                <tr><td>  {song.Artist}  </td><td> {song.Name}  </td></tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                    </div>
            </div>
            </section>
       </div>
        )
    }
}