<template>
    <div class="welcome-container">
      <h1 class="welcome-title">ДОБРО ПОЖАЛОВАТЬ В EBLⱯN AWARDS 2025</h1>
      <button class="continue-button" @click="continueApp">
        ПРОДОЛЖИТЬ
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Welcome',
    methods: {
      continueApp() {
        this.$router.push('/what'); // Замените на нужный роут
      },
    },
  };
  </script>
  
  <style scoped>
  /* Общий контейнер с фоном */
  .welcome-container {
    height: 100vh; /* Заполняет всю высоту экрана */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* Подключаем фоновое изображение */
    background: url('@/assets/background.png') no-repeat center center;
    background-size: cover;
    /* Дополнительно можно задать запасной цвет фона */
    background-color: #f5f5f5;
  }
  
  /* Заголовок */
  .welcome-title {
    font-family: 'Giga Sans', sans-serif; /* Подключите шрифт Giga Sans, если он кастомный */
    font-weight: 700;
    font-size: 32px;
    padding: 0 15px;
    line-height: 100%;
    text-align: center;
    letter-spacing: 0;
    color: #000; /* при необходимости поменяйте на #fff, если фон тёмный */
    margin-bottom: 30px; /* отступ от кнопки */
  }
  
  /* Кнопка */
  .continue-button {
    background: #FFD043;
    width: 90%;
    max-width: 400px;
    height: 80px;
    border-radius: 40px;
    border: none;
    box-shadow: 0px 7px 11.6px 4px #00000066;
    cursor: pointer;
  
    /* Дополнительные стили для текста кнопки */
    font-family: 'Giga Sans', sans-serif;
    font-size: 24px;
   
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    transition: background 0.3s;
  }
  
  /* Эффект наведения */
  .continue-button:hover {
    background: #ffe066;
  }


  @media (max-width: 480px) {
  .welcome-title {
    font-size: 28px;
    margin-bottom: 20px;
  }
  
  .continue-button {
    height: 70px;
    font-size: 22px;
  }
}




  </style>