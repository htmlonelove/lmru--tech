    const initYouTubeVideo = () => {
        const videoWrap = document.querySelector('.intro__video-wrap');
        if (!videoWrap) {
            return;
        }

        const video = document.querySelector('.video');
        const playButton = document.querySelector('.intro__video-button');

        const src = videoWrap.getAttribute('data-video-id');

        let player = null;

        const playVideo = () => {
            player.playVideo();

            playButton.classList.add('hidden');
            videoWrap.classList.add('active');
        };

        const pauseVideo = () => {
            player.pauseVideo();
        };
        
        const initPlayer = function () {
            const videoObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    player.mute();
                    playVideo();
                } else {
                    pauseVideo();
                }
            }, {
                threshold: [0.2]
            }); 

            player = new YT.Player('youtubeVideoPlayer', {
                height: '360',
                width: '640',
                videoId: src,
                playerVars: {
                    'autoplay': 1,
                    'modestsbranding': 1,
                    'constrols': 1,
                    'rel': 0,
                    'showinfo': 0,
                },
                events: {
                    'onReady': () => {
                        videoObserver.observe(videoWrap);
                        playButton.addEventListener('click', playVideo);
                    }
                }
            });
        }
        
        window.onYouTubePlayerAPIReady = () => {
            initPlayer();
        }    
    }
    
    function onYouTubeIframeAPIReady() {
        initYouTubeVideo();
    }


