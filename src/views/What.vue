<template>
    <div class="what-container">
      <h1 class="what-title fade-in">ЧТО ТАКОЕ EBLⱯN AWARDS?</h1>
      <h3 class="what-describe fade-in delay">EBLⱯN AWARDS — это ежегодная премия, посвященная самым значительным и важным событиям, 
        а также достижениям стримеров, связанных с EBLⱯN SQUAD и не только.</h3>   
      <button class="continue-button fade-in delay-2" @click="continueApp">
        ПРОДОЛЖИТЬ
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'What',
    methods: {
      continueApp() {
        this.$router.push('/home'); // Замените на нужный роут
      },
    },
  };
  </script>
  
  <style scoped>
  /* Фоновое изображение */
  .what-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url('@/assets/background.png') no-repeat center center;
    background-size: cover;
    background-color: #f5f5f5;
  }
  
  /* Заголовок */
  .what-title {
    font-family: 'Giga Sans', sans-serif;
    font-weight: 700;
    font-size: 32px;
    padding: 0 15px;
    text-align: center;
    color: #000;
    margin-bottom: 20px;
  }
  
  /* Описание */
  .what-describe {
    font-family: 'Giga Sans', sans-serif;
    font-weight: 700;
    font-size: 18px;
    padding: 0 20px;
    text-align: center;
    margin-bottom: 30px;
    color: #000;
    margin-bottom: 40px;
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
  
    font-family: 'Giga Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    transition: background 0.3s, transform 0.3s;
  }
  
  /* Анимация появления */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInMoveUp 0.8s ease-out forwards;
  }
  
  /* Задержка анимации */
  .delay {
    animation-delay: 0.3s;
  }
  .delay-2 {
    animation-delay: 0.6s;
  }
  
  /* Ключевые кадры */
  @keyframes fadeInMoveUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
  .what-title {
    font-size: 28px;
  }
  
  .what-describe {
    font-size: 16px;
    padding: 0 15px;
  }
  
  .continue-button {
    height: 70px;
    font-size: 22px;
  }
}
.continue-button:hover {
    background: #ffe066;
  }



  </style>
  