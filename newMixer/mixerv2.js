let audioContext = new AudioContext();
const startCtxButton = document.querySelector(".startButton");
const setupSamplesButton = document.querySelector(".setupSamples");
const playSampleButton = document.querySelector(".playSample");
const stopSampleButton = document.querySelector(".stopSample");
let samples;

// const samplePaths = ["https://audio.jukehost.co.uk/8C3FUJxrSlDL0mpNEAd6FycLkH8wc0vo", "https://audio.jukehost.co.uk/NWveECn23UyNMC0Rzet4BdOeE5GXAcCv", "https://audio.jukehost.co.uk/t0jIRwI2zx31GPCOdt4M3jjfI88JDr5C", "https://audio.jukehost.co.uk/KUtQ1clmpZwyO2Iuqx7LBgP3C3vDmaus", "https://audio.jukehost.co.uk/RpnOOcn2zvnSk9fxGJoNISaI2WNS3vy9"];

const audioHost = "https://audio.jukehost.co.uk/";

const samplePaths = ["QvAOFlnXsqXqpNl1VT3GEhBVSrc6R6Go",
 "rTFD3l0OvNpLR0hD3JHN7pDebzclHyXh",
  "1ky7S4mTHgiQD29lht7LWOe9wjjDdYkX",
   "ebrqzRFIriqvYEBhaEU5Gs7uasMLvyjP",
    "wSEW6xDd3D9GC4TU5fqiPJAja1S0Ad0g",
     "BTjOKv0v6LskbWKwKD9pE3LBvEAc3WLl",
     "LSNSaZcHqSN5APaY7xzWyHFpKFgLvkbQ",
      "L7BXqcGhGS59Qni72Ov0gIPYoVeb95Et",
       "dPvPSpjt0sPVgxYl7QNufeQcmzaT8Hoj",
        "Sd4azJpg9JJ6GAGWrPMtlAIwZDwNesCg",
         "RuI5zzqWF5oXhIJMXNUklU5wPEoVpC5R",
          "demLO1UqIEtf3OjF6b0ssjeB19RSBs43",
           "DJmYGwtAwFmeGgcFnV6TrrpEmTeDj9YS",
            "4DjmqrQLjAe12Oi5SwXY76x4yKgOZCOt",
             "joFAbUlIcnDmpMBEWk0hz2jhDkOSQUNV",
              "wyQxt010mqnqMfqgTQfH7jFp8B3ks48l",
               "0qkB0twINwgqLW7ocoq6XXF9nn7iX1P8"  ];

const trackNames = ["2nd lead","2nd lead synth solo","bass harmonies","bass","background vox","lead vocal double","drum kit","guitar","horns","lead vox","organ solo","rhodes","shaker","strings","synth pads","synth 1","synth 2"];

// TODO - seperate url and hash code of audio file

// TRACKS
// 1. 2nd lead
// 2. 2nd lead synth solo
// 3. bass harmonies
// 4. bass
// 5. background vox
// 6. lead vocal double
// 7. drum kit
// 8. guitar
// 9. horns
// 10. lead vox
// 11. organ solo
// 12. rhodes
// 13. shaker
// 14. strings
// 15. synth pads
// 16. synth 1
// 17. synth 2


// volume
// let gainNode1;
// let volumeControl1;
// let gainNode2;
// let volumeControl2;

let gainNodes = [];
let volumeControls = [];
let panNodes = [];
let panControls = [];

let lowBandNodes = [];
let lowBandControls = [];
let midBandNodes = [];
let midBandControls = [];
let highBandNodes = [];
let highBandControls = [];

let onOffNodes = [];
let onOffControls = [];
let onOffStates = [];


let masterGainNode;
let masterGainControl;

const analyserNode = new AnalyserNode(audioContext, { fftSize: 128 });
drawVisualizer();

