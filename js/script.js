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

// Resize the information window based on the video player height
function resizeInformationWindow() {
    const sectionVideoPlayer = document.getElementsByClassName('container-videoPlayer')[0];
    const boxContainer = document.querySelector('.box-container');
    let videoPlayerHeight = window.getComputedStyle(sectionVideoPlayer).getPropertyValue('height');
    videoPlayerHeight = videoPlayerHeight.substring(0, videoPlayerHeight.length - 2);
    boxContainer.style.height = videoPlayerHeight - 60 + "px";
}
window.addEventListener('load', () => {
    resizeInformationWindow();
});

window.addEventListener('resize', () => {
    resizeInformationWindow();
});



// Image Slider functions
const list = document.querySelector('.slider .list');
const items = document.querySelectorAll('.slider .list .item');
const dots = document.querySelectorAll('.slider .dots li');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let active = 0;
let lenghtItems = items.length - 1;

// Click for the next slide
next.addEventListener('click', () => {
    goRight();
});

// Click for the previous slide
prev.addEventListener('click', () => {
    goLeft();
});

// Next slide
function goRight() {
    if(active + 1 > lenghtItems) {
        active = 0;
    }else {
        active++;
    }
    reloadslider();
}

// Previous slide
function goLeft() {
    if(active - 1 < 0) {
        active = lenghtItems;
    }else {
        active--;
    }
    reloadslider();
}

let startX;
let startY;

// Detects the touch on the slider
items.forEach((item) => {
    item.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    item.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        const endY = e.changedTouches[0].clientY;
        const deltaY = endY - startY;

        if (deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
            goLeft();
        } else if (deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
            goRight();
        }
    });
});

let automaticSlide = setInterval(() => {next.click()}, 5000); // Makes the slider automatic

// Moves the slider to the active slide
function reloadslider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = `-${checkLeft}px`;

    const lastActiveDot = document.querySelector('.slider .dots li.active');
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(automaticSlide);
    automaticSlide = setInterval(() => {next.click()}, 5000);
}

// Click on the dots to move the slide
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        active = index;
        reloadslider();
    });
});