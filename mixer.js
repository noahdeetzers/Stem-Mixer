// Define the audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


const audioElement1 = document.getElementById('audio1');
const track1 = audioCtx.createMediaElementSource(audioElement1);

const playButton1 = document.getElementById('play1');

// play pause audio
playButton1.addEventListener('click', function() {
	
	// check if context is in suspended state (autoplay policy)
	if (audioCtx.state === 'suspended') {
		audioCtx.resume();
	}
	
	if (this.dataset.playing === 'false') {
		audioElement1.play();
		this.dataset.playing = 'true';
	// if track1 is playing pause it
	} else if (this.dataset.playing === 'true') {
		audioElement1.pause();
		this.dataset.playing = 'false';
	}
	
	let state = this.getAttribute('aria-checked') === "true" ? true : false;
	this.setAttribute( 'aria-checked', state ? "false" : "true" );
	
}, false);

// if track1 ends
audioElement1.addEventListener('ended', () => {
	playButton1.dataset.playing = 'false';
	playButton1.setAttribute( "aria-checked", "false" );
}, false);

// volume
const gainNode1 = audioCtx.createGain();

const volumeControl1 = document.getElementById('volume1');
volumeControl1.addEventListener('input', function() {
	gainNode1.gain.value = this.value;
}, false);

// panning
const pannerOption1 = {pan: 0};
const panner = new StereoPannerNode(audioCtx, pannerOption1);


const pannerControl = document.getElementById('panner1');
pannerControl.addEventListener('input', function() {
	panner.pan.value = this.value;	
}, false);

// connect our graph
track1.connect(gainNode1).connect(panner).connect(audioCtx.destination);

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