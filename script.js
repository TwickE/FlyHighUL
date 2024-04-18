var currentTimeStamp = 0;
document.getElementById("myVideo").addEventListener('timeupdate', function() {
    var video = document.getElementById("myVideo");
    var hours = parseInt(video.currentTime / (60 * 60), 10);
    var minutes = parseInt(video.currentTime / 60, 10).toString().padStart(2, '0');
    var seconds = parseInt(video.currentTime % 60, 10).toString().padStart(2, '0');
    currentTimeStamp = minutes + "." + seconds;
    document.getElementById("timer").innerHTML = currentTimeStamp;

    if(currentTimeStamp >= "00.23" && currentTimeStamp <= "00.34"){
        document.getElementById("square").style.display = "block";
    }

    if(currentTimeStamp >= "00.34" || currentTimeStamp <= "00.23"){
        document.getElementById("square").style.display = "none";
    }
});
