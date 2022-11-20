let audioContext = new AudioContext();
const startCtxButton = document.querySelector(".startButton");
const setupSamplesButton = document.querySelector(".setupSamples");
const playSampleButton = document.querySelector(".playSample");
const stopSampleButton = document.querySelector(".stopSample");
let samples;
let trackCounter = 0;


// const samplePaths = ["https://audio.jukehost.co.uk/8C3FUJxrSlDL0mpNEAd6FycLkH8wc0vo", "https://audio.jukehost.co.uk/NWveECn23UyNMC0Rzet4BdOeE5GXAcCv", "https://audio.jukehost.co.uk/t0jIRwI2zx31GPCOdt4M3jjfI88JDr5C", "https://audio.jukehost.co.uk/KUtQ1clmpZwyO2Iuqx7LBgP3C3vDmaus", "https://audio.jukehost.co.uk/RpnOOcn2zvnSk9fxGJoNISaI2WNS3vy9"];

const samplePaths = ["https://audio.jukehost.co.uk/QvAOFlnXsqXqpNl1VT3GEhBVSrc6R6Go",
 "https://audio.jukehost.co.uk/rTFD3l0OvNpLR0hD3JHN7pDebzclHyXh",
  "https://audio.jukehost.co.uk/1ky7S4mTHgiQD29lht7LWOe9wjjDdYkX",
   "https://audio.jukehost.co.uk/ebrqzRFIriqvYEBhaEU5Gs7uasMLvyjP",
    "https://audio.jukehost.co.uk/wSEW6xDd3D9GC4TU5fqiPJAja1S0Ad0g",
     "https://audio.jukehost.co.uk/BTjOKv0v6LskbWKwKD9pE3LBvEAc3WLl",
     "https://audio.jukehost.co.uk/LSNSaZcHqSN5APaY7xzWyHFpKFgLvkbQ",
      "https://audio.jukehost.co.uk/L7BXqcGhGS59Qni72Ov0gIPYoVeb95Et",
       "https://audio.jukehost.co.uk/dPvPSpjt0sPVgxYl7QNufeQcmzaT8Hoj",
        "https://audio.jukehost.co.uk/Sd4azJpg9JJ6GAGWrPMtlAIwZDwNesCg",
         "https://audio.jukehost.co.uk/RuI5zzqWF5oXhIJMXNUklU5wPEoVpC5R",
          "https://audio.jukehost.co.uk/demLO1UqIEtf3OjF6b0ssjeB19RSBs43",
           "https://audio.jukehost.co.uk/DJmYGwtAwFmeGgcFnV6TrrpEmTeDj9YS",
            "https://audio.jukehost.co.uk/4DjmqrQLjAe12Oi5SwXY76x4yKgOZCOt",
             "https://audio.jukehost.co.uk/joFAbUlIcnDmpMBEWk0hz2jhDkOSQUNV",
              "https://audio.jukehost.co.uk/wyQxt010mqnqMfqgTQfH7jFp8B3ks48l",
               "https://audio.jukehost.co.uk/0qkB0twINwgqLW7ocoq6XXF9nn7iX1P8"  ]


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
let gainNode1;
let volumeControl1;

let gainNodes = [];
let volumeControls = [];


startCtxButton.addEventListener("click", () => {



    console.log("audio context started");


    setupSamples(samplePaths).then((response) => {
        samples = response;
        playSampleButton.addEventListener("click", () => {
            // const playing = playSample(samples[0],0);


            let playButtonState = playSampleButton.getAttribute('aria-checked') === "true" ? true : false;
            playSampleButton.setAttribute( 'aria-checked', playButtonState ? "false" : "true" );


            // const tracks = []
            // // REFACTOR WITH LOOP??
            // for (const i of samples) {
            //     tracks[i] = playSample(samples[i],0 );
            // }

            const track1 = playSample(samples[0], 0);
            const track2 = playSample(samples[1], 0);
            const track3 = playSample(samples[2], 0);
            const track4 = playSample(samples[3], 0);
            const track5 = playSample(samples[4], 0);
            const track6 = playSample(samples[5], 0);
            const track7 = playSample(samples[6], 0);
            const track8 = playSample(samples[7], 0);
            const track9 = playSample(samples[8], 0);
            const track10 = playSample(samples[9], 0);
            const track11 = playSample(samples[10], 0);
            const track12 = playSample(samples[11], 0);
            const track13 = playSample(samples[12], 0);
            const track14 = playSample(samples[13], 0);
            const track15 = playSample(samples[14], 0);
            const track16 = playSample(samples[15], 0);
            const track17 = playSample(samples[16], 0);


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
        });

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
    console.log("setting up samples");
    const audioBuffers = [];
    for (const path of paths) {
        const sample = await getFile(path);
        audioBuffers.push(sample);
        trackCounter++;
        console.log("track: " + trackCounter + "/" + samplePaths.length);
        move();
    }
    console.log("set up complete")
    return audioBuffers;
}

function playSample(audioBuffer, time) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    sampleSource.start(time);
    return sampleSource;
}



function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = (trackCounter/samplePaths.length) * 100 + "%";
        elem.innerHTML = (trackCounter/samplePaths.length) * 100  + "%";
      }
    }
    addTrack();
  }

function addTrack() {
    let volumeId = 0;
    let div = document.createElement("div");
    div.id = 'track' + trackCounter;
    div.className = 'track';
    div.innerHTML = `<input type="range" id=${'volume' + trackCounter} min="0" max="2" value="1" step="0.01"/>
       <label for=${'volume' + trackCounter}>VOL</label>
    
       <input type="range" id=${'panner' + trackCounter} min="-1" max="1" value="0" step="0.01"/>
       <label for=${'panner' + trackCounter}>PAN</label>
      
       <button id=${'onOff' + trackCounter} class="onOffButton" aria-checked="false" data-power="on">
           <label for=${'onOff' + trackCounter}>ON/OFF</label>
       </button>;`

    var element = document.getElementById("trackList");
    element.appendChild(div);

    gainNodes[trackCounter] = audioContext.createGain();
    volumeControls[trackCounter] = document.getElementById('volume' + trackCounter);
    volumeControls[trackCounter].addEventListener('input', function(e) {
        gainNodes[trackCounter].gain.value = this.value;
        console.log(e.target.id + ": " + this.value);
    }, false);
// 
    // // volume
    // gainNode1 = audioContext.createGain();
    // volumeControl1 = document.getElementById('volume1');
    // volumeControl1.addEventListener('input', function() {
    //     gainNode1.gain.value = this.value;
    // }, false);

}


// // volume
// const gainNode1 = audioContext.createGain();
// const volumeControl1 = document.getElementById('volume1');
// volumeControl1.addEventListener('input', function() {
// 	gainNode1.gain.value = this.value;
// }, false);


//   `<div class="entry">${value} <img class="" src= "${image}"></div>`

// <div id="track1" class="track"> DRUMS
//   <input type="range" id="volume1" min="0" max="2" value="1" step="0.01"/>
//   <label for="volume1">VOL</label>

//   <input type="range" id="panner1" min="-1" max="1" value="0" step="0.01"/>
//   <label for="panner1">PAN</label>
  
//   <button id="onoff1" class="onOffButton" aria-checked="false" data-power="on">
//       <label for="onoff1">ON/OFF</label>
//   </button>
// </div>