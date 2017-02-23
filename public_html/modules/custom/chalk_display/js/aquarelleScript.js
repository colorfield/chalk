/**
* @file
* Attaches behaviors for the Chalk Display module.
*/


(function ($){
    var fade = document.querySelector('.hero');

    var image = document.querySelector('.hero img');

    var aquarelle = new Aquarelle(image, '/modules/custom/chalk_display/images/mask.png', {
        autoplay: true,
        fromAmplitude: 20,
        toAmplitude: 0,
        duration: 12000,
    });

    aquarelle.addEventListener('created', function() {
        var canvas = this.getCanvas();
        canvas.removeAttribute('style');
        image.parentNode.insertBefore(canvas, image.nextSibling);
        image.parentNode.removeChild(image);
    });


})(jQuery);
