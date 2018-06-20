import { song } from '../audio'
import { audioContext } from '../audio'
import 'p5/lib/addons/p5.dom';
import "p5/lib/addons/p5.sound";
import p5 from "p5";

let mic,
    recorder,
    soundClip,
    recordingStartCurrentTime;


const initialState = {
    isPlaying: false,
    isStopped: true,
    isPaused: false,
    isRecording: false,
    recordedTracks: [],
    timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: 0 }
}



function cueSoundClips(state){
    state.recordedTracks.map((val)=>{
        if(val.time > song.currentTime()){
            let result = song.addCue(val.time, () => { // @ ps5 cue sounds to play
                    val.soundClip.play()
                });
            }
    })
}



export default function playToggle(state = initialState, action) {

    if (action.type === "STOP") {

        song.stop()
        console.log("test");

        //_____________________________________BEGIN stop all cued recordings
        state.recordedTracks.map((val, index) => {
            val.soundClip.stop()
        });
        //_____________________________________END stop all cued recordings

        if (state.isRecording) { //__________If recording before stop then capture the sound clip.

            mic.stop();
            recorder.stop();
            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: true,
                isPaused: false,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: state.recordStartTime, soundClip: soundClip, scheduledToPlay: false, isPreloaded: false }],
                timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined, pauseTime:0 }
            })

        } else {


            return Object.assign({}, state, {
                isPlaying: false,
                isStopped: true,
                isPaused: false,
                timeStamp: { startTime: undefined, stopTime: undefined, pauseTime: 0 }
            })
        }




    }

    //______________________________________BEGIN toggle play/stop response

    if (action.type === "PLAY") {

        if (state.isPlaying && state.isPaused) {
            song.play(0,1,0.1);

            let allSoundClips = state.recordedTracks.map((val) => {

                if(val.pauseResumePoint){
                    val.soundClip.play(0,1,1,val.pauseResumePoint)
                    val.pauseResumePoint = undefined;
                    return val
                }else{
                    return val
                }

            })



            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: false,
                timeStamp: { startTime: audioContext.currentTime, pauseTime:state.timeStamp.pauseTime },
                recordedTracks: [...allSoundClips]
            })


        } else if (state.isStopped) {
            song.play(0, 1, 0.1) //___________If stopped then playback from beginning of song
             song.clearCues();
            state.recordedTracks.map((val, index) => {

                if (val.scheduledToPlay) {
                    song.addCue(val.time, () => { // @ ps5 cue sounds to play
                        val.soundClip.play()
                    });
                }

            });


            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                timeStamp: { startTime: audioContext.currentTime, pauseTime:state.timeStamp.pauseTime },
            })


        } else if (state.isPlaying) {
            
            return Object.assign({}, state)
        }
    }




    //______________________________________BEGIN pause action response

    if (action.type === "PAUSE") {

        if(state.isPaused){
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: true,
                isRecording: false
            })
        }

        if (state.isRecording) {
            let pauseTime = song.currentTime();
            song.pause();
            
            mic.stop();
            recorder.stop();
            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: true,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: state.recordStartTime, soundClip: soundClip, scheduledToPlay: false, isPreloaded: false }],
                timeStamp: { startTime: state.timeStamp.startTime, pauseTime:pauseTime }
            })



        }

        if (state.isPlaying) {
   
            song.clearCues();
            let allSoundClips = state.recordedTracks.map((val)=>{
               if(val.soundClip.isPlaying()){
                  val.soundClip.pause();
                  let soundClipPauseValue = val.soundClip._pauseTime;
                  val.soundClip.stop();
                  val.pauseResumePoint = soundClipPauseValue;
                
               }else{
                cueSoundClips(state)

               }
            })

            song.pause();


            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isRecording: false,
                isPaused: true


            })

        }

    }


    //______________________________________END pause action response




    //______________________________________BEGIN record action response




    if (action.type === "RECORD") {

       if (state.isPaused && state.isPlaying) {


            // song.play()
            // // audioRecorder.record();
            // mic = new p5.AudioIn();
            // mic.start();
            // recorder = new p5.SoundRecorder();
            // recorder.setInput(mic);
            // soundClip = new p5.SoundFile();
            // recordingStartCurrentTime = audioContext.currentTime
            // recorder.record(soundClip);

            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isRecording: false,
                isPaused: true,
                recordStartTime: song.currentTime(),
                timeStamp: { startTime: audioContext.currentTime }
            })

        }

        if (state.isPlaying && !state.isRecording) {


            // audioRecorder.record();
            mic = new p5.AudioIn();
            mic.start();
            recorder = new p5.SoundRecorder();
            recorder.setInput(mic);
            soundClip = new p5.SoundFile();
            recorder.record(soundClip);

            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isRecording: true,
                isPaused: false,
                recordStartTime: song.currentTime(),
                timeStamp: { startTime: state.timeStamp.startTime, }
            })

        }


        if (state.isPlaying && state.isRecording) {



            mic.stop();
            recorder.stop();

            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isPaused: false,
                isRecording: false,
                recordedTracks: [...state.recordedTracks, { time: state.recordStartTime, soundClip: soundClip, scheduledToPlay: false, pauseResumePoint: undefined, isPreloaded: false }],
                timeStamp: { startTime: state.timeStamp.startTime, stopTime: undefined}
            })

        }

        if (state.isStopped) {


            song.play()
            // audioRecorder.record();
            mic = new p5.AudioIn();
            mic.start();
            recorder = new p5.SoundRecorder();
            recorder.setInput(mic);
            soundClip = new p5.SoundFile();
            recorder.record(soundClip);

            return Object.assign({}, state, {
                isPlaying: true,
                isStopped: false,
                isRecording: true,
                isPaused: false,
                recordStartTime: 0.0001, // won't start a zero! Small hack!
                timeStamp: { startTime: audioContext.currentTime }
            })

        }


 

    }

    //____________________________________________________________END record action response


    //____________________________________________________________BEGIN toggleTrackPlayback response


    if (action.type === "TOGGLE_TRACK_PLAYBACK") {

  

        let soundClipPlaybackState = state.recordedTracks.map((val, index) => {
            
            if (index === action.trackNumber) {

                val.scheduledToPlay = val.scheduledToPlay === true ? false : true
                  console.log(song.currentTime());
                  console.log("val.time is: " + val.time);
                  console.log("state.timeStamp.pauseTime is: " + state.timeStamp.pauseTime);

                if (val.scheduledToPlay && val.time > state.timeStamp.pauseTime) {
                    let result = song.addCue(val.time, () => { // @ ps5 cue sounds to play
                        val.soundClip.play()
                    });
                }

                if (!val.scheduledToPlay) {

                    val.soundClip.stop()
                }

                return val

            } else {

                return val
            }
        });



        return Object.assign({}, state, {
            recordedTracks: soundClipPlaybackState
        })

    }


    //____________________________________________________________END toggleTrackPlayback response

    return state
}


