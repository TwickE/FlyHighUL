const playerVideos = new Plyr('video', {
    controls: [
        'play-large',
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'fullscreen'
    ],
});
window.player = playerVideos; // Expose player so it can be used from the console

window.addEventListener('load', () => {
    const linkText = document.querySelector('.container-video-info-text p');
    const linkIcon = document.querySelector('.container-video-info-text svg');
    const linkTextHeight = window.getComputedStyle(linkText).lineHeight;
    console.log(linkTextHeight);
    linkIcon.style.height = linkTextHeight;

    const playerDiv = document.querySelector('.plyr');
    playerDiv.style.borderRadius = '12px';
    playerDiv.style.boxShadow = 'none';
});

const modalVideoPlayer = document.getElementById('video-player-modal');

const video1 = document.getElementById('video1');
video1.style.backgroundImage = 'url(../resources/videos/video1poster.webp)';

video1.addEventListener('click', () => {
    if (modalVideoPlayer.style.display === 'none') {
        modalVideoPlayer.style.display = 'block';
        document.body.classList.add('modal-open');
    }
    else {
        modalVideoPlayer.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

const video2 = document.getElementById('video2');
video2.style.backgroundImage = 'url(../resources/videos/video2poster.webp)';

const video3 = document.getElementById('video3');
video3.style.backgroundImage = 'url(../resources/videos/video3poster.webp)';