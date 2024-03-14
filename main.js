document.addEventListener("DOMContentLoaded", function() {
    // Get the modal element
    var modal = document.getElementById("videoModal");

    // Get the video element
    var video = document.getElementById("videoPlayer");

    // Open the modal
    modal.style.display = "block";

    // Play the video
    video.play();

    video.onended = function() {
        setTimeout(function() {
            modal.style.opacity = "0.05"; 
            setTimeout(function() {
                modal.style.display = "none"; 
            }, 300); 
        }, 500); 
    };
});
