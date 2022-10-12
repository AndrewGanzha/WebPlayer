const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress_container'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover_img'),
      imgSrc = document.querySelector('.img_src')

const songs = ['Rain Shades', 'In Memory of Bill Evans', 'Say']

let songIndex = 0

//Init
function loadSong(song) {
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    cover.src = `images/cover${songIndex + 1}.svg`
}

loadSong(songs[songIndex])

function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    imgSrc.src = './images/pause.svg'
    audio.play()
}

function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    imgSrc.src = './images/play-button.svg'
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying){
        pauseSong()
    } else{
        playSong()
    }
})

//NextSong

function nextSong() {
    songIndex++

    if (songIndex > songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

//PrevSong

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)

//ProgressBar

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration ) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

//Set Progress
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX 
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

//AutoPlay
audio.addEventListener('ended', nextSong)