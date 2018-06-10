# HATHOR p5.js Art

Hathor, is an album art generator made using p5.js. The program compute real-time Fast Fourier Transform (FFT) analysis of the audio file and plots it on a canvas with a minimal two-tone design.

This is just a prototype, it can be scaled up to analyse any audio and generate a basic art, which can be used as a starting point to make something more spectacular. Hathor plots the FFT in a set of 5 lines, where the frequency of the bands increases left to right and top to bottom. The inspiration behind this design is the album cover of Unknown Pleasures by Joy Division, which shows the intensity of successive radio pulses from CP 1919, [the first pulsar discovered](https://blogs.scientificamerican.com/sa-visual/pop-culture-pulsar-origin-story-of-joy-division-s-unknown-pleasures-album-cover-video/).

Joy Division – Unknown Pleasures album cover

Hathor allows the user to save the generated album art as a PNG file. It also lets the user listen to the song on Spotify. For the prototype, one song is selected at random from a bank of 4 songs which are

- [Bohemian Rhapsody - The Queen](https://open.spotify.com/track/1ONqVFerUEyoXpgtBpbzfM?si=P56G95CKSmel-5l1rCpz2w)
- [Radio Ga Ga - The Queen](https://open.spotify.com/track/30cjrAb2I858LOMhwGcrjd?si=6fUurRWaSruNQ1ueE0lBIQ)
- [Heavy Metal - Justice](https://open.spotify.com/track/621W0YFtYurfPC6hwvmWgc?si=ihsnFk3bSzeIKPWlB9J7Cg)
- [Canon - Justice](https://open.spotify.com/track/5GsdNmkpAbtZnUt5VxtbHm?si=B3gu3WrcSNmmCA64eOTIOQ)

Canon, Radio Ga Ga, Heavy Metal and Bohemian Rhapsody on Hathor

> All songs and logos are copyrights and/or trademarks of the respective owners. They were used in this project for academic purposes only.
> No copyright infringement intended.

Songs have been removed from this repository. Working demo of this software can be found [here](https://www.openprocessing.org/sketch/554970)