startCtxButton.addEventListener("click", () => {
    console.log("audio context started");


    setupSamples(samplePaths).then((response) => {
        samples = response;
        playSampleButton.addEventListener("click", () => {
            // const playing = playSample(samples[0],0);


            let playButtonState = playSampleButton.getAttribute('aria-checked') === "true" ? true : false;
            playSampleButton.setAttribute( 'aria-checked', playButtonState ? "false" : "true" );



                const track1 = playTracks(samples[0], 0);
                const track2 = playTracks(samples[1], 1);
                const track3 = playTracks(samples[2], 2);
                const track4 = playTracks(samples[3], 3);
                const track5 = playTracks(samples[4], 4);
                const track6 = playTracks(samples[5], 5);
                const track7 = playTracks(samples[6], 6);
                const track8 = playTracks(samples[7], 7);
                const track9 = playTracks(samples[8], 8);
                const track10 = playTracks(samples[9], 9);
                const track11 = playTracks(samples[10], 10);
                const track12 = playTracks(samples[11], 11);
                const track13 = playTracks(samples[12], 12);
                const track14 = playTracks(samples[13], 13);
                const track15 = playTracks(samples[14], 14);
                const track16 = playTracks(samples[15], 15);
                const track17 = playTracks(samples[16], 16);


                stopSampleButton.addEventListener("click", () => {
                    track1.stop();
                    track2.stop();
                    track3.stop();
                    track4.stop();
                    track5.stop();
                    track6.stop();
                    track7.stop();
                    track8.stop();
                    track9.stop();
                    track10.stop();
                    track11.stop();
                    track12.stop();
                    track13.stop();
                    track14.stop();
                    track15.stop();
                    track16.stop();
                    track17.stop();
                })    
        }   );

    });
});

// setupSamplesButton.addEventListener("click", () => {

// });

async function getFile(filePath) {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}


async function setupSamples(paths) {
    let trackCounter = 0;
    console.log("setting up samples");
    const audioBuffers = [];
    for (const path of paths) {
        const sample = await getFile(audioHost + path);
        audioBuffers.push(sample);
        console.log("track: " + trackCounter + "/" + samplePaths.length);
        
        let percentage = (trackCounter/samplePaths.length) * 100;
       
        addTrack(trackCounter++);
        moveProgressBar(percentage);

    }
    console.log("set up complete")
    return audioBuffers;
}

function playTracks(audioBuffer, idx) {

    let sampleSource;
    sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;

    sampleSource.connect(gainNodes[idx]);
    gainNodes[idx].connect(panNodes[idx]);
    // panNodes[idx].connect(audioContext.destination);
    panNodes[idx].connect(lowBandNodes[idx]);
    lowBandNodes[idx].connect(midBandNodes[idx]);
    midBandNodes[idx].connect(highBandNodes[idx]);
    highBandNodes[idx].connect(onOffNodes[idx]);
    onOffNodes[idx].connect(masterGainNode);
    masterGainNode.connect(analyserNode);
    masterGainNode.connect(audioContext.destination);
    // gainNodes[idx].connect(audioContext.destination);
    sampleSource.start(0);
    
}



function moveProgressBar(percentage) {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = percentage + "%";
        elem.innerHTML = percentage  + "%";
      }
    }
  }

