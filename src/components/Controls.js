import React, { Component } from 'react';
import {connect} from 'react-redux';
import {playAction} from '../actions/playPauseStopRecord'
import {pauseAction} from '../actions/playPauseStopRecord'
import {stopAction} from '../actions/playPauseStopRecord'
import {recordAction} from '../actions/playPauseStopRecord'
import {toggleTrackPlaybackAction} from '../actions/playPauseStopRecord'

const mapStateToProps = state =>({
    isPlaying:state.playStopPauseRecord.isPlaying,
    timeStamp:state.playStopPauseRecord.timeStamp,
    isRecording:state.playStopPauseRecord.isRecording,
    recordedTracks:state.playStopPauseRecord.recordedTracks

});


const mapDispatchToProps = (dispatch)=>{  // attach all your methods here
    return{
       play:  () => {
       	dispatch(playAction(this.props))

       },

        pause:  () => {
        dispatch(pauseAction())

       },

        stop:  () => { 
        dispatch(stopAction())

       },

        record:  () => {
        dispatch(recordAction())

       },

        toggleTrackPlayback:  (indexOfTrack) => {
          console.log("TEST");
        dispatch(toggleTrackPlaybackAction(indexOfTrack))


       }
   }
}


class Playbutton extends Component {
	render(){


     let tracksRecorded = this.props.recordedTracks.map((val,index)=>{
        return (
                  <li key={index}>
                      <span>Time: {val.time}</span> <span> PLAY: <input type="checkbox"onChange={()=>this.props.toggleTrackPlayback(index)}/> </span>

                  </li>
              )
     })


    let RecordOrStopRecording = this.props.isRecording ? "Stop Recording" : "Start Recording"

		return(
         <div>

            <section>
              <div>{this.props.isPlaying + ""}</div>
              <button onClick={this.props.play}>Play</button>
              <button onClick={this.props.stop}>Stop</button>
              <button onClick={this.props.pause}>Pause</button>
              <button onClick={this.props.record}>{RecordOrStopRecording}</button>
            </section>

            <section>
              <ul>
                {tracksRecorded}
              </ul>
            </section>
         </div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Playbutton);

