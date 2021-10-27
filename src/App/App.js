import React, {Component} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Spotify from '../util/Spotify'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props);
      this.state = {
        searchResults : [],
        playlistTracks : []
      }

      this.addTrack = this.addTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.updatePlaylistName = this.updatePlaylistName.bind(this)
      this.savePlaylist = this.savePlaylist.bind(this)
      this.search = this.search.bind(this)
  }

// checking to see if the track already exist in the playlist. If not then push the new track into the playlist.
  addTrack(track) {
    const playlistTracks = this.state.playlistTracks

    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
     return;
   }
   playlistTracks.push(track);
   this.setState({playlistTracks: playlistTracks})
  }
// creating an updatedPlaylist array after filtering out given track
  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks
    const updatedPlaylistTracks = playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    this.setState({playlistTracks: updatedPlaylistTracks})
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      })
    })
  }

  search(term) {
   Spotify.search(term).then(searchResults => this.setState({searchResults: searchResults}));
 }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
           <SearchBar onSearch={this.search}/>
             <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack} />
              <Playlist playlistName={this.state.playlisName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}/>
             </div>
        </div>
      </div>
    );
  }
}

export default App
