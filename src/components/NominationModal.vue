<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <button class="back-button" @click="closeModal">
        <svg width="90" height="102" viewBox="0 0 162 184" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_dddd_1_34)">
            <path opacity="0.2" d="M63.2812 118.969C82.8528 118.969 98.7188 103.103 98.7188 83.5312C98.7188 63.9597 82.8528 48.0938 63.2812 48.0938C43.7097 48.0938 27.8438 63.9597 27.8438 83.5312C27.8438 103.103 43.7097 118.969 63.2812 118.969Z" fill="#656565"/>
            <path d="M63.2812 116.438C82.8528 116.438 98.7188 100.572 98.7188 81C98.7188 61.4284 82.8528 45.5625 63.2812 45.5625C43.7097 45.5625 27.8438 61.4284 27.8438 81C27.8438 100.572 43.7097 116.438 63.2812 116.438Z" fill="#FF3333"/>
            <path d="M63.2812 116.438C82.8528 116.438 98.7188 100.572 98.7188 81C98.7188 61.4284 82.8528 45.5625 63.2812 45.5625C43.7097 45.5625 27.8438 61.4284 27.8438 81C27.8438 100.572 43.7097 116.438 63.2812 116.438Z" fill="#0D0D0D"/>
            <path opacity="0.1" d="M63.2812 45.5625C53.8826 45.5625 44.869 49.2961 38.2232 55.9419C31.5773 62.5877 27.8438 71.6014 27.8438 81C27.8659 81.4224 27.8955 81.8443 27.9327 82.2656C28.2602 73.1035 32.1256 64.4248 38.7172 58.0526C45.3087 51.6805 54.1133 48.1109 63.2812 48.0938C72.3636 48.0944 81.0991 51.5822 87.6843 57.8371C94.2695 64.0921 98.2018 72.6366 98.6693 81.707C98.6881 81.4715 98.7046 81.2358 98.7188 81C98.7188 71.6014 94.9852 62.5877 88.3393 55.9419C81.6935 49.2961 72.6799 45.5625 63.2812 45.5625Z" fill="white"/>
            <path opacity="0.2" d="M41.7656 82.2656H84.7969M41.7656 82.2656L56.9531 67.0781M41.7656 82.2656L56.9531 97.4531" stroke="#656565" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M41.7656 79.7344H84.7969M41.7656 79.7344L56.9531 64.5469M41.7656 79.7344L56.9531 94.9219" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
            <filter id="filter0_dddd_1_34" x="-41" y="-4" width="210" height="231" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-1" dy="3"/>
              <feGaussianBlur stdDeviation="3.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_34"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-5" dy="11"/>
              <feGaussianBlur stdDeviation="6"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"/>
              <feBlend mode="normal" in2="effect1_dropShadow_1_34" result="effect2_dropShadow_1_34"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-12" dy="25"/>
              <feGaussianBlur stdDeviation="8.5"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
              <feBlend mode="normal" in2="effect2_dropShadow_1_34" result="effect3_dropShadow_1_34"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="-21" dy="45"/>
              <feGaussianBlur stdDeviation="10"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0"/>
              <feBlend mode="normal" in2="effect3_dropShadow_1_34" result="effect4_dropShadow_1_34"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_1_34" result="shape"/>
            </filter>
          </defs>
        </svg>
      </button>

      <div class="modal-content">
        <h2 class="nomination-title">{{ nomination?.title || 'Номинация' }}</h2>
        
        <!-- Показываем текущий выбор пользователя, если есть -->
        <div v-if="currentUserVote" class="current-vote-info">
          <h3 class="current-vote-label">Ваш текущий выбор:</h3>
          <p class="current-vote-name">{{ currentUserVote }}</p>
        </div>
        
        <div class="nominee-container">
          <div class="nominee-card">
            <!-- Стрелки теперь внутри карточки номинанта -->
            <button 
              class="arrow-button left" 
              @click="prevNominee" 
              v-if="nominees.length > 1"
              :disabled="isLoading"
            >
              <svg viewBox="0 0 49 78">
                <path d="M35 5 L10 39 L35 73" fill="none" stroke="white" stroke-width="10"/>
              </svg>
            </button>

            <div class="image-container">
              <img 
                :src="currentNominee.image || defaultImage" 
                alt="Номинант" 
                class="nominee-image"
              />
              <h3 class="nominee-name">{{ currentNominee.name || 'Номинант' }}</h3>
            </div>

            <button 
              class="arrow-button right" 
              @click="nextNominee" 
              v-if="nominees.length > 1"
              :disabled="isLoading"
            >
              <svg viewBox="0 0 49 78">
                <path d="M14 5 L39 39 L14 73" fill="none" stroke="white" stroke-width="10"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Аудиоплеер для номинации "ТРЕК ГОДА" - теперь отдельно под карточкой -->
        <div class="nominee-audio-section" v-if="isTrackOfTheYear && currentNominee.audioUrl">
          <AudioPlayerModal
            :audioUrl="currentNominee.audioUrl"
            class="track-audio-player"
          />
        </div>

        <div 
          v-if="nomination?.description"
          class="nomination-description"
        >
          {{ nomination.description }}
        </div>

        <div class="action-buttons">
          <button 
            class="confirm-button" 
            :class="{ 'disabled': isSameNominee || isLoading }"
            @click="confirmSelection"
            :disabled="isSameNominee || isLoading"
          >
            {{ getButtonText }}
          </button>
          <button 
            class="custom-button" 
            @click="openCustomModal"
            :disabled="isLoading"
          >
            СВОЙ ВАРИАНТ
          </button>
        </div>
      </div>
    </div>
    
    <CustomNomineeModal
      v-if="showCustomModal"
      :nominationTitle="nomination?.title || ''"
      :userData="userData"
      :currentUserVote="currentUserVote"
      @close="showCustomModal = false"
      @selected="handleCustomSelection"
    />
  </div>
