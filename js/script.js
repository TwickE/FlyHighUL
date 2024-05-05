// Change the second argument to your options:
// https://github.com/sampotts/plyr/#options
const player = new Plyr('video', {
    controls: [
        'play-large',
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume'
    ],
});

// Expose player so it can be used from the console
window.player = player;

let currentTimeStamp = "00.00";
document.getElementById("myVideo").addEventListener('timeupdate', function() {
    let video = document.getElementById("myVideo");
    let hours = parseInt(video.currentTime / (60 * 60), 10);
    let minutes = parseInt(video.currentTime / 60, 10).toString().padStart(2, '0');
    let seconds = parseInt(video.currentTime % 60, 10).toString().padStart(2, '0');
    currentTimeStamp = minutes + "." + seconds;

    document.getElementById("timer").innerHTML = currentTimeStamp;

    let urlParams = new URLSearchParams(window.location.search);
    let videoSrc = urlParams.get('video');
    getCheckpoints(videoSrc);
});

window.addEventListener('load', () => {
    // Get the current URL
    let url = new URL(window.location.href);

    // Get the current search parameters
    let params = new URLSearchParams(url.search);

    // Set a new parameter
    params.set('video', 'video1.mp4');

    // Update the search parameters of the URL
    url.search = params.toString();

    // Update the URL of the current page without reloading
    history.pushState({}, '', url.toString());
});

function getCheckpoints(videoSrc) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            for (let i = 1; i <= Object.keys(data).length; i++) {
                let videoFile = data['video' + i].file.replace('videos/', '');
                if (videoFile === videoSrc) {
                    let isWithinCheckpoint = false; // flag to track if timestamp is within any checkpoint
                    for (let j = 0; j <= Object.keys(data['video' + i].checkpoints).length - 1; j++) {
                        if (currentTimeStamp >= data['video' + i].checkpoints[j].start && currentTimeStamp <= data['video' + i].checkpoints[j].end) {
                            isWithinCheckpoint = true;
                            break; // exit the loop as soon as we find a matching checkpoint
                        }
                    }
                    // set the display based on whether timestamp is within any checkpoint
                    document.getElementById("square").style.display = isWithinCheckpoint ? "block" : "none";
                }
            }   
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


//Functions for CSS
function resizeInformationWindow() {
    const videoPlayer = document.getElementById('myVideo');
    const boxContainer = document.querySelector('.box-container');
    let videoPlayerHeight = window.getComputedStyle(videoPlayer).getPropertyValue('height');
    videoPlayerHeight = videoPlayerHeight.substring(0, videoPlayerHeight.length - 2);
    console.log(videoPlayerHeight);
    boxContainer.style.maxHeight = videoPlayerHeight - 60 + "px";
}
window.addEventListener('load', () => {
    resizeInformationWindow();
});

window.addEventListener('resize', () => {
    resizeInformationWindow();
});