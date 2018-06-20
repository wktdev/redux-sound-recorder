export const playAction = function(){
	return {type: "PLAY"}
};

export const pauseAction = function(){
	return {type: "PAUSE"}
};

export const stopAction = function(){
	return {type: "STOP"}
};

export const recordAction = function(){
	return {type: "RECORD"}
}


export const toggleTrackPlaybackAction = function(indexValue){
	return {type: "TOGGLE_TRACK_PLAYBACK", trackNumber: indexValue}
}


