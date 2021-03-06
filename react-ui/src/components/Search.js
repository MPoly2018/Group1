// Content.js

import React, {Component} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#modal')

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '700px'
    }
  };
  

export default class Search extends Component {


    constructor(props) {
        super(props);
        this.state = {
            song : [],
            Playlists: [],
            modalIsOpen: false,
            songToAdd: ""
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this)
      }

      openModal (e) {
        this.setState({ 
            song : this.state.song,
            Playlists: this.state.Playlists,
            modalIsOpen: true,
            chosenSong: e.nativeEvent.target.id
        });
      }
      
      closeModal () {
        this.setState({ 
            song : this.state.song,
            Playlists: this.state.Playlists,
            modalIsOpen: false
        });
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

    onChange({target}) {
        fetch('/search',{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                name: target.value,
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
      
        }).then(json => {
          
            this.setState({song : json});
        })
        .catch(e => {
          this.setState({
            message: `API call failed: ${e}`,
            fetching: false
          });
        })

        this.setState({ showMe : true} );
     }

     addSongToPlaylist(e    ) {
        fetch('/playlist-content-add',{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                playlistName: e.nativeEvent.target.innerText,
                songName: this.state.chosenSong
            })
        })
        .then(response => {
            this.closeModal();
            if (response.ok) {
                return response.json(); 
            }
      
        }).then(json => {

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
        var self = this;
        return (
            <div className="content-wrapper" >
        
                <section className="content-header">

                    <div className="row">
                        <div className="input-group">
                            <input id="song-search" type="text" className="form-control"  onBlur={this.onChange.bind(this)} placeholder="enter song name" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <h2>Song</h2>
                            <table className="table table-dark table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>Supplier</th>
                                    <th>Song </th>
                                    <th>Artist</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody id="song-list">
                                    {
                                        this.state.song.map(function(song){
                                         return(
                                         <tr><td>  {song.Supplier}  </td><td ><div>{song.Name}</div></td>  <td>  {song.Artist}  </td><td>  <button type="button"  class="btn btn-success float-right">Play</button> <button id={song.Name+':'+song.Artist} type="button" class="btn btn-secondary float-right" onClick={self.openModal}>Add to playlist</button>   </td></tr>
                                         )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                <Modal 
                      isOpen={this.state.modalIsOpen}
                      contentLabel="Minimal Modal Example"
                      style={customStyles}
                >
                <table className="table table-dark table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Playlists</th>

                        </tr>
                        </thead>
                        <tbody >
                            {
                                this.state.Playlists.map(function(playlist){
                                    return(
                                    <tr><td  onClick={self.addSongToPlaylist.bind(self)}>  {playlist.Name}  </td></tr>
                                    )
                            })}
                        </tbody>
                </table>
                <button onClick={this.closeModal}  class="btn btn-secondary float-center">close</button>
                 </Modal>
            </div>


        )
    }
}