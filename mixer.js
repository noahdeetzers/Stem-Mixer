const audioCtx = window.AudioContext ? new AudioContext() : new webkitAudioContext();

async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  // ! A callback has been added here as a second param for Safari only !
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer, function() {return});
  return audioBuffer;
}

let playbackRate = 1;
let accompanimentVolume = 100;

// let noteString = "https://www.nwhsaob.com/Midi/samplestwo/kick.mp3";
let noteString = "https://github.com/noahdeetzers/Stem-Mixer/blob/main/Whole_Lotta_Love_Stems/slide%20guitar%20-%20solo.wav";


let time = 0;
// function playSample(audioContext, audioBuffer, time) {

// }

async function setupSample() {
  let filePath = noteString;
  // Here we're `await`ing the async/promise that is `getFile`.
  // To be able to use this keyword we need to be within an `async` function
  const sample = await getFile(audioCtx, filePath);


// CODE FROM PLAYSAMPLE
  const gainNode = audioCtx.createGain();
  console.error(accompanimentVolume/100);
  gainNode.gain.value = accompanimentVolume/100;
  gainNode.connect(audioCtx.destination);
  const sampleSource = audioCtx.createBufferSource();
  
  sampleSource.buffer = audioBuffer;
  // sampleSource.buffer.volume
  sampleSource.playbackRate.value = playbackRate;
  sampleSource.connect(gainNode);
  // sampleSource.connect(audioContext.destination)
  sampleSource.start(time);
  return sampleSource;
}