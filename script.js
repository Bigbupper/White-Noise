document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const defaultVolume = 0;
    const sliders = [
        { slider: document.getElementById("rain"), audio: new Audio("audio/rain.mp3"), maxVolume: 0.1},
        { slider: document.getElementById("thunder"), audio: new Audio("audio/thunder.mp3"), maxVolume: 0.5},
        { slider: document.getElementById("wind"), audio: new Audio("audio/wind.mp3"), maxVolume: 0.4},
        { slider: document.getElementById("city"), audio: new Audio("audio/city.mp3"), maxVolume: 1},
        { slider: document.getElementById("static"), audio: new Audio("audio/static.mp3"), maxVolume: 0.15},
        { slider: document.getElementById("fireplace"), audio: new Audio("audio/fireplace.mp3"), maxVolume: 1},
        { slider: document.getElementById("fan"), audio: new Audio("audio/fan.mp3"), maxVolume: 0.7},
        { slider: document.getElementById("space"), audio: new Audio("audio/space.mp3"), maxVolume: 1},
        { slider: document.getElementById("gaming"), audio: new Audio("audio/gaming.mp3"), maxVolume: 0.7}
    ];

    function updateSliderFill(slider) {
        slider.style.setProperty('--fill-percentage', slider.value + '%');
    }

    function initializeAudio(audio, defaultVolume) {
        audio.loop = true;
        audio.volume = defaultVolume;
    }

    function setSliderValue(slider, maxVolume, defaultVolume) {
        slider.value = (defaultVolume / maxVolume) * 100;
        updateSliderFill(slider);
    }

    function addSliderEventListener(slider, audio, maxVolume) {
        slider.addEventListener("input", function () {
            const volume = (slider.value / 100) * maxVolume;
            audio.volume = volume;

            slider.style.setProperty('--fill-percentage', slider.value + '%');

            if (volume > 0 && audio.paused) {
                audio.play();
            } else if (volume === 0 && !audio.paused) {
                audio.pause();
            }
        });
    }

    sliders.forEach(function (item) {
        const { slider, audio, maxVolume } = item;

        initializeAudio(audio, defaultVolume);
        setSliderValue(slider, maxVolume, defaultVolume);
        addSliderEventListener(slider, audio, maxVolume);
    });

    //pause/play toggle
    const pauseToggle = document.getElementById("pause-all");
    let isPaused = sliders.every(item => item.audio.paused);
    const pauseIcon = '<svg id="pause" fill="#ffffff" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18.432 7.5h4.547v17h-4.547zM9.022 7.5h4.545v17H9.022z"></path></g></svg>';
    const playIcon = '<svg id="play" fill="#ffffff" height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18,11v-1h-1V9h-2V7h-2V5h-2V3H5v18h6v-1v-1h2v-2h2v-2h2v-1h1v-1h1v-2H18z M13,13v2h-2v2H9v2H7V5h2v2h2v2h2v2h2v2H13z"></path> </g></svg>';

    pauseToggle.addEventListener("click", function () {
        if (isPaused) {
            sliders.forEach(function (item) {
                if (item.slider.value > 0) {
                    item.audio.play();
                }
            });
            pauseToggle.innerHTML = pauseIcon;
        } else {
            sliders.forEach(function (item) {
                item.audio.pause();
            });
            pauseToggle.innerHTML = playIcon;
        }
        isPaused = !isPaused;
    });
});
