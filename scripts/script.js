console.log('Welcome to MUSIC PLAYER script file');

let songs = [{ fileName: "First song name", filePath: "/assets/songs/1.mp3", fileCover: "/assets/covers/1.jpg" },
    { fileName: "Second song name", filePath: '/assets/songs/1.mp3', fileCover: "/assets/covers/1.jpg" },
    { fileName: "Third song name", filePath: "/assets/songs/2.mp3", fileCover: "/assets/covers/2.jpg" },
    { fileName: "Fourth song name", filePath: "/assets/songs/3.mp3", fileCover: "/assets/covers/3.jpg" },
    { fileName: "Fifth song name", filePath: "/assets/songs/4.mp3", fileCover: "/assets/covers/4.jpg" },
    { fileName: "Sixth song name", filePath: "/assets/songs/5.mp3", fileCover: "/assets/covers/5.jpg" },
    { fileName: "Seventh song name", filePath: "/assets/songs/6.mp3", fileCover: "/assets/covers/6.jpg" }
];


let audioIndex = 0;
let audioElement = new Audio(songs[audioIndex].filePath);
let progressBar = document.getElementById('progressBar');
let masterbtn = document.getElementById('master_btn');

// add songs to player 
initialize();

//Real time update of seekbar using current song time
audioElement.addEventListener('timeupdate', () => {

    let progress = (audioElement.currentTime / audioElement.duration) * 100; //% of song completed

    progressBar.value = progress;
    document.getElementById('currentTime').innerText = `${convertHMS(audioElement.currentTime)} / ${convertHMS(audioElement.duration)}`;
});

// Seekbar controller
progressBar.addEventListener('change', () => {

    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;

});


// Master Play/Pause button  
masterbtn.addEventListener('click', () => {
    console.log('triggered master_btn ');

    if (audioElement.paused) startPlaying();
    else pausePlaying();
});





//FUNCTION DEFINITIONS

// runs on startup, adds songs to playerList
function initialize() {

    let songList = document.getElementById('songList');
    for (let i = 0; i < songs.length; ++i) {
        let html = ` <div class="songContainer " id="container${i}">
                    <div class="songBanner"><img src="${songs[i].fileCover}" alt="song cover"></div>
                    <div class="song_heading">${songs[i].fileName}</div>
                    <div class="song_button play" id="${i}" onclick="clickedSong(this.id)"></div>
                </div>`;
        songList.innerHTML += html;
    }

}

// when play/pause button is clicked on a song from songList
function clickedSong(id) {
    console.log(`clicked song ${id}`);

    if (id != audioIndex) {
        pausePlaying();

        //changed data in audioElement here
        audioIndex = id;
        audioElement.src = songs[id].filePath;
        audioElement.currentTime = 0;

        startPlaying();
    } else {
        if (audioElement.paused) startPlaying();
        else
            pausePlaying();
    }

}

function pausePlaying() {
    for (let i = 0; i < songs.length; ++i) {
        document.getElementById(`container${i}`).classList.remove('active');
        document.getElementById(`${i}`).classList.remove('pause');
        document.getElementById(`${i}`).classList.add('play');
    }

    audioElement.pause();
    masterbtn.classList.remove('pause');
    masterbtn.classList.add('play');
}

function startPlaying() {
    audioElement.play();

    document.getElementById('currentSongThumbnail').innerHTML = `<img src="${songs[audioIndex].fileCover}" alt="song cover">`;
    document.getElementById('songName').innerText = `${songs[audioIndex].fileName}`;

    masterbtn.classList.remove('play');
    masterbtn.classList.add('pause');

    document.getElementById(`${audioIndex}`).classList.remove('play');
    document.getElementById(`${audioIndex}`).classList.add('pause');
    document.getElementById(`container${audioIndex}`).classList.add('active');

}

// convert seconds to minutes 
function convertHMS(sec) {
    let minutes = Math.floor((sec) / 60); // get minutes
    let seconds = Math.floor(sec - (minutes * 60)); //  get seconds

    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return `${minutes + ':' + seconds}`; // Return is MM : SS
}