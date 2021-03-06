var GifLinks = (function() {

    'use strict';
    var body;
    var container;
    var audio;
    var audioSupported

        // Soft object augmentation
        function extend(target, source) {
            for (var key in source) {
                if (!(key in target)) {
                    target[key] = source[key];
                }
            }

            return target;
        }

        // Applys a dict of css properties to an element
        function applyProperties(target, properties) {
            for (var key in properties) {
                target.style[key] = properties[key];
            }
        }

        // Initialize
        function init(elements, preload) {
            var a = document.createElement('audio');
            audioSupported = !! (a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));

            if (elements.length) {
                // Loop and assign
                for (var i = 0; i < elements.length; i++) {
                    if (preload === true) {
                        preloadAndTrack(elements[i]);
                    } else {
                        track(elements[i]);
                    }
                    addAudioIcon(elements[i]);
                }
            } else {
                if (preload === true) {
                    preloadAndTrack(elements);
                } else {
                    track(elements);
                }
                addAudioIcon(elements);
            }
        }

        // Start tracking after preload
        function preloadAndTrack(element) {
            var awesomeGif = element.getAttribute('data-src');
            if (awesomeGif) {
                // Load the image
                var img = new Image();
                img.onload = function() {
                    element.className += ' preloaded'
                    track(element)
                }
                img.src = awesomeGif;
            }
            // @todo Support preloading of audio
        }

        // Add the audio icon to elements with audio tracks
        function addAudioIcon(element) {
            var awesomeAudio = element.getAttribute('data-audio');
            var awesomeAudioIcon = element.getAttribute('data-audio-icon');
            if (audioSupported && awesomeAudio 
                && (!awesomeAudioIcon || awesomeAudioIcon == "true")) {
                element.innerHTML+="&#128266;";
            }
        }
        // Start tracking mouse hovers
        function track(element) {
            // "Party on Wayne" ~ "Party on Garth"
            element.addEventListener('mouseover', function() {
                startPartying(this);
            }, false);
            element.addEventListener('touchstart', function() {
                startPartying(this);
            }, false);

            // Someone called the cops.
            element.addEventListener('mouseout', function() {
                stopParting();
            }, false);
            element.addEventListener('touchmove', function(event) {
                event.preventDefault();
                stopParting();
            }, false);
            element.addEventListener('click', function() {
                stopParting();
            }, false);
            element.addEventListener('dblclick', function() {
                stopParting();
            }, false);

            addClasses(element);
        }

        // Adds classes to do with giflink status (has link etc)
        function addClasses(element) {
            element.className += ' giflink ready';

            if (element.href) {
                element.className += ' has-link';
            } else {
                element.className += ' no-link';
            }
        }

        // Create and cache the gif container.
        function createContainer() {
            var containerProperties = {
                'backgroundPosition': '50% 50%',
                'backgroundSize': 'cover',
                'pointerEvents': 'none',
                'position': 'fixed',
                'zIndex': '999999',
                'display': 'none',
                'height': '100%',
                'width': '100%',
                'margin': '0px',
                'left': '0px',
                'top': '0px'
            }

            container = document.createElement('div');
            applyProperties(container, containerProperties);
            body.appendChild(container);
        }

        // Add the background to the container, and the container to the page!
        function startPartying(element) {
            var awesomeGif = element.getAttribute('data-src');
            if (awesomeGif) {
                container.style['backgroundImage'] = 'url(' + awesomeGif + ')';
                container.style['display'] = 'block';
            }

            if (audio)
                audio.pause();
            var awesomeAudio = element.getAttribute('data-audio');
            if (audioSupported && awesomeAudio) {
                audio = new Audio(awesomeAudio);

                var loopAudio = element.getAttribute('data-audio-loop');
                if (!loopAudio || loopAudio == "true") {
                    audio.addEventListener('ended', function() {
                        if (audio) {
                            this.currentTime = 0;
                            this.play();
                        }
                    }, false);
                }
                audio.play();
            }
        }

        // Hide the container
        function stopParting() {
            if (audio)
                audio.pause();
            container.style['display'] = 'none';
            container.style['backgroundImage'] = '';
        }

        function main(elements, options) {
            // Caching
            body = document.body;
            createContainer();

            var preload = false;
            if (options && options.preload) {
                preload = !! options.preload;
            }

            // Initialize giflinks
            init(elements, preload);
        }

    return extend(main, {

    });

})();
