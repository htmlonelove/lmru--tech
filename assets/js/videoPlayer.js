const initPlayer = () => {
    const videoWrap = document.querySelector('.intro__video-wrap');
    if (!videoWrap) {
        return;
    }
    
    const localPlayer = document.querySelector('[data-video-player]');
    const playButton = document.querySelector('.intro__video-button');
 
    playButton.classList.add('hidden');
    videoWrap.classList.add('active');
    
    localPlayer.addEventListener('click', () => {
        if (localPlayer.muted) {
            localPlayer.muted = false;
            localPlayer.setAttribute('controls', '');
            setTimeout(() => {
                localPlayer.play();
            }, 1); 
        }
    });    
}

initPlayer();