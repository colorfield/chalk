/**
* @file
* Attaches behaviors for the Chalk Display module.
*/


(function ($){
    var fade = document.querySelector('.aquarelle');

    var image = document.getElementsByTagName('img')[0];

    // var aquarelle = new Aquarelle(image, 'img/mask.png', {
    //     autoplay: true,
    //     loop: true
    // });

    aquarelle.addEventListener('created', function() {
        var canvas = this.getCanvas();
        canvas.removeAttribute('style');
        image.parentNode.insertBefore(canvas, image.nextSibling);
        image.parentNode.removeChild(image);
    });

    aquarelle.addEventListener('changed', function(event) {
        fade.style.opacity = this.transitionInRange(1, 0, 7183, 7933);

        var canvas = this.getCanvas();
        canvas.style.webkitFilter = 'blur(' + this.transitionInRange(0, 24, 3000) + 'px)';
        canvas.style.webkitTransform = canvas.style.transform = 'translate(-50%, -50%) scale(' + this.transitionInRange(.75, 1) + ')';
    });


})(jQuery);
