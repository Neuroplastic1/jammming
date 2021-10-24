import React from 'react';
import './TrackList.css';
import Track from'../Track/Track'

class TrackList extends React.Component {

    render() {
        return(
          <div className="TrackList">
            {this.props.tracks &&
              this.props.tracks.map((potato) => {
               return ( <Track track={potato} key={potato.id} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval}/>);
            })}
          </div>
        );
    }
}

export default TrackList;
