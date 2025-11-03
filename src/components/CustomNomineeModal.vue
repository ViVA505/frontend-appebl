<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container custom-modal">
      <!-- Крестик для закрытия -->
      <button class="close-button" @click="closeModal">
        <svg class="close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="modal-content">
        <h2 class="modal-title">Свой вариант для {{ nominationTitle }}</h2>
        
        <!-- Показываем текущий выбор пользователя, если есть -->
        <div v-if="currentUserVote" class="current-vote-info">
          <h3 class="current-vote-label">Ваш текущий выбор:</h3>
          <p class="current-vote-name">{{ currentUserVote }}</p>
        </div>
        
        <div class="search-container">
          <div class="input-wrapper">
            <input 
              v-model="searchQuery" 
              @input="filterSuggestions"
              @focus="loadFullList"
              type="text" 
              placeholder="Введите имя номинанта"
              class="search-input"
              :class="{ 'has-suggestions': filteredSuggestions.length > 0 }"
              :disabled="isLoading"
              ref="searchInput"
            />
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#FFD043" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <ul v-if="filteredSuggestions.length > 0" class="suggestions-list">
            <li 
              v-for="(suggestion, index) in filteredSuggestions" 
              :key="index"
              @click="selectSuggestion(suggestion)"
              class="suggestion-item"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>

        <div class="selected-nominee" v-if="selectedNominee">
          <div class="selected-label">Выбранный номинант:</div>
          <div class="selected-name">{{ selectedNominee }}</div>
        </div>

        <button 
          class="submit-button" 
          :class="{ 'disabled': isSameNominee || !selectedNominee || isLoading }"
          @click="submitVote"
          :disabled="isSameNominee || !selectedNominee || isLoading"
        >
          <span class="button-text">
            {{ getButtonText }}
          </span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nominationTitle: String,
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
      searchQuery: '',
      allSuggestions: [], // Все номинанты для этой номинации
      selectedNominee: '',
      isLoading: false
    }
  },
  computed: {
    // Фильтруем suggestions на основе поискового запроса
    filteredSuggestions() {
      if (!this.searchQuery) {
        return this.allSuggestions;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.allSuggestions.filter(suggestion => 
        suggestion.toLowerCase().includes(query)
      );
    },
    
    // Нормализуем currentUserVote для сравнения (убираем префикс "СВОЙ ВАРИАНТ")
    normalizedCurrentVote() {
      if (!this.currentUserVote) return '';
      
      // Если голос был за свой вариант, извлекаем имя из скобок
      if (this.currentUserVote.startsWith('СВОЙ ВАРИАНТ(')) {
        return this.currentUserVote.replace('СВОЙ ВАРИАНТ(', '').replace(')', '');
      }
      
      return this.currentUserVote;
    },
    
    // Проверяем, совпадает ли выбранный номинант с уже выбранным
    isSameNominee() {
      if (!this.normalizedCurrentVote || !this.selectedNominee) return false;
      return this.normalizedCurrentVote === this.selectedNominee;
    },
    
    // Определяем текст кнопки в зависимости от состояния
    getButtonText() {
      if (this.isLoading) return 'ОТПРАВКА...';
      if (this.isSameNominee) return 'УЖЕ ВЫБРАН';
      if (!this.selectedNominee) return 'ВЫБЕРИТЕ НОМИНАНТА';
      return this.currentUserVote ? 'ПЕРЕГОЛОСОВАТЬ' : 'ПОДТВЕРДИТЬ ВЫБОР';
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    
    // Загружаем полный список номинантов для этой номинации
    async loadFullList() {
      if (this.isLoading || this.allSuggestions.length > 0) return;
      
      this.isLoading = true;
      
      try {
        console.log('Загружаем полный список для номинации:', this.nominationTitle);
        
        const response = await fetch('https://eblannaawardssssss.ru/full-nominees-list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nomination: this.nominationTitle
          })
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Получен ответ:', data);
        
        this.allSuggestions = data.results || [];
        console.log('Загружено номинантов:', this.allSuggestions.length);
        
      } catch (error) {
        console.error('Ошибка загрузки полного списка:', error);
        this.allSuggestions = [];
      } finally {
        this.isLoading = false;
      }
    },
    
    // Фильтруем предложения при вводе
    filterSuggestions() {
      // computed свойство filteredSuggestions автоматически обновляется
    },
    
    selectSuggestion(suggestion) {
      this.selectedNominee = suggestion;
      this.searchQuery = suggestion;
    },
    
    async submitVote() {
      if (!this.selectedNominee || !this.userData || this.isLoading || this.isSameNominee) return;
      
      this.isLoading = true;
      
      try {
        // Определяем endpoint в зависимости от того, есть ли уже голос
        const endpoint = this.currentUserVote ? '/revote-custom' : '/vote-custom';
        
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
            nomination: this.nominationTitle,
            custom_nominee: this.selectedNominee,
            request_id: requestId
          })
        });
        
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        
        const data = await response.json();
        console.log('Голос сохранен:', data);
        
        // Передаем выбранного номинанта в формате, который ожидает родительский компонент
        this.$emit('selected', { 
          name: `СВОЙ ВАРИАНТ(${this.selectedNominee})` 
        });
        this.closeModal();
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при голосовании');
      } finally {
        this.isLoading = false;
      }
    }
  },
  
  mounted() {
    // Автофокус на поле ввода при открытии модального окна
    this.$nextTick(() => {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus();
      }
    });
    
    // Загружаем полный список сразу при открытии
    this.loadFullList();
  }
}
</script>

