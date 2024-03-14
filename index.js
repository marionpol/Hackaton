document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("videoModal");
    var video = document.getElementById("videoPlayer");
    var closeButton = document.querySelector(".close");

    modal.style.display = "block";
    video.play();

    video.onended = function() {
        setTimeout(function() {
            modal.style.opacity = "0.05"; 
            setTimeout(function() {
                modal.style.display = "none"; 
            }, 300); 
        }, 500); 
    };

    closeButton.addEventListener("click", function() {
        modal.style.opacity = "0.05"; 
        setTimeout(function() {
            modal.style.display = "none"; 
        }, 300);
    });
});
