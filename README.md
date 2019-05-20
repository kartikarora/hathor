# HATHOR p5.js Art

Hathor, is an album art generator made using p5.js. The program compute real-time Fast Fourier Transform (FFT) analysis of the audio file and plots it on a canvas with a minimal two-tone design.

This is just a prototype, it can be scaled up to analyse any audio and generate a basic art, which can be used as a starting point to make something more spectacular. Hathor plots the FFT in a set of 5 lines, where the frequency of the bands increases left to right and top to bottom. The inspiration behind this design is the album cover of Unknown Pleasures by Joy Division, which shows the intensity of successive radio pulses from CP 1919, [the first pulsar discovered](https://blogs.scientificamerican.com/sa-visual/pop-culture-pulsar-origin-story-of-joy-division-s-unknown-pleasures-album-cover-video/).

[Joy Division – Unknown Pleasures album cover](https://i.etsystatic.com/17408700/r/il/9ecc8c/1501868680/il_794xN.1501868680_f6f1.jpg)

Hathor allows the user to save the generated album art as a PNG file. For the prototype, one song is selected at random from a bank of 4 songs. The songs have been taken from [Bensound](https://bensound.com) and have been carefully chosen to cover different frequency ranges. 