const initPlayer = () => {
    const videoWrap = document.querySelector('.intro__video-wrap');
    if (!videoWrap) {
        return;
    }
    
    const localPlayer = document.querySelector('[data-video-player]');

    if (!localPlayer) {
        return;
    }
    
    window.addEventListener('load', () => {
        const localSrc = localPlayer.dataset.src;
        localPlayer.classList.add('hidden');
        localPlayer.src = localSrc;
        if (localPlayer.readyState === 3 || localPlayer.readyState === 4) {
            videoWrap.classList.add('active');
            localPlayer.classList.remove('hidden');
            localPlayer.addEventListener('click', () => {
                localPlayer.muted = false;
                localPlayer.setAttribute('controls', '');

                setTimeout(() => {
                    localPlayer.play();
                }, 10);
            }, {once: true});
        } else {
            localPlayer.addEventListener('canplay', () =>  {
                videoWrap.classList.add('active');
                localPlayer.classList.remove('hidden');
                localPlayer.addEventListener('click', () => {
                    localPlayer.muted = false;
                    localPlayer.setAttribute('controls', '');
                    setTimeout(() => {
                        localPlayer.play();
                    }, 10);
                }, {once: true});
            })
            }
        });  
}

initPlayer();