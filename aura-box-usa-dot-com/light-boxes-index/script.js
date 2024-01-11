window.addEventListener('scroll', function() {
    var image = document.getElementById('image');
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;

    var scrollFraction = scrollY / windowHeight;
    var currentImageSrc = image.getAttribute('src');

    // Function to change image source
    function changeImage(newSrc) {
        if (currentImageSrc !== newSrc) {
            // Reduce opacity
            image.style.opacity = 0;

            // Wait for the transition to complete
            setTimeout(function() {
                // Change image source
                image.src = newSrc;
                currentImageSrc = newSrc;

                // Restore opacity
                image.style.opacity = 1;
            }, 500); // Match this timeout with the CSS transition duration
        }
    }

    // Change image based on scroll position
    if (scrollFraction < 0.5) {
        changeImage('box-1.png');
    } else if (scrollFraction < 1.0) {
        changeImage('box-2.png');
    } else if (scrollFraction > 1.5) {
        changeImage('box-3.png');
    }
    // Add more conditions as needed for more images
});
