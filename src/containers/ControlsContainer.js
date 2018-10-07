import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  playAction, pauseAction,
  stopAction, recordAction,
  toggleTrackPlaybackAction
} from '../actions/playPauseStopRecord';

import Playbutton from '../components/Controls';

const mapStateToProps = state =>({
    isPlaying:state.playStopPauseRecord.isPlaying,
    timeStamp:state.playStopPauseRecord.timeStamp,
    isRecording:state.playStopPauseRecord.isRecording,
    recordedTracks:state.playStopPauseRecord.recordedTracks

});



const mapDispatchToProps = (dispatch) => bindActionCreators({
  playAction,
  pauseAction,
  stopAction,
  recordAction,
  toggleTrackPlaybackAction
},dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Playbutton);

