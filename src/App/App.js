import React, {Component} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import './App.css'

// hard coded searchResults array of track={} objects
// to pass the state of the App component’s searchResults to the SearchResults component.
const searchResults = [
                        {name: 'Luminous Beings', artist: 'Jon Hopkins', album: 'Singularity', id: 1},
                        {name: 'Et demain?', artist: 'Et demain? Le collectif', album: 'Et demain?', id: 2},
                        {name: 'Blessings', artist: 'Hollow Coves', album: 'Blessings', id: 3}
                      ]
const playlistTracks = [
                        {name: 'Ilalo', artist: 'Chancha Via Circuito', album: 'Bienaventuranza', id: 1},
                        {name: 'L.O.V.E.', artist: 'Degiheugi', album: 'Dancing Chords and Fireflies', id: 2},
                        {name: 'Tickling the Amygdala', artist: 'Museum of Consciousness', album: 'Shpongle', id: 3}
                      ]

class App extends Component {
  constructor (props) {
    super(props);
      this.state = {
        searchResults : searchResults,
        playlistName : "Dummy playlist",
        playlistTracks : playlistTracks
      }
      this.addTract = this.addTrack.bind(this)
      this.removeTract = this.removeTrack.bind(this)
  }

// checking to see if the track already exist in the playlist. If not then push the new track into the playlist.
  addTrack(track) {
   if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
     return;
   }
   playlistTracks.push(track);
   this.setState({playlistTracks: playlistTracks})
  }
// creating an updatedPlaylist array after filtering out given track
  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks
    const updatedPlaylistTracks = playlistTracks.filter(playlistTrack => playlistTracks.id !== track.id)
    this.setState({playlisTracks: updatedPlaylistTracks})
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
           <SearchBar />
             <div class="App-playlist">
              <SearchResults searchResults={this.state.searchResults} onAdd = {this.addTrack} />
              <Playlist playlistName={this.state.playlisName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
             </div>
        </div>
      </div>
    );
  }
}

export default App