</template>

<script>
import DefaultImage from '@/assets/placeholder.jpeg'
import CustomNomineeModal from '@/components/CustomNomineeModal.vue'
import AudioPlayerModal from '@/components/AudioPlayerModal.vue'

export default {
  components: {
    CustomNomineeModal,
    AudioPlayerModal
  },

  props: {
    nomination: {
      type: Object,
      default: () => ({})
    },
    nominees: {
      type: Array,
      default: () => []
    },
    userData: {
      type: Object,
      default: () => null
    },
    currentUserVote: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      showCustomModal: false,
      currentIndex: 0,
      defaultImage: DefaultImage,
      isLoading: false
    }
  },
  
  computed: {
    currentNominee() {
      return this.nominees[this.currentIndex] || {}
    },
    
    // Проверяем, совпадает ли текущий номинант с уже выбранным
    isSameNominee() {
      return this.currentUserVote === this.currentNominee.name;
    },
    
    // Добавляем computed свойство для проверки номинации
    isTrackOfTheYear() {
      return this.nomination?.title === 'ТРЕК ГОДА'
    },

    // Определяем текст кнопки в зависимости от состояния
    getButtonText() {
      if (this.isLoading) return 'ОТПРАВКА...';
      if (this.isSameNominee) return 'УЖЕ ВЫБРАН';
      return this.currentUserVote ? 'ПЕРЕГОЛОСОВАТЬ' : 'ПОДТВЕРДИТЬ';
    }
  },
  
  methods: {
    openCustomModal() {
      this.showCustomModal = true
    },
    
    handleCustomSelection(nominee) {
      this.showCustomModal = false
      this.$emit('selected', nominee)
    },

    closeModal() {
      this.$emit('close')
    },
    
    prevNominee() {
      this.currentIndex = this.currentIndex > 0 
        ? this.currentIndex - 1 
        : this.nominees.length - 1
    },
    
    nextNominee() {
      this.currentIndex = this.currentIndex < this.nominees.length - 1 
        ? this.currentIndex + 1 
        : 0
    },
    
    async confirmSelection() {
      if (this.isLoading || !this.userData || this.isSameNominee) return
      
      this.isLoading = true
      
      try {
        // Определяем endpoint в зависимости от того, есть ли уже голос
        const endpoint = this.currentUserVote ? '/revote' : '/vote'
        
        // Генерируем уникальный ID запроса
        const requestId = Math.random().toString(36).substring(2) + Date.now().toString(36);
        
        const response = await fetch(`https://eblannaawardssssss.ru${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.userData.username || 
                     `${this.userData.first_name}${this.userData.last_name ? ' ' + this.userData.last_name : ''}`,
            telegram_id: this.userData.id,
            nomination: this.nomination.title,
            nominee: this.currentNominee.name,
            is_custom: false,
            request_id: requestId
          })
        })
        
        if (!response.ok) {
          throw new Error('Ошибка сети')
        }
        
        const data = await response.json()
        console.log('Голос сохранен:', data)
        
        // Передаем выбранного номинанта родительскому компоненту
        this.$emit('selected', this.currentNominee)
        
      } catch (error) {
        console.error('Ошибка:', error)
        alert('Произошла ошибка при голосовании')
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* Добавляем стили для отображения текущего выбора */
.current-vote-info {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 15px 25px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.current-vote-label {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #000;
  margin: 0 0 8px 0;
}

.current-vote-name {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 28px;
  color: #ffffff;
  margin: 0;
  background: #ecd502;
  padding: 10px 20px;
  border-radius: 15px;
  display: inline-block;
}

/* Остальные стили остаются без изменений */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.nomination-description {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  color: #000000;
  vertical-align: middle;
  padding: 20px 40px;
  border-radius: 20px;
  margin: 40px auto 0;
  max-width: 956px;
  width: 90%;
  word-break: break-word;
}

.modal-container {
  background: url('@/assets/background.png') no-repeat center center/cover;
  border-radius: 50px;
  width: 90%;
  max-width: 1200px;
  padding: 40px;
  position: relative;
  box-shadow: 0px 4px 5.3px 0px #00000070;
  max-height: 90vh;
  overflow-y: auto;
}

.back-button {
  position: absolute;
  width: 90px;
  height: 90px;
  left: 0px;
  top: 0px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  padding: 0;
  overflow: visible;
}

.back-button:hover {
  transform: scale(1.1);
}

.nomination-title {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 96px;
  text-align: center;
  color: #000000;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  word-break: break-word;
}

.nominee-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
  flex-wrap: wrap;
}

.nominee-card {
  width: 956px;
  max-width: 90%;
  height: auto;
  min-height: 400px;
  max-height: 60vh;
  border-radius: 238px;
  aspect-ratio: 1; 
  overflow: hidden;
  position: relative;
  border: 1px solid #000;
  margin: 0 10px;
  box-shadow: 0px 4px 5.3px rgba(0, 0, 0, 0.44);
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 40px; /* Добавляем отступ снизу */
}

.nominee-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nominee-name {
  position: absolute;
  bottom: 60px; /* Увеличил значение чтобы поднять текст выше */
  left: 50%;
  transform: translateX(-50%);
  padding: 0 !important;
  border-radius: 100px;
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  color: #FFD043;
  white-space: normal;
  line-height: 1.2;
  max-width: 98%;
  text-align: center;
  font-size: clamp(24px, 6vw, 70px);
  overflow: visible;
  width: auto;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0 !important;
  word-break: keep-all;
  hyphens: none;
  overflow-wrap: normal;
}

/* Новые стили для стрелок - теперь они внутри карточки */
.arrow-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(165, 165, 165, 0.54);
  border-radius: 23px;
  width: 84px;
  height: 113px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
  flex-shrink: 0;
  z-index: 2;
}

.arrow-button.left {
  left: 20px;
}

.arrow-button.right {
  right: 20px;
}

.arrow-button:hover:not(:disabled) {
  transform: translateY(-50%) scale(1.1);
}

.arrow-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.arrow-button svg {
  width: 49px;
  height: 78px;
}

/* Стили для аудиоплеера - теперь отдельный блок под карточкой */
.nominee-audio-section {
  width: 90%;
  max-width: 956px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
}

.track-audio-player {
  width: 100%;
  max-width: 600px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.confirm-button {
  background: #FFD043;
  width: 749px;
  max-width: 90%;
  height: 116px;
  border-radius: 83px;
  border: none;
  box-shadow: 0px 7px 11.6px 4px #00000066;
  font-family: 'Giga Sans', sans-serif;
  font-size: 64px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.confirm-button:hover:not(:disabled) {
  transform: scale(1.02);
}

.confirm-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.confirm-button.disabled {
  background: #cccccc !important;
  cursor: not-allowed;
  box-shadow: none;
}

.confirm-button.disabled:hover {
  transform: none;
}

.custom-button {
  background: #27A7E7 !important;
  width: 500px;
  max-width: 90%;
  height: 116px;
  border-radius: 83px;
  border: none;
  box-shadow: 0px 7px 11.6px 4px #00000066;
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.custom-button:hover:not(:disabled) {
  opacity: 0.8;
}

.custom-button:disabled {
  background: #ccc !important;
  cursor: not-allowed;
}

/* Адаптация для мобильных */
@media (max-width: 768px) {
  .back-button {
    width: 70px;
    height: 70px;
    left: 15px;
    top: 15px;
  }
  
  .back-button svg {
    width: 70px;
    height: 79px;
  }

  .modal-container {
    border-radius: 30px;
    padding: 20px;
    width: 95%;
  }

  .nomination-title {
    font-size: 48px;
    margin-bottom: 20px;
  }

  .nominee-card {
    border-radius: 50px;
    min-height: 300px;
    max-width: 90vw;
    width: 100%;
  }

 .nominee-name {
    font-size: clamp(20px, 5.5vw, 32px);
    bottom: 50px; /* Поднимаем и на мобильных */
    padding: 0 !important;
    max-width: 96%;
    white-space: normal;
    margin: 0 !important;
  }
  .nomination-description {
    font-size: 24px;
    padding: 15px 25px;
    margin: 20px auto 0;
  }

  .arrow-button {
    width: 40px;
    height: 60px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8) !important;
  }

  .arrow-button.left {
    left: 10px;
  }

  .arrow-button.right {
    right: 10px;
  }

  .arrow-button svg {
    width: 24px;
    height: 40px;
  }

  .confirm-button,
  .custom-button {
    width: 90%;
    height: 80px;
    font-size: 28px;
    border-radius: 50px;
  }

  .current-vote-info {
    padding: 12px 20px;
    margin-bottom: 15px;
  }

  .current-vote-label {
    font-size: 20px;
  }

  .current-vote-name {
    font-size: 22px;
    padding: 8px 15px;
  }

  .nominee-audio-section {
    width: 95%;
    margin: 15px auto;
  }
}

@media (max-width: 480px) {
  .nomination-title {
    font-size: 36px;
    line-height: 1.2;
  }

  .back-button {
    width: 60px;
    height: 60px;
    left: 10px;
    top: 10px;
  }
  
  .back-button svg {
    width: 60px;
    height: 68px;
  }

  .nominee-card {
    border-radius: 68px;
    min-height: 320px;
    min-width: 320px;
  }

  .nominee-name {
    font-size: clamp(18px, 5vw, 24px);
    bottom: 40px; /* Поднимаем и на маленьких экранах */
    padding: 0 !important;
    max-width: 95%;
    white-space: normal;
    margin: 0 !important;
  }

  .arrow-button {
    width: 30px;
    height: 50px;
  }
  
  .arrow-button svg {
    width: 18px;
    height: 30px;
  }

  .nomination-description {
    font-size: 20px;
    padding: 10px 15px;
    margin-top: 15px;
  }

  .confirm-button {
    height: 50px;
    font-size: 24px;
  }

  .custom-button {
    height: 40px;
    width: 250px;
    font-size: 14px;
  }

  .action-buttons {
    gap: 15px;
    margin-top: 30px;
  }

  .current-vote-label {
    font-size: 18px;
  }

  .current-vote-name {
    font-size: 20px;
  }

  .nominee-audio-section {
    width: 98%;
    margin: 10px auto;
  }
}

@media (max-width: 360px) {
  .nomination-title {
    font-size: 28px;
  }

   .nominee-name {
    font-size: clamp(16px, 4.5vw, 20px);
    bottom: 35px; /* Поднимаем и на самых маленьких */
    padding: 0 !important;
    max-width: 94%;
    white-space: normal;
    margin: 0 !important;
  }
  .nomination-description {
    font-size: 18px;
  }

  .current-vote-label {
    font-size: 16px;
  }

  .current-vote-name {
    font-size: 18px;
  }

  .arrow-button {
    width: 25px;
    height: 45px;
  }
  
  .arrow-button svg {
    width: 15px;
    height: 25px;
  }
}
</style>