window.addEventListener('load', () => {
    const videoPreview2 = document.querySelector('.video-preview');
    const containerVideoInfoText = document.querySelector('.container-video-info-text');

    const videoPreview2Height = videoPreview2.offsetHeight;

    containerVideoInfoText.style.height = `${videoPreview2Height}px`;
});

const video1 = document.getElementById('video1');

video1.style.backgroundImage = 'url(../resources/videos/video1poster.webp)';