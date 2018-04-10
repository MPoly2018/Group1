// Content.js

import React, {Component} from 'react';

export default class Playlists extends Component {


    
    constructor(props) {
        super(props);
    
        this.state = {
          Playlists: [],
          PlaylistContent: []
        };
      }

    componentDidMount() {
        fetch('/api')
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

    render(){
        var self= this;
        return (

            <div id="playlist-section" className="content-wrapper" >
                <section >
                <div className="row">
                    <div className="col-sm">
                        <h2>Playlists</h2>
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
                                    <tr onChange={self.onplaylistClick.bind(this)}><td>{playlist.Name}</td></tr>
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
                                <th>Supplier</th>
                                <th>Song name</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                            this.state.PlaylistContent.map(function(song){
                                return(
                                <tr><td>  {song.Supplier}  </td><td> {song.Name}  </td></tr>
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