let images = document.querySelectorAll(".cards img");

images.forEach(function(image) {

    image.addEventListener("mouseover", function() {
        image.style.transform = "scale(1.1)";
    });

    image.addEventListener("mouseout", function() {
        image.style.transform = "scale(1)";
    });

});