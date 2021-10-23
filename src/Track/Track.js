import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props)

    this.addTrack = this.addTrack.bind(this)
  }

  addTrack() {
    this.props.onAdd(this.props.track)
  }
    render() {
        return(
          <div class="Track">
            <div class="Track-information">
             <h3>{this.props.track.name}</h3>
             <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            <button class="Track-action" onCLick={this.addTrack}>Only add track feature</button>
          </div>
        );
    }
}

export default Track;
