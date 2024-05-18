window.addEventListener('load', () => {
    resizeInformationWindow();
    
});

window.addEventListener('resize', () => {
    resizeInformationWindow();
});

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
window.player = player; // Expose player so it can be used from the console

let dataMap = new Map();
// Fetch the data once and store it in a map
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 1; i <= Object.keys(data).length; i++) {
            dataMap.set(data['video' + i].file, data['video' + i]);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Saves the current video source in the local storage
let videoSrc = document.getElementById('myVideo').src;
videoSrc = videoSrc.substring(videoSrc.indexOf('resources'));
localStorage.setItem("currentVideoSrc", videoSrc);

// Updates the currentTimeStamp variable based on the video playing
let currentTimeStamp = "00.00000";
let videoContent = document.getElementById("myVideo");
let intervalId;

// Updates the currentTimeStamp variable every 100ms while the video is playing
videoContent.addEventListener('play', function() {
    intervalId = setInterval(function() {
        let rawMinutes = videoContent.currentTime / 60;
        let minutes = Math.floor(rawMinutes).toString().padStart(2, '0');
        let rawSeconds = (rawMinutes * 60) % 60;
        let seconds = Math.floor(rawSeconds).toString().padStart(2, '0');
        let milliseconds = Math.floor((rawSeconds % 1) * 1000).toString().padStart(3, '0');
        currentTimeStamp = `${minutes}.${seconds}${milliseconds}`;

        document.getElementById("timer").innerHTML = currentTimeStamp;

        showCheckpoints(localStorage.getItem("currentVideoSrc"));
    }, 100);
});

// Stops the interval when the video is paused
videoContent.addEventListener('pause', function() {
    clearInterval(intervalId);
});

// Fetches the checkpoints from the dataMap and displays them on the video
function showCheckpoints(videoSrc) {
    let videoData = dataMap.get(videoSrc);
    if (videoData) {
        let isWithinCheckpoint = false;
        for (let checkpoint of videoData.checkpoints) {
            if (currentTimeStamp >= checkpoint.start && currentTimeStamp <= checkpoint.end) {
                isWithinCheckpoint = true;
                positionCheckpoint(checkpoint.positionX, checkpoint.positionY);
                break;
            }
        }
        document.getElementById("checkpoint").style.display = isWithinCheckpoint ? "flex" : "none";
    }
}

// Positions the checkpoint on top of the video
function positionCheckpoint(horizontalOffsetRatio, verticalOffsetRatio) {
    const video = document.getElementById('myVideo');
    const checkpoint = document.getElementById('checkpoint');

    const videoRect = video.getBoundingClientRect();
    const videoX = videoRect.left;
    const videoY = videoRect.top;

    let checkpointLeft = videoX + window.scrollX + (videoRect.width * horizontalOffsetRatio) - 15;
    let checkpointTop = videoY + window.scrollY + (videoRect.height * verticalOffsetRatio) - 15;

    checkpoint.style.left = checkpointLeft + 'px';
    checkpoint.style.top = checkpointTop + 'px';
}

// Variables for the checkpoint information
const checkpoint = document.getElementById('checkpoint');
const informationTitle = document.getElementById('information-title');
const informationText = document.getElementById('information-text');
const images = document.querySelectorAll('.image');
const videoPreview = document.getElementById('video-preview');
const mapImage = document.getElementById('map-image');
const mapLink = document.getElementById('map-link');
const elementInformation = document.getElementsByClassName('scrollable-text-container')[0];
const elementImageSlider = document.getElementsByClassName('slider')[0];
const elementVideoBox = document.getElementsByClassName('video-box')[0];
const elementLocation = document.getElementsByClassName('box-container-location')[0];
const noDataIcons = document.querySelectorAll('.no-data');

// Click on the checkpoint to display the information
checkpoint.addEventListener('click', () => {
    if (noDataIcons[0].style.display !== 'none')
    {
        noDataIcons.forEach(icon => {
            icon.style.display = 'none';
        });

        getCheckpointData(localStorage.getItem("currentVideoSrc"));

        elementInformation.style.display = 'flex';
        elementImageSlider.style.display = 'flex';
        elementLocation.style.display = 'flex';
        setTimeout(function() {
            elementInformation.classList.add('activated');
            elementImageSlider.classList.add('activated');
            elementLocation.classList.add('activated');
        }, 50);
    }
    else
    {
        getCheckpointData(localStorage.getItem("currentVideoSrc"));
    }
});

// Fetches the checkpoint data from the dataMap and displays it
function getCheckpointData(videoSrc) {
    let videoData = dataMap.get(videoSrc);
    if (videoData) {
        for (let checkpoint of videoData.checkpoints) {
            if (currentTimeStamp >= checkpoint.start && currentTimeStamp <= checkpoint.end) {
                // Remove the 'activated' class to restart the transition
                elementInformation.classList.remove('activated');
                elementImageSlider.classList.remove('activated');
                elementLocation.classList.remove('activated');
                elementVideoBox.classList.remove('activated');

                // Add a small delay before adding the 'activated' class again
                setTimeout(function() {
                    elementInformation.classList.add('activated');
                    elementImageSlider.classList.add('activated');
                    elementLocation.classList.add('activated');
                    elementVideoBox.classList.add('activated');
                }, 500);

                informationTitle.innerHTML = checkpoint.title;
                informationText.innerHTML = checkpoint.text;

                if(checkpoint.video[0] === "noVideo") {
                    elementVideoBox.classList.remove('activated');
                    setTimeout(function() {
                        elementVideoBox.style.display = 'none';
                        noDataIcons[2].style.display = 'block';
                    }, 500);
                } else {
                    noDataIcons[2].style.display = 'none';
                    elementVideoBox.style.display = 'flex';
                    setTimeout(function() {
                        elementVideoBox.classList.add('activated');
                    }, 500);
                    videoPreview.style.backgroundImage = `url(${checkpoint.video[0]})`;
                }
                mapImage.src = checkpoint.mapLocation[0];
                mapImage.alt = checkpoint.mapLocation[2];
                mapLink.href = checkpoint.mapLocation[1];
                images.forEach((image, index) => {
                    image.src = checkpoint.images[index][0];
                    image.alt = checkpoint.images[index][1];
                });
                break;
            }
        }
    }
}

//CSS functions

// Resize the information window based on the video player height
function resizeInformationWindow() {
    const sectionVideoPlayer = document.getElementsByClassName('container-videoPlayer')[0];
    const boxContainer = document.querySelector('.box-container');
    let videoPlayerHeight = window.getComputedStyle(sectionVideoPlayer).getPropertyValue('height');
    videoPlayerHeight = videoPlayerHeight.substring(0, videoPlayerHeight.length - 2);
    boxContainer.style.height = videoPlayerHeight - 60 + "px";
}

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