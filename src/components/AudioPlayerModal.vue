<template>
  <div class="audio-player" v-if="audioUrl">
    <audio 
      ref="audioElement"
      :src="audioUrl"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
      @ended="onEnded"
    ></audio>
    
    <div class="player-controls">
      <!-- Левая часть: кнопка воспроизведения и время -->
      <div class="controls-left">
        <button 
          class="play-btn"
          @click="togglePlay"
          :class="{ playing: isPlaying }"
        >
          <span class="play-icon">{{ isPlaying ? '❚❚' : '▶' }}</span>
        </button>
        
        <div class="time-display">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>
      </div>
      
      <!-- Центральная часть: прогресс-бар -->
      <div class="progress-container" @click="seek">
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
      
      <!-- Правая часть: громкость -->
      <div class="controls-right">
        <button 
          class="volume-btn"
          @click="toggleMute"
          :class="{ muted: isMuted }"
        >
          <span class="volume-icon">{{ volumeIcon }}</span>
        </button>
        
        <div class="volume-container">
          <input 
            type="range" 
            class="volume-slider"
            min="0"
            max="1"
            step="0.1"
            v-model="volume"
            @input="updateVolume"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    audioUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0.7,
      isMuted: false,
      wasPlayingBeforeMute: false
    }
  },
  computed: {
    progressPercentage() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0
    },
    volumeIcon() {
      if (this.isMuted || this.volume === 0) return '🔇'
      if (this.volume < 0.3) return '🔈'
      if (this.volume < 0.7) return '🔉'
      return '🔊'
    }
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audioElement
      if (this.isPlaying) {
        audio.pause()
      } else {
        audio.play().catch(error => {
          console.error('Ошибка воспроизведения:', error)
        })
      }
      this.isPlaying = !this.isPlaying
    },
    
    onLoadedMetadata() {
      this.duration = this.$refs.audioElement.duration
    },
    
    onTimeUpdate() {
      this.currentTime = this.$refs.audioElement.currentTime
    },
    
    onEnded() {
      this.isPlaying = false
      this.currentTime = 0
    },
    
    seek(event) {
      const audio = this.$refs.audioElement
      const progressContainer = event.currentTarget
      const rect = progressContainer.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const width = rect.width
      const percentage = clickX / width
      
      audio.currentTime = percentage * this.duration
    },
    
    toggleMute() {
      const audio = this.$refs.audioElement
      if (this.isMuted) {
        audio.volume = this.volume
        this.isMuted = false
        
      } else {
        this.wasPlayingBeforeMute = this.isPlaying
        audio.volume = 0
        this.isMuted = true
        if (this.isPlaying) {
          audio.volume = 0
            this.isMuted = true
        }
      }
    },
    
    updateVolume() {
      const audio = this.$refs.audioElement
      audio.volume = this.volume
      this.isMuted = this.volume === 0
    },
    
    formatTime(seconds) {
      if (isNaN(seconds)) return '0:00'
      
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  },
  watch: {
    audioUrl(newUrl) {
      this.isPlaying = false
      this.currentTime = 0
      this.duration = 0
      
      this.$nextTick(() => {
        const audio = this.$refs.audioElement
        if (audio) {
          audio.load()
        }
      })
    }
  },
  beforeUnmount() {
    if (this.$refs.audioElement) {
      this.$refs.audioElement.pause()
    }
  }
}
</script>

<style scoped>
.audio-player {
  margin: 10px 0 5px 0;
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(255, 208, 67, 0.15) 0%, rgba(255, 180, 0, 0.1) 100%);
  border: 1px solid rgba(255, 208, 67, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.player-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
}

.controls-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
}

.controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  justify-content: flex-end;
}

.play-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFD043 0%, #FFB400 100%);
  border: 2px solid #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.play-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.play-btn.playing {
  background: linear-gradient(135deg, #27A7E7 0%, #1E90FF 100%);
}

.play-icon {
  font-size: 12px;
  color: #000;
  font-weight: bold;
  margin-left: 1px;
}

.time-display {
  font-family: 'Giga Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #000;
  white-space: nowrap;
}

.progress-container {
  flex: 1;
  max-width: 200px;
  cursor: pointer;
  padding: 0 5px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFD043, #FFB400);
  border-radius: 2px;
  transition: width 0.1s;
  box-shadow: 0 0 3px rgba(255, 208, 67, 0.5);
}

.volume-btn {
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.volume-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.05);
}

.volume-icon {
  font-size: 12px;
}

.volume-container {
  width: 60px;
}

.volume-slider {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  background: #FFD043;
  border-radius: 50%;
  border: 1px solid #000;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: #FFD043;
  border-radius: 50%;
  border: 1px solid #000;
  cursor: pointer;
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .audio-player {
    padding: 6px 8px;
    max-width: 90%;
    margin: 8px auto 3px auto;
  }
  
  .player-controls {
    gap: 6px;
  }
  
  .controls-left,
  .controls-right {
    min-width: 80px;
  }
  
  .play-btn {
    width: 28px;
    height: 28px;
  }
  
  .play-icon {
    font-size: 10px;
  }
  
  .time-display {
    font-size: 10px;
  }
  
  .progress-container {
    max-width: 150px;
  }
  
  .volume-btn {
    width: 24px;
    height: 24px;
  }
  
  .volume-container {
    width: 50px;
  }
  
  .volume-icon {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .audio-player {
    max-width: 95%;
    padding: 5px;
  }
  
  .controls-left,
  .controls-right {
    min-width: 70px;
  }
  
  .progress-container {
    max-width: 120px;
  }
  
  .volume-container {
    width: 40px;
  }
}
</style>