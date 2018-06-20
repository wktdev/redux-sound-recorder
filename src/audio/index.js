import 'p5/lib/addons/p5.dom';
import "p5/lib/addons/p5.sound";
import p5 from "p5";
export let song;
export let audioContext;

//___________________________________BEGIN load sound via p5.js
var p5temp = function(sketch) {


    sketch.preload = function() { // @preload is required by P5.js
        audioContext = sketch.getAudioContext();
        sketch.soundFormats('mp3', 'wav');
        song = sketch.loadSound('./song.wav');
        console.log(song);
        console.log(audioContext.currentTime);
    }
};

var p5_sndLib = new p5(p5temp);
//___________________________________END load sound via p5.js





// export let audioContext = new AudioContext();

// function audioFileLoader(fileDirectory) {
//     var soundObj = {};
//     var playSound = undefined;
//     var getSound = new XMLHttpRequest();
//     soundObj.fileDirectory = fileDirectory;
//     getSound.open("GET", soundObj.fileDirectory, true);
//     getSound.responseType = "arraybuffer";
//     getSound.onload = function() {
//         audioContext.decodeAudioData(getSound.response, function(buffer) {
//             soundObj.soundToPlay = buffer;
          
//         });
//     };

//     getSound.send();

//     soundObj.play = function(time, setStart, setDuration) {
//         playSound = audioContext.createBufferSource();
//         playSound.buffer = soundObj.soundToPlay;
//         playSound.connect(audioContext.destination);
//         playSound.start(audioContext.currentTime + time || audioContext.currentTime, setStart || 0, setDuration || soundObj.soundToPlay.duration);
//     };

//     soundObj.stop = function(time) {
//         playSound.stop(audioContext.currentTime + time || audioContext.currentTime);
//     };

//     soundObj.duration = function(){
//         return soundObj.soundToPlay.duration
//     }
//     return soundObj;
// }




// export let song = audioFileLoader('./song.wav');










