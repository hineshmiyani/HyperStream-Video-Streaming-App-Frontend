'use client'

import { useRef } from 'react'
import videojs from 'video.js'
import Player from 'video.js/dist/types/player'

import VideoJS from '@/components/common/VideoJS'

import 'videojs-seek-buttons'

const VideoPlayer = () => {
  const playerRef = useRef<Player | null>(null)

  const videoSrc = 'http://localhost:8080/hls/hinesh_pCjroNhON9.m3u8'

  const videoJsOptions = {
    controls: true, // Enables player controls
    autoplay: false, // Disable autoplay for better user experience
    preload: 'auto', // Preload video metadata or full content
    fluid: true, // Makes the player responsive
    techOrder: ['html5'], // Prioritize HTML5 over Flash (deprecated)
    html5: {
      vhs: {
        overrideNative: !videojs.browser.IS_SAFARI, // Use VHS (Video.js HLS) except for Safari
        enableLowInitialPlaylist: true, // Start with lower quality for faster playback
      },
    },
    liveui: true, // Enables live-specific UI for HLS live streams
    playbackRates: [0.5, 1, 1.5, 2], // Allow users to adjust playback speed
    sources: [
      {
        src: videoSrc,
        type: 'application/x-mpegURL',
      },
    ],
  }

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player

    player.on('waiting', () => {
      videojs.log('player is waiting')
    })

    player.on('dispose', () => {
      videojs.log('player will dispose')
    })
  }
  return (
    <>
      <div>Video Player</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  )
}

export default VideoPlayer