function addTrack(_trackCounter) {
    let div = document.createElement("div");
    div.id = 'track' + _trackCounter;
    div.className = 'track';
    div.innerHTML = `<span>${trackNames[_trackCounter]}</span><input class="slider" type="range" id=${'volume' + _trackCounter} min="0" max="2" value="1" step="0.01"/>
       <label for=${'volume' + _trackCounter}>VOL</label>
    
       <input class= "slider" type="range" id=${'panner' + _trackCounter} min="-1" max="1" value="0" step="0.01"/>
       <label for=${'panner' + _trackCounter}>PAN</label>

       <input class= "slider" type="range" id=${'lowBand' + _trackCounter} min="-10" max="10" value="0" step="0.01"/>
       <label for=${'lowBand' + _trackCounter}>Low</label>

       <input class= "slider" type="range" id=${'midBand' + _trackCounter} min="-10" max="10" value="0" step="0.01"/>
       <label for=${'midBand' + _trackCounter}>Mid</label>

       <input class= "slider" type="range" id=${'highBand' + _trackCounter} min="-10" max="10" value="0" step="0.01"/>
       <label for=${'highBand' + _trackCounter}>high</label>
       
       <button id=${'onOff' + _trackCounter} class="onOffButton" aria-checked="true" data-power="on">
       <label for=${'onOff' + _trackCounter}>ON/OFF</label>
       </button>`
   

    var element = document.getElementById("trackList");
    element.appendChild(div);



    // CREATE AND MAP THE GAIN NODES TO THE TRACKS
    gainNodes[_trackCounter] = audioContext.createGain();
    volumeControls[_trackCounter] = document.getElementById('volume' + _trackCounter);
    volumeControls[_trackCounter].addEventListener('input', function(e) {
        gainNodes[_trackCounter].gain.value = this.value;
        console.log(e.target.id + ": " + this.value);
    }, false);

    console.log(typeof(gainNodes[_trackCounter]));
    console.log("Gain Node: " + _trackCounter + " is connected to slider# " + _trackCounter);


    // CREATE AND MAP PANNING VALUES TO TRACKS
    panNodes[_trackCounter] = audioContext.createStereoPanner();
    panControls[_trackCounter] = document.getElementById('panner' + _trackCounter);
    panControls[_trackCounter].addEventListener('input', function(e) {
        panNodes[_trackCounter].pan.value = this.value;
        // console.log(e.target.id + ": " + this.value);
        console.log(e.target.id + ": " + panNodes[_trackCounter].pan.value);
    }, false);
    

    // CREATE AND MAP LOWBAND VALUES TO TRACKS
    lowBandNodes[_trackCounter] = audioContext.createBiquadFilter();
    lowBandControls[_trackCounter] = document.getElementById('lowBand' + _trackCounter);
    lowBandNodes[_trackCounter].type = "lowshelf";
    lowBandNodes[_trackCounter].frequency.value = 440;
    lowBandControls[_trackCounter].addEventListener('input', function(e) {
        lowBandNodes[_trackCounter].gain.value = this.value;
        // console.log(e.target.id + ": " + this.value);
        console.log(e.target.id + ": " + lowBandNodes[_trackCounter].gain.value);
    }, false);


    // CREATE AND MAP MIDBAND VALUES TO TRACKS
    midBandNodes[_trackCounter] = audioContext.createBiquadFilter();
    midBandControls[_trackCounter] = document.getElementById('midBand' + _trackCounter);
    midBandNodes[_trackCounter].type = "peaking";
    midBandNodes[_trackCounter].frequency.value = 1000;
    midBandNodes[_trackCounter].Q.value = 0.8;
    midBandControls[_trackCounter].addEventListener('input', function(e) {
        midBandNodes[_trackCounter].gain.value = this.value;
        // console.log(e.target.id + ": " + this.value);
        console.log(e.target.id + ": " + midBandNodes[_trackCounter].gain.value);
    }, false);
    
    // CREATE AND MAP HIGHBAND VALUES TO TRACKS
    highBandNodes[_trackCounter] = audioContext.createBiquadFilter();
    highBandControls[_trackCounter] = document.getElementById('highBand' + _trackCounter);
    highBandNodes[_trackCounter].type = "highshelf";
    highBandNodes[_trackCounter].frequency.value = 6000;
    highBandControls[_trackCounter].addEventListener('input', function(e) {
        highBandNodes[_trackCounter].gain.value = this.value;
        // console.log(e.target.id + ": " + this.value);
        console.log(e.target.id + ": " + highBandNodes[_trackCounter].gain.value);
    }, false);


    // CREATE AND MAP ONOFF VALUES TO TRACKS
    onOffNodes[_trackCounter] = audioContext.createGain();
    onOffControls[_trackCounter] = document.getElementById('onOff' + _trackCounter);
    onOffControls[_trackCounter].addEventListener('click', function(e) {

        onOffStates[_trackCounter] = onOffControls[_trackCounter].getAttribute('aria-checked') === "true" ? true : false;
        onOffControls[_trackCounter].setAttribute( 'aria-checked', onOffStates[_trackCounter] ? "false" : "true" );

        if (onOffStates[_trackCounter]) {
            onOffNodes[_trackCounter].gain.value = 0;
            onOffControls[_trackCounter].textContent = 'OFF';
        } else {
            onOffNodes[_trackCounter].gain.value = 1;
            onOffControls[_trackCounter].textContent = 'ON';
        }


    }, false);
}

function createMasterGain() {
        // CREATE AND MAP THE GAIN NODES TO THE TRACKS
        masterGainNode = audioContext.createGain();
        masterGainControl = document.getElementById('masterGain');
        masterGainControl.addEventListener('input', function(e) {
            masterGainNode.gain.value = this.value;
            console.log(e.target.id + ": " + this.value);
        }, false);
}

function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserNode.getByteFrequencyData(dataArray);
    const width = visualizer.width;
    const height = visualizer.height;
    const barWidth = width / bufferLength;

    const canvasContext = visualizer.getContext('2d');
    canvasContext.clearRect(0, 0, width, height);

    dataArray.forEach((item, index) => {
        const y = item / 255 * height / 2;
        const x = barWidth * index;

        canvasContext.fillStyle = `rgb(${y / height * 800},0 ,0)`;
        canvasContext.fillRect(x, height - y, barWidth, y);

    })

}