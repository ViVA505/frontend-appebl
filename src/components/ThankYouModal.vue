<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="thankyou-container">
        <h2 class="thankyou-title">{{ isRevote ? 'ГОЛОС ИЗМЕНЕН!' : 'СПАСИБО ЗА ГОЛОС!' }}</h2>
        
        <div class="smile-wrapper">
          <img 
            src="@/assets/smile.gif" 
            alt="Smile" 
            class="smile-image"
          />
        </div>
  
        <div class="nominee-info">
          <h3 class="subtitle">ВАШ НОМИНАНТ:</h3>
          <div class="selected-name">{{ selectedNomineeName }}</div>
          <p class="instruction">
            ПРОГОЛОСОВАТЬ ЗА ДРУГИЕ НОМИНАЦИИ МОЖНО В МЕНЮ
          </p>
        </div>
  
        <button class="close-button" @click="closeModal">
          ЗАКРЫТЬ
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedNomineeName: {
        type: String,
        default: ''
      },
      isRevote: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeModal() {
        this.$emit('close')
      }
    }
  }
  </script>
  
  <style scoped>
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
  
  .thankyou-container {
    background: url('@/assets/background.png') no-repeat center center/cover;
    border-radius: 50px;
    width: 90%;
    max-width: 1082px;
    padding: 60px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .thankyou-title {
    font-family: 'Giga Sans', sans-serif;
    font-weight: 700;
    font-size: 96px;
    line-height: 100%;
    color: #000000;
    margin-bottom: 40px;
    text-align: center;
  }
  
  .smile-wrapper {
    width: 300px;
    height: 300px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .smile-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* Убираем все возможные границы и контуры */
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    /* Убираем стандартные рамки вокруг изображений */
    display: block;
  }
  
  .nominee-info {
    text-align: center;
    margin: 40px 0;
  }
  
  .subtitle,
  .selected-name,
  .instruction {
    background: #FFFFFF;
    box-shadow: 
      0px 4px 9px 0px rgba(0, 0, 0, 0.15),
      0px 16px 16px 0px rgba(0, 0, 0, 0.13),
      0px 36px 21px 0px rgba(0, 0, 0, 0.08),
      0px 63px 25px 0px rgba(0, 0, 0, 0.02),
      0px 99px 28px 0px rgba(0, 0, 0, 0);
    padding: 25px 40px;
    border-radius: 20px;
    display: inline-block;
    margin: 15px 0;
  }
  
  .subtitle {
    font-family: 'Giga Sans', sans-serif;
    font-weight: 700;
    font-size: 64px;
    color: #000000;
  }
   
  .selected-name {
    font-family: 'Giga Sans', sans-serif;
    font-weight: 700;
    font-size: 96px;
    color: #FFD043;
    background: #FFFFFF !important;
  }
  
  .instruction {
    font-family: 'Giga Sans', sans-serif;
    font-weight: 700;
    font-size: 64px;
    color: #000000;
    line-height: 1.3;
    max-width: 90%;
  }
    
  .close-button {
    background: #FFD043;
    width: 749px;
    max-width: 90%;
    height: 116px;
    border-radius: 83px;
    border: none;
    box-shadow: 0px 7px 11.6px 4px rgba(0, 0, 0, 0.4);
    font-family: 'Giga Sans', sans-serif;
    font-size: 64px;
    font-weight: 700;
    color: white;
    cursor: pointer;
    transition: transform 0.2s;
    margin-top: 40px;
  }
  
  .close-button:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    .thankyou-container {
      padding: 40px 20px;
      border-radius: 30px;
    }
  
    .thankyou-title {
      font-size: 48px;
      margin-bottom: 30px;
    }
  
    .smile-wrapper {
      width: 200px;
      height: 200px;
    }
  
    .subtitle,
    .selected-name,
    .instruction {
      padding: 20px 30px;
      border-radius: 15px;
      margin: 10px 0;
    }
  
    .subtitle {
      font-size: 36px;
    }
      
    .selected-name {
      font-size: 48px;
    }
  
    .instruction {
      font-size: 28px;
    }
  
    .close-button {
      height: 80px;
      font-size: 36px;
      margin-top: 30px;
    }
  }
  
  @media (max-width: 480px) {
    .thankyou-title {
      font-size: 36px;
      margin-bottom: 20px;
    }
  
    .smile-wrapper {
      width: 150px;
      height: 150px;
    }
  
    .subtitle,
    .selected-name,
    .instruction {
      padding: 15px 20px;
      border-radius: 12px;
    }
  
    .subtitle {
      font-size: 28px;
    }
  
    .selected-name {
      font-size: 36px;
    }
  
    .instruction {
      font-size: 22px;
      margin: 20px 0;
      padding: 0 10px;
    }
  
    .close-button {
      height: 60px;
      font-size: 28px;
      width: 90%;
    }
  }
  
  @media (max-width: 360px) {
    .thankyou-title {
      font-size: 28px;
    }
  
    .subtitle,
    .selected-name,
    .instruction {
      padding: 12px 15px;
    }
    
    .subtitle {
      font-size: 24px;
    }
  
    .selected-name {
      font-size: 28px;
    }
  
    .instruction {
      font-size: 18px;
    }
  
    .close-button {
      font-size: 24px;
      height: 50px;
    }
  }
  
  /* Вертикальная ориентация */
  @media (max-width: 768px) and (orientation: portrait) {
    .thankyou-container {
      max-height: 90vh;
      overflow-y: auto;
      padding: 30px 15px;
    }
    
    .instruction {
      margin: 15px 0;
    }
  }
  </style>