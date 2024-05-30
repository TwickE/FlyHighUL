window.addEventListener('load', () => {
    const linkText = document.querySelector('.container-video-info-text p');
    const linkIcon = document.querySelector('.container-video-info-text svg');
    const linkTextHeight = window.getComputedStyle(linkText).lineHeight;
    console.log(linkTextHeight);
    linkIcon.style.height = linkTextHeight;
});

const video1 = document.getElementById('video1');
video1.style.backgroundImage = 'url(../resources/videos/video1poster.webp)';

const video2 = document.getElementById('video2');
video2.style.backgroundImage = 'url(../resources/videos/video2poster.webp)';

const video3 = document.getElementById('video3');
video3.style.backgroundImage = 'url(../resources/videos/video3poster.webp)';