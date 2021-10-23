import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList'

class SearchResults extends React.Component {

 // passing searchResults aquired from app as tracks to Tracklist
  render() {
    console.log(this.props.searchResults);
    return(
      <div className="SearchResults">
        <h2>Search Results</h2>
        <TrackList tracks={this.props.searchResults}/>
      </div>
    );
  }
}

export default SearchResults
