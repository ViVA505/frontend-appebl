<template>
  <div class="advertisement-modal" @click.self="close">
    <div class="advertisement-modal-container">
      <!-- Основной контент -->
      <div class="advertisement-content">
        <div class="text-section">
          <h1 class="title">
            НЕ СТИНТ — СМИ ПО СТИНТУ, EBLⱯNSQUAD И ЕГО ИНФОПОЛЮ.
          </h1>
        </div>

        <!-- Логотип -->
        <div class="logo-section">
          <img 
            src="@/assets/НЕ СТИНТ БЕЗ ФОНА 4.png" 
            alt="НЕ СТИНТ"
            class="advertisement-logo"
          />
        </div>

        <!-- Кнопки -->
        <div class="buttons-section">
          <button class="subscribe-button" @click="subscribe">
            ПОДПИСАТЬСЯ
          </button>
          
          <button class="close-button" @click="close">
            ЗАКРЫТЬ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdvertisementModal',
  methods: {
    subscribe() {
      window.open('https://t.me/nestint', '_blank');
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Новые стили для всплывающего окна */
.advertisement-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.advertisement-modal-container {
  background: #FFFFFF;
  border-radius: 50px;
  width: 90%;
  max-width: 1031px;
  height: 90%;
  max-height: 1814px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Остальные стили остаются прежними, но адаптируем под новый контейнер */
.advertisement-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  box-sizing: border-box;
}

.text-section {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.title {
  font-family: 'Giga Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: clamp(24px, 4vw, 64px);
  line-height: 1.2;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #000000;
  text-shadow: 0px 5px 7.8px rgba(0, 0, 0, 0.35);
  margin: 0;
  padding: 0 20px;
}

.logo-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.advertisement-logo {
  width: clamp(300px, 60vw, 700px);
  height: clamp(300px, 60vw, 700px);
  object-fit: contain;
  filter: drop-shadow(0px 15px 39.1px rgba(0, 0, 0, 0.23));
}

.buttons-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
}

.subscribe-button {
  width: clamp(300px, 80%, 871px);
  height: clamp(80px, 15vw, 173px);
  background: #27A7E7;
  box-shadow: 0px 4px 11.7px rgba(0, 0, 0, 0.59), inset 0px 19px 44.3px rgba(255, 255, 255, 0.52);
  border-radius: 83px;
  border: none;
  
  font-family: 'Giga Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: clamp(32px, 5vw, 75px);
  line-height: 1.2;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  cursor: pointer;
  transition: transform 0.2s;
}

.subscribe-button:hover {
  transform: scale(1.05);
}

.close-button {
  width: clamp(300px, 70%, 749px);
  height: clamp(70px, 12vw, 116px);
  background: #FFD043;
  box-shadow: 0px 7px 11.6px 4px rgba(0, 0, 0, 0.4);
  border-radius: 83px;
  border: none;
  
  font-family: 'Giga Sans', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 64px);
  line-height: 1.2;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  cursor: pointer;
  transition: transform 0.2s;
}

.close-button:hover {
  transform: scale(1.05);
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .advertisement-modal-container {
    width: 95%;
    height: 95%;
    border-radius: 30px;
  }
  
  .advertisement-content {
    padding: 20px;
  }
  
  .title {
    font-size: clamp(20px, 6vw, 40px);
    padding: 0 10px;
  }
  
  .buttons-section {
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .subscribe-button,
  .close-button {
    border-radius: 50px;
  }
}

@media (max-width: 480px) {
  .advertisement-modal-container {
    border-radius: 20px;
  }
  
  .advertisement-content {
    padding: 15px;
  }
  
  .title {
    font-size: clamp(18px, 5vw, 32px);
  }
  
  .advertisement-logo {
    width: clamp(200px, 50vw, 400px);
    height: clamp(200px, 50vw, 400px);
  }
}
</style>