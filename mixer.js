// Define the audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// load the audio files
audio1 = new Audio();
audio1.src = "bassguitar.mp3";
const audioElement = document.getElementById('audio1');


const track = audioCtx.createMediaElementSource(audioElement);

const playButton = document.querySelector('.track1Play');

// play pause audio
playButton.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	
	if (this.dataset.playing === 'false') {
		audioElement.play();
		this.dataset.playing = 'true';
	// if track is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);

// if track ends
audioElement.addEventListener('ended', () => {
	playButton.dataset.playing = 'false';
	playButton.setAttribute( "aria-checked", "false" );
}, false);

// volume
const gainNode = audioCtx.createGain();

const volumeControl = document.querySelector('[data-action="volume"]');
volumeControl.addEventListener('input', function() {
	gainNode.gain.value = this.value;
}, false);

// panning
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioCtx, pannerOptions);

const pannerControl = document.querySelector('[data-action="panner"]');
pannerControl.addEventListener('input', function() {
	panner.pan.value = this.value;	
}, false);

// connect our graph
track.connect(gainNode).connect(panner).connect(audioCtx.destination);

const powerButton = document.getElementById('onoff1');


powerButton.addEventListener('click', function() {
	if (this.dataset.power === 'on') {
		audioCtx.suspend();
		this.dataset.power = 'off';
	} else if (this.dataset.power === 'off') {
		audioCtx.resume();
		this.dataset.power = 'on';
	}
	this.setAttribute( "aria-checked", state ? "false" : "true" );
	console.log(audioCtx.state);
}, false);

// Track credit: Outfoxing the Fox by Kevin MacLeod under Creative Commons 







// OLD CODE TO PLAY

// const volume = document.getElementById("volume");

// const context = new AudioContext();
// const gainNode = new GainNode(context, { gain: volume.value});

// volume.addEventListener('input', e => {
//     const value = parseFloat(e.target.value)
//     gainNode.gain.setTargetAtTime(value, context.currentTime, .01)
//     console.log(value);
// })

//  audio1 = new Audio();
//  audio1.src = "bassguitar.mp3";
//  audio2 = new Audio();
//  audio2.src = "clav.mp3";
//  audio3 = new Audio();
//  audio3.src = "drums.mp3";
//  audio4 = new Audio();
//  audio4.src = "horns.mp3";
//  audio5 = new Audio();
//  audio5.src = "leadguitar.mp3";

// const source = context.createMediaElementSource(audio1);
// source.connect(gainNode)
// source.connect(context.destination)

// function playFile() {
//     audio1.play();
//     audio2.play();
//     audio3.play();
//     audio4.play();
//     audio5.play();
// }