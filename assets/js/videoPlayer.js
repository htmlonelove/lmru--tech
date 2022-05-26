const initPlayer = () => {
    const videoWrap = document.querySelector('.intro__video-wrap');
    if (!videoWrap) {
        return;
    }
    
    const localPlayer = document.querySelector('[data-video-player]');
    const previewVideoPlayer = document.querySelector('[data-video-preview]');
    const playButton = document.querySelector('.intro__video-button');
    const spinner = document.querySelector('[data-video-spinner]');
 
    playButton.classList.add('hidden');
    videoWrap.classList.add('active');

    if (!previewVideoPlayer || !localPlayer) {
        return;
    }
    
    previewVideoPlayer.addEventListener('click', (evt) => {
        if (localPlayer.readyState === 3 || localPlayer.readyState === 4) {
            previewVideoPlayer.classList.add('hidden');
            previewVideoPlayer.pause();
            localPlayer.muted = false;
            localPlayer.setAttribute('controls', '');
            localPlayer.play();
        } else {
            spinner.classList.remove('hidden');
            localPlayer.addEventListener('canplay', () =>  {
                spinner.classList.add('hidden');
                previewVideoPlayer.classList.add('hidden');
                previewVideoPlayer.pause();
                localPlayer.muted = false;
                localPlayer.setAttribute('controls', '');
                localPlayer.play();
            })
        }
    });    
}

initPlayer();