const initPlayer = () => {
    const videoWrap = document.querySelector('.intro__video-wrap');
    if (!videoWrap) {
        return;
    }
    
    const localPlayer = document.querySelector('[data-video-player]');
    const previewVideoPlayer = document.querySelector('[data-video-preview]');
    const spinner = document.querySelector('[data-video-spinner]');
    const hover = document.querySelector('[data-video-hover]');

    if (!previewVideoPlayer || !localPlayer || !hover) {
        return;
    }

    
    window.addEventListener('load', () => {
        const previewSrc = previewVideoPlayer.dataset.src;
        const localSrc = localPlayer.dataset.src;

        previewVideoPlayer.classList.add('hidden');
        localPlayer.classList.add('hidden');
        previewVideoPlayer.src = previewSrc;
        localPlayer.src = localSrc;

        previewVideoPlayer.addEventListener('canplay', ()=> {
            videoWrap.classList.add('active');
            previewVideoPlayer.classList.remove('hidden');
        })
    
        hover.addEventListener('click', (evt) => {
            if (localPlayer.readyState === 3 || localPlayer.readyState === 4) {
                previewVideoPlayer.classList.add('hidden');
                previewVideoPlayer.pause();
                localPlayer.classList.remove('hidden');
                localPlayer.muted = false;
                localPlayer.setAttribute('controls', '');
                localPlayer.play();
                hover.classList.add('hidden');
            } else {
                spinner.classList.remove('hidden');
                localPlayer.addEventListener('canplay', () =>  {
                    spinner.classList.add('hidden');
                    previewVideoPlayer.classList.add('hidden');
                    localPlayer.classList.remove('hidden');
                    previewVideoPlayer.pause();
                    localPlayer.muted = false;
                    localPlayer.setAttribute('controls', '');
                    localPlayer.play();
                    hover.classList.add('hidden');
                })
            }
        });  
    });
    
}

initPlayer();