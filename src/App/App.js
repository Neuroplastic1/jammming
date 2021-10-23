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

class App extends Component {
  constructor (props) {
    super(props);
      this.state = { searchResults : searchResults }
  }
  render() {
      return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div class="App">
          < SearchBar />
          <div class="App-playlist">
           < SearchResults searchResults={this.state.searchResults}/>
           < Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App