<style scoped>
/* Стили остаются без изменений */
.current-vote-info {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 12px 20px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Giga Sans', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.current-vote-label {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #000;
  margin: 0 0 8px 0;
}

.current-vote-name {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #FFD043;
  margin: 0;
  background: #000;
  padding: 8px 15px;
  border-radius: 12px;
  display: inline-block;
}

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
  backdrop-filter: blur(5px);
}

.custom-modal {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 208, 67, 0.3);
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 208, 67, 0.2);
  transform: rotate(90deg);
}

.close-icon {
  width: 20px;
  height: 20px;
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-title {
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  color: #FFD043;
  margin-bottom: 25px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.search-container {
  position: relative;
  margin: 15px 0;
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 15px 45px 15px 15px;
  font-size: 16px;
  font-family: 'Giga Sans', sans-serif;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 208, 67, 0.3);
  border-radius: 12px;
  box-sizing: border-box;
  color: white;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #FFD043;
  box-shadow: 0 0 0 3px rgba(255, 208, 67, 0.2);
}

.search-input.has-suggestions {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(45, 45, 45, 0.95);
  border: 2px solid #FFD043;
  border-top: none;
  border-radius: 0 0 12px 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
  backdrop-filter: blur(10px);
}

.suggestion-item {
  padding: 12px 15px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background-color: rgba(255, 208, 67, 0.2);
}

.suggestion-item:last-child {
  border-bottom: none;
}

.selected-nominee {
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 208, 67, 0.1);
  border-radius: 12px;
  width: 100%;
  text-align: center;
  border: 1px solid rgba(255, 208, 67, 0.3);
}

.selected-label {
  font-family: 'Giga Sans', sans-serif;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.selected-name {
  font-family: 'Giga Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #FFD043;
}

.submit-button {
  background: linear-gradient(135deg, #FFD043 0%, #FFB400 100%);
  width: 100%;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 15px rgba(255, 208, 67, 0.3);
  font-family: 'Giga Sans', sans-serif;
  font-weight: 700;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 208, 67, 0.5);
}

.submit-button:active:not(.disabled) {
  transform: translateY(0);
}

.submit-button.disabled {
  background: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
  cursor: not-allowed;
  box-shadow: none;
}

.button-text {
  font-size: 16px;
  font-family: 'Giga Sans', sans-serif;
}

.arrow-icon {
  width: 20px;
  height: 20px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .custom-modal {
    width: 95%;
    padding: 20px;
  }
  
  .modal-title {
    font-size: 20px;
    font-family: 'Giga Sans', sans-serif;
  }
  
  .search-input {
    padding: 12px 40px 12px 12px;
    font-size: 14px;
    font-family: 'Giga Sans', sans-serif;
  }
  
  .search-icon {
    right: 12px;
    width: 18px;
    height: 18px;
  }
  
  .selected-nominee {
    padding: 12px;
  }
  
  .selected-label {
    font-size: 12px;
    font-family: 'Giga Sans', sans-serif;
  }
  
  .selected-name {
    font-size: 16px;
    font-family: 'Giga Sans', sans-serif;
  }
  
  .submit-button {
    padding: 14px 20px;
  }
  
  .button-text {
    font-size: 14px;
  }
  
  .arrow-icon {
    width: 18px;
    height: 18px;
  }

  .current-vote-info {
    padding: 10px 15px;
    margin-bottom: 15px;
  }

  .current-vote-label {
    font-size: 16px;
  }

  .current-vote-name {
    font-size: 18px;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .modal-title {
    font-size: 18px;
  }
  
  .search-input {
    padding: 10px 35px 10px 10px;
  }
  
  .submit-button {
    padding: 12px 16px;
  }

  .current-vote-label {
    font-size: 14px;
  }

  .current-vote-name {
    font-size: 16px;
  }
}
</style>
