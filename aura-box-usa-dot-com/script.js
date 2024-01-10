window.addEventListener('scroll', function() {
        var image = document.getElementById('image');
        var windowHeight = window.innerHeight;
        var scrollY = window.scrollY || window.pageYOffset;

        var scrollFraction = scrollY / windowHeight;

        // Change image based on scroll position
        if (scrollFraction < 1) {
            // Scroll is between 0% and 100%
            image.src = 'box-1.png';
        } else if (scrollFraction < 2) {
            // Scroll is between 101% and 200%
            image.src = 'box-2.png';
        } else if (scrollFraction > 3) {
            // Scroll is between 201% and 300%
            image.src = 'box-3.png';
        } // Add more conditions as needed for more images

        // Ensure opacity is set to 1 for new images
        image.style.opacity = 1;
});