import React, { Component } from 'react';




class Playbutton extends Component {
	render(){

  


     let tracksRecorded = this.props.recordedTracks.map((val,index)=>{
        return (
                  <li key={index}>
                    <span>
                      Time: {val.time}
                    </span> 
                    <span> 
                      PLAY: <input type="checkbox"onChange={()=>this.props.toggleTrackPlaybackAction(index)}/> 
                    </span>
                  </li>
              )
     })


    let RecordOrStopRecording = this.props.isRecording ? "Stop Recording" : "Start Recording"

		return(
         <div>

            <section>
              <div>{this.props.isPlaying + ""}</div>
              <button onClick={this.props.playAction}>Play</button>
              <button onClick={this.props.stopAction}>Stop</button>
              <button onClick={this.props.pauseAction}>Pause</button>
              <button onClick={this.props.recordAction}>{RecordOrStopRecording}</button>
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

export default Playbutton;

