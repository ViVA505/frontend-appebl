<template>
  <!-- Preload Screen -->
  <div v-if="isLoading" class="preload-screen">
    <div class="preload-content">
      <div class="spinner"></div>
      <div class="loading-text">ЗАГРУЗКА НОМИНАНТОВ...</div>
      <div class="loading-progress">{{ loadedImages }} / {{ totalImages }}</div>
    </div>
  </div>

  <!-- Основной контент -->
  <div v-else class="menu-wrapper">
    <!-- Основной фон -->
    <div class="main-background"></div>
    
    <!-- Overlay изображение поверх фона -->
    <div class="overlay-image"></div>
    
  
    <!-- Advertisement Modal -->
    <AdvertisementModal 
      v-if="showAdvertisement"
      @close="closeAdvertisement"
    />

    <!-- Модальное окно -->
    <NominationModal 
      v-if="showModal"
      :nomination="selectedNomination"
      :nominees="selectedNomination?.nominees || []"
      :userData="userData"
      :currentUserVote="getUserVote(selectedNomination?.title)"
      @close="showModal = false"
      @selected="handleSelection"
    />

    <ThankYouModal
      v-if="showThankYouModal"
      :selectedNomineeName="selectedNomineeName"
      :isRevote="isRevote"
      @close="showThankYouModal = false"
    />

    <!-- Кнопка скачивания для админов -->
    <button 
      v-if="isAdmin" 
      @click="downloadData" 
      class="admin-download-btn"
      :disabled="isDownloading"
    >
      <span v-if="isDownloading">ЗАГРУЗКА...</span>
      <span v-else>📥 Скачать данные</span>
    </button>

    <!-- Основной контейнер меню -->
    <div class="menu-container">
      <div class="row">
        <div 
          v-for="(item, index) in smallBoxes.slice(0, 3)" 
          :key="index" 
          class="menu-box small"
          :class="{ 'voted': hasUserVoted(item.title) }"
          @click="openNomination(item.title)"
          :style="getBoxBackground(item.title)"
        >
          <div class="box-content">
            <div class="box-text">{{ item.title }}</div>
            <span v-if="hasUserVoted(item.title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>

      <div class="row">
        <div 
          v-for="(item, index) in smallBoxes.slice(3, 6)" 
          :key="index" 
          class="menu-box small"
          :class="{ 'voted': hasUserVoted(item.title) }"
          @click="openNomination(item.title)"
          :style="getBoxBackground(item.title)"
        >
          <div class="box-content">
            <div class="box-text">{{ item.title }}</div>
            <span v-if="hasUserVoted(item.title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>
      
      <div class="row center">
        <div 
          class="menu-box large"
          :class="{ 'voted': hasUserVoted(bigBoxes[0].title) }"
          @click="openNomination(bigBoxes[0].title)"
          :style="getBoxBackground(bigBoxes[0].title)"
        >
          <div class="box-content">
            <div class="box-text">{{ bigBoxes[0].title }}</div>
            <span v-if="hasUserVoted(bigBoxes[0].title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>
      
      <!-- Четвертый ряд: 3 маленьких -->
      <div class="row">
        <div 
          v-for="(item, index) in smallBoxes.slice(6, 9)" 
          :key="index" 
          class="menu-box small"
          :class="{ 'voted': hasUserVoted(item.title) }"
          @click="openNomination(item.title)"
          :style="getBoxBackground(item.title)"
        >
          <div class="box-content">
            <div class="box-text">{{ item.title }}</div>
            <span v-if="hasUserVoted(item.title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>
      
      <!-- Пятый ряд: 3 маленьких -->
      <div class="row">
        <div 
          v-for="(item, index) in smallBoxes.slice(9, 12)" 
          :key="index" 
          class="menu-box small"
          :class="{ 'voted': hasUserVoted(item.title) }"
          @click="openNomination(item.title)"
          :style="getBoxBackground(item.title)"
        >
          <div class="box-content">
            <div class="box-text">{{ item.title }}</div>
            <span v-if="hasUserVoted(item.title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>
      
      <!-- Шестой ряд: вторая большая номинация -->
      <div class="row center">
        <div 
          class="menu-box large"
          :class="{ 'voted': hasUserVoted(bigBoxes[1].title) }"
          @click="openNomination(bigBoxes[1].title)"
          :style="getBoxBackground(bigBoxes[1].title)"
        >
          <div class="box-content">
            <div class="box-text">{{ bigBoxes[1].title }}</div>
            <span v-if="hasUserVoted(bigBoxes[1].title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>

      <!-- Седьмой ряд: 3 маленьких (дополнительные) -->
      <div class="row">
        <div 
          v-for="(item, index) in smallBoxes.slice(12, 15)" 
          :key="index" 
          class="menu-box small"
          :class="{ 'voted': hasUserVoted(item.title) }"
          @click="openNomination(item.title)"
          :style="getBoxBackground(item.title)"
        >
          <div class="box-content">
            <div class="box-text">{{ item.title }}</div>
            <span v-if="hasUserVoted(item.title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>
      
      <!-- Восьмой ряд: 3 маленьких (дополниные) -->
      <div class="row">
        <div 
          v-for="(item, index) in smallBoxes.slice(15,18)" 
          :key="index" 
          class="menu-box small"
          :class="{ 'voted': hasUserVoted(item.title) }"
          @click="openNomination(item.title)"
          :style="getBoxBackground(item.title)"
        >
          <div class="box-content">
            <div class="box-text">{{ item.title }}</div>
            <span v-if="hasUserVoted(item.title)" class="vote-indicator">✓</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Логотип -->
    <a href="https://t.me/nestint" target="_blank" class="logo-container">
      <div class="logo-circle">
        <img 
          src="@/assets/НЕ СТИНТ БЕЗ ФОНА 4.png" 
          alt="Logo"
          class="logo-image"
        />
      </div>
    </a>
  </div>
</template>

<script>
import NominationModal from '@/components/NominationModal.vue'
import ThankYouModal from '@/components/ThankYouModal.vue'
import AdvertisementModal from '@/components/AdvertisementModal.vue'

import BackgroundImage from '@/assets/background.png'
import OverlayImage from '@/assets/aad14439f637013041918f5bbca5f98a.png'

// обложки
import TrackObloshka from '@/assets/fotki/treck/stint_eto_ne_moi_vaib.jpg'    
import TrackObloshka1 from '@/assets/fotki/treck/mzlff_vo_dvore.jpg'
import TrackObloshka2 from '@/assets/fotki/treck/5m_xxl.jpeg'
import TrackObloshka3 from '@/assets/fotki/treck/b3brina_problema.jpg'
// треки
import Musictp from '@/assets/fotki/treck/stint_eto_ne_moi_vaib.mp3'
import Musicbtmzlff from '@/assets/fotki/treck/mzlff_vo_dvore.mp3'
import Musicbt5opka from '@/assets/fotki/treck//5opka_mellsher_xxl.mp3'
import Musicbtb3b  from '@/assets/fotki/treck/b3brina_problema.mp3'

// Номинанты
import Nominant_mzlff from '@/assets/nominants/mzlff.png'
import Nominant_stint from '@/assets/nominants/stint.png'
import Nominant_drake from '@/assets/nominants/drake.png'
import Nominant_t2x2 from '@/assets/nominants/t2x2.png'
import Nominant_5opka from '@/assets/fotki/eblan/5opka.png'
import Nominant_bratishkin from '@/assets/fotki/eblan/bratishkin.png'
import Nominant_mafanya from '@/assets/fotki/eblan/mafanya.png'
import Nominant_mellsher from '@/assets/fotki/eblan/mellsher.png'
import Nominant_b3brina from '@/assets/fotki/eblanka/b3brina.png'
import Nominant_nelya from '@/assets/fotki/eblanka/nelya.png'
import Nominant_priyatnogopoleta from '@/assets/fotki/eblanka/priyatnogopoleta.png'
import Nominant_sonasheka from '@/assets/fotki/eblanka/sonasheka.png'

// пара года
import Nominants_sonasheka_5opka from '@/assets/fotki/para/5opka_sonasheka.png'
import Nominants_mzlff_priyatnogopoleta from '@/assets/fotki/para/mzlff_priyatnogopoleta.png'
import Nominants_stint_nelya from '@/assets/fotki/para/stint_nelya.png'

// шип года
import Nominants_5opka_toxa from '@/assets/fotki/ship/5opka_toxa.png'
import Nominants_bratishkin_hesus from '@/assets/fotki/ship/bratishkin_hesus.png'
import Nominants_kusia_mafanya from '@/assets/fotki/ship/kusia_mafanya.png'
import Nominants_stint_hanov from '@/assets/fotki/ship/stint_hanov.png'
import Nominants_toxa_drake from '@/assets/fotki/ship/toxa_drake.png'

// Импортируем фоновые изображения для номинаций
import NominationBg1 from '@/assets/fon1.png'
import NominationBg2 from '@/assets/fon2.png'
import NominationBg3 from '@/assets/fon3.png'
import NominationBg4 from '@/assets/fon4.png'
import NominationBg5 from '@/assets/fon5.png'
import NominationBg6 from '@/assets/fon6.png'
import BigNominationBg1 from '@/assets/FON_EBLAN_EBLANKA_GODA.png'

// проект года
import Nominant_drakestrimhata from '@/assets/fotki/proekt/drakestrimahata.png'
import Nominant_eblanhata from '@/assets/fotki/proekt/eblanhata.png'
import Nominant_mafanya_diss_na_juri from '@/assets/fotki/proekt/mafanya_diss_na_juri.png'
import Nominant_strimahata_lida from '@/assets/fotki/proekt/strimahata_lida.png'
import Nominant_tyrma_stintaa from '@/assets/fotki/proekt/tyrma_stintaa.png'

// мерч года
import Nominant_merch_5opkai from '@/assets/fotki/merch/merch_5opkai.png'
import Nominant_merch_drake from '@/assets/fotki/merch/merch_drake.png'
import Nominant_merch_mellsher from '@/assets/fotki/merch/merch_mellsher.png'
import Nominant_merch_mzlff from '@/assets/fotki/merch/merch_mzlff.png'
import Nominant_merch_stinta from '@/assets/fotki/merch/merch_stinta.png'
import Nominant_merch_t2x2 from '@/assets/fotki/merch/merch_t2x2.png'

// модерский состав года
import Nominant_mod_drakeoffc from '@/assets/fotki/mod.sostav/drakeoffc.png'
import Nominant_mod_mzlff from '@/assets/fotki/mod.sostav/mzlff.png'
import Nominant_mod_stint from '@/assets/fotki/mod.sostav/stint.png'
import Nominant_mod_t2x2 from '@/assets/fotki/mod.sostav/t2x2.png'

// питомец года
import Nominant_pitomec_hanov from '@/assets/fotki/pitomec/hanov.png'
import Nominant_pitomec_laki from '@/assets/fotki/pitomec/laki.png'
import Nominant_pitomec_misa from '@/assets/fotki/pitomec/misa.png'
import Nominant_pitomec_nagets from '@/assets/fotki/pitomec/nagets.png'
import Nominant_pitomec_zavertin from '@/assets/fotki/pitomec/zavertin.png'

// игра года
import Nominant_liars_bar from '@/assets/fotki/igra/liars_bar.png' 
import Nominant_minecraft from '@/assets/fotki/igra/minecraft.png' 
import Nominant_no_im_not_a_humman_ from '@/assets/fotki/igra/no_im_not_a_humman_.png' 
import Nominant_peak from '@/assets/fotki/igra/peak.png' 
import Nominant_roblox from '@/assets/fotki/igra/roblox.png' 
import Nominant_schedule_1 from '@/assets/fotki/igra/schedule_1.png' 
import Nominant_repo from '@/assets/fotki/igra/repo.png' 

// фейл года
import Nominant_mistik_travma from '@/assets/fotki/feil/mistik_travma.png' 
import Nominant_stint_fpi from '@/assets/fotki/feil/stint_fpi.png' 
import Nominant_stint_nelya_biletyi from '@/assets/fotki/feil/stint_nelya_biletyi.png' 

// конфликт года
import Nominant_bratishkin_hesus from '@/assets/fotki/conflict/bratishkin_hesus.png' 
import Nominant_buster_stint from '@/assets/fotki/conflict/buster_stint.png' 
import Nominant_stint_olesha from '@/assets/fotki/conflict/stint_olesha.png' 

// гта стример года
import Nominant_maxim_shabanov from '@/assets/fotki/gta strimer/maxim_shabanov.png'
import Nominant_stint_gta from '@/assets/fotki/gta strimer/stintik.png'

// перформанс года
import Nominant_eblan_squad_lisi from '@/assets/fotki/performanc/eblan_squad_lisi.png' 
import Nominant_faera_mzlff from '@/assets/fotki/performanc/faera_mzlff.png' 
import Nominant_jmi_sher_10_min from '@/assets/fotki/performanc/jmi_sher_10_min.png' 
import Nominant_sapsan from '@/assets/fotki/performanc/sapsan.png' 
import Nominant_supershow from '@/assets/fotki/performanc/supershow.png' 
import Nominant_toxa_sbril_borody from '@/assets/fotki/performanc/toxa_sbril_borody.png' 

// косплей года
import Nominant_drakeoffc_mim from '@/assets/fotki/cosplay/drakeoffc_mim.png' 
import Nominant_mellsher_kraatos from '@/assets/fotki/cosplay/mellsher_kraatos.png' 
import Nominant_nelya_ray_ciri from '@/assets/fotki/cosplay/nelya_ray_ciri.png' 

// оценка года
import Nominant_1 from '@/assets/fotki/ocenka/1.png'
import Nominant_2 from '@/assets/fotki/ocenka/2.png'
import Nominant_3 from '@/assets/fotki/ocenka/3.png'
import Nominant_4 from '@/assets/fotki/ocenka/4.png'
import Nominant_5 from '@/assets/fotki/ocenka/5.png'
import Nominant_6 from '@/assets/fotki/ocenka/6.png'
import Nominant_7 from '@/assets/fotki/ocenka/7.png'
import Nominant_8 from '@/assets/fotki/ocenka/8.png'
import Nominant_9 from '@/assets/fotki/ocenka/9.png'
import Nominant_10 from '@/assets/fotki/ocenka/10.png'

export default {
  components: {
    AdvertisementModal,
    NominationModal,
    ThankYouModal
  },
  data() {
    return {
      isLoading: true,
      loadedImages: 0,
      totalImages: 0,
      showModal: false,
      showAdvertisement: false,
      selectedNomination: null,
      showThankYouModal: false,
      selectedNomineeName: '',
      userData: null,
      userVotes: {},
      isVoting: false,
      isRevote: false,
      isAdmin: false,
      isDownloading: false,
      smallBoxes: [
        { title: 'ПАРА ГОДА' }, { title: 'ШИП ГОДА' }, { title: 'ЕБЛАН-МЕМ ГОДА' },
        { title: 'БАН ГОДА' }, { title: 'ПРОЕКТ ГОДА' }, { title: 'АЛКАШ ГОДА' },
        { title: 'МЕРЧ ГОДА' }, { title: 'МОД. СОСТАВ ГОДА' }, { title: 'ТРЕК ГОДА' },
        { title: 'ДОМАШНИЙ ПИТОМЕЦ ГОДА' }, { title: 'ИГРА ГОДА' }, { title: 'ФЕЙЛ ГОДА' },
        { title: 'КОНФЛИКТ ГОДА' }, { title: 'ГТА СТРИМЕР ГОДА' }, { title: 'ПЕРФОРМАНС ГОДА' },
        { title: 'КОСПЛЕЙ ГОДА' }, { title: 'АФК ГОДА' }, { title: 'ОЦЕНКА ГОДА' }
      ],
      bigBoxes: [
        { title: 'ЕБЛАН ГОДА' },
        { title: 'ЕБЛАНКА ГОДА' }
      ],
      // Объект с фонами для каждой номинации
      nominationBackgrounds: {
        // Маленькие номинации - распределяем фоны по порядку
        'ПАРА ГОДА': NominationBg1,
        'ШИП ГОДА': NominationBg2,
        'ЕБЛАН-МЕМ ГОДА': NominationBg3,
        'БАН ГОДА': NominationBg4,
        'ПРОЕКТ ГОДА': NominationBg5,
        'АЛКАШ ГОДА': NominationBg6,
        'МЕРЧ ГОДА': NominationBg1,
        'МОД. СОСТАВ ГОДА': NominationBg2,
        'ТРЕК ГОДА': NominationBg3,
        'ДОМАШНИЙ ПИТОМЕЦ ГОДА': NominationBg4,
        'ИГРА ГОДА': NominationBg5,
        'ФЕЙЛ ГОДА': NominationBg6,
        'КОНФЛИКТ ГОДА': NominationBg1,
        'ГТА СТРИМЕР ГОДА': NominationBg2,
        'ПЕРФОРМАНС ГОДА': NominationBg3,
        'КОСПЛЕЙ ГОДА': NominationBg4,
        'АФК ГОДА': NominationBg5,
        'ОЦЕНКА ГОДА': NominationBg6,
        
        // Большие номинации - используем специальный фон
        'ЕБЛАНКА ГОДА': BigNominationBg1, 
        'ЕБЛАН ГОДА': BigNominationBg1,
      },
      nominationsData: {
        'ПАРА ГОДА': {
          title: 'ПАРА ГОДА',
          description: 'Главная пара этого года',
          nominees: [
            { 
              name: 'СОНЕЧКА & ПЯТЕРКА', 
              image: Nominants_sonasheka_5opka 
            },
            { 
              name: 'МАЗЕЛЛОВ & КСЮША', 
              image: Nominants_mzlff_priyatnogopoleta
            },
            { 
              name: 'СТИНТ & НЕЛЯ', 
              image: Nominants_stint_nelya
            },
          ]        
        },
        'ШИП ГОДА': {
          title: 'ШИП ГОДА',
          description: 'Какой шип этого года вам запомнился больше всего?',
          nominees: [
            { 
              name: 'БРАТИШКИН & ХЕСУС', 
              image: Nominants_bratishkin_hesus
            },
            { 
              name: 'СТИНТ & ХАНОВ', 
              image: Nominants_stint_hanov
            },
            { 
              name: 'КАША & МАФАНЯ', 
              image: Nominants_kusia_mafanya
            },
            { 
              name: 'TОХА & ДРЕЙК', 
              image: Nominants_toxa_drake
            },

          ]        
        },
        'ЕБЛАН-МЕМ ГОДА': {
          title: 'ЕБЛАН-МЕМ ГОДА',
          description: 'Мемные ебл#н этого года',
          nominees: [
            { 
              name: 'TОХА', 
              image: Nominant_t2x2
            },
            { 
              name: 'ПЯТЕРКА', 
              image: Nominant_5opka
            },
            {
              name: "МАФАНЯ",  
              image: Nominant_mafanya
            }
          ]        
        },
        'БАН ГОДА': {
          title: 'БАН ГОДА',
          description: 'Самый жесткий бан этого года',
          nominees: [
            { 
              name: '9 БЛОКИРОВОК ЗА ГОД', 
              image: Nominant_mafanya 
            },
            { 
              name: '4 БЛОКИРОВКИ ЗА ГОД', 
              image: Nominant_5opka 
            },
            {
              name: "1 БЛОКИРОВКА ЗА ГОД",  
              image: Nominant_t2x2
            },
            {
              name: "1 БЛОКИРОВКА ЗА ГОД",  
              image: Nominant_priyatnogopoleta
            }
          ]        
        },
        'ПРОЕКТ ГОДА': {
          title: 'ПРОЕКТ ГОДА',
          description: 'Проект, который запомнился вам больше всего',
          nominees: [
            { 
              name: 'ЕБЛАН-ХАТА 2', 
              image: Nominant_eblanhata
            },
            { 
              name: 'CТРИМХАТА ДРЕЙКА', 
              image: Nominant_drakestrimhata
            },
           
            { 
              name: 'СТРИМХАТА ЛИДЫ', 
              image: Nominant_strimahata_lida
            },
            { 
              name: 'ТЮРЬМА СТИНТА', 
              image: Nominant_tyrma_stintaa
            },
            { 
              name: 'ДИСС НА ЖЮРИ МАФАНИ', 
              image: Nominant_mafanya_diss_na_juri
            }
          ]        
        },
        'АЛКАШ ГОДА': {
          title: 'АЛКАШ ГОДА',
          description: 'За год выпил столько, что запомнился всем',
          nominees: [
            { 
              name: 'СТИНТ', 
              image: Nominant_stint
            },
            { 
              name: 'МАЗЕЛЛОВ', 
              image: Nominant_mzlff
            },
            { 
              name: 'ДРЕЙК', 
              image: Nominant_drake
            },
            {
              name: "TОХА",  
              image: Nominant_t2x2
            },
          ]        
        },
        'МЕРЧ ГОДА': {
          title: 'МЕРЧ ГОДА',
          description: 'Мерч, который гордо носили в этом году',
          nominees: [
            { 
              name: 'МЕРЧ СТИНТА', 
              image: Nominant_merch_stinta
            },
            { 
              name: 'МЕРЧ МАЗЕЛЛОВА', 
              image: Nominant_merch_mzlff
            },
            {
              name: 'МЕРЧ ДРЕЙКА',  
              image: Nominant_merch_drake
            },
             {
              name: 'МЕРЧ ТОХИ',  
              image: Nominant_merch_t2x2
            },
            {
              name: 'МЕРЧ ПЯТЁРКИ',  
              image: Nominant_merch_5opkai
            },
            {
              name: 'МЕРЧ МЕЛЛШЕРА',  
              image: Nominant_merch_mellsher
            },
           
          ]        
        },
        'МОД. СОСТАВ ГОДА': {
          title: 'МОД. СОСТАВ ГОДА',
          description: 'Самый эффективный и трудоголический модерский состав этого года',
          nominees: [
            { 
              name: 'МОД.СОСТАВ СТИНТА', 
              image: Nominant_mod_stint
            },
            { 
              name: 'МОД.СОСТАВ МАЗЕЛЛОВА', 
              image: Nominant_mod_mzlff
            },
            {
              name: 'МОД.СОСТАВ ДРЕЙКА',  
              image: Nominant_mod_drakeoffc
            },
             {
              name: 'МОД.СОСТАВ ТОХИ',  
              image: Nominant_mod_t2x2
            }
          ]        
        },
        'ТРЕК ГОДА': {
          title: 'ТРЕК ГОДА',
          description: 'Выберите лучший трек года',
          nominees: [
            { 
              name: 'СТИНТ - ЭТО НЕ МОЙ ВАЙБ', 
              image: TrackObloshka,
              audioUrl: Musictp
            },
            { 
              name: 'MZLFF - ВО ДВОРЕ', 
              image: TrackObloshka1,
              audioUrl: Musicbtmzlff
            },
            { 
              name: '5OPKA, MELLSHER - XXL', 
              image: TrackObloshka2,
              audioUrl: Musicbt5opka
            },
            { 
              name: 'B3BRINA - ПРОБЛЕМА', 
              image: TrackObloshka3,
              audioUrl: Musicbtb3b
            },
          ]        
        },
        'ДОМАШНИЙ ПИТОМЕЦ ГОДА': {
          title: 'ДОМАШНИЙ ПИТОМЕЦ ГОДА',
          description: 'Питомец, который покорил ваши сердца за этот год',
          nominees: [
            { 
              name: 'НАГЕТС', 
              image: Nominant_pitomec_nagets
            },
            { 
              name: 'ЛАКИ', 
              image: Nominant_pitomec_laki
            },
            { 
              name: 'ЗАВЕРТИН', 
              image: Nominant_pitomec_zavertin
            },
            { 
              name: 'МИСА', 
              image: Nominant_pitomec_misa
            },
            { 
              name: 'ХАНОВ', 
              image: Nominant_pitomec_hanov
            }
           
          ]        
        },

        'ИГРА ГОДА': {
          title: 'ИГРА ГОДА',
          description: 'Игра, которая дала больше контента в этом году',
          nominees: [
            { 
              name: 'Schedule I', 
              image: Nominant_schedule_1
            },
            { 
              name: "Liar's Bar", 
              image: Nominant_liars_bar
            },
            { 
              name: 'No Im Not A Human ', 
              image: Nominant_no_im_not_a_humman_
            },
            { 
              name: 'Minecraft', 
              image: Nominant_minecraft
            },
            { 
              name: 'PEAK', 
              image: Nominant_peak
            },
            {
              name: 'R.E.P.O.', 
              image: Nominant_repo
            },
            { 
              name: 'Roblox', 
              image: Nominant_roblox
            }
           
          ]        
        },
        'ФЕЙЛ ГОДА': {
          title: 'ФЕЙЛ ГОДА',
          description: 'Самый фейл фэйл этого года',
          nominees: [
            { 
              name: 'СТИНТ КУПИЛ FPI на 1.000.000', 
              image: Nominant_stint_fpi 
            },
            { 
              name: 'СТИНТ И НЕЛЯ КУПИЛИ БИЛЕТЫ НЕ НА ТУ ДАТУ', 
              image: Nominant_stint_nelya_biletyi
            },
            {
              name: "МИСТИК В С Ё НА ФУТБОЛЕ",  
              image: Nominant_mistik_travma
            }
          ]        
        },
        'КОНФЛИКТ ГОДА': {
          title: 'КОНФЛИКТ ГОДА',
          description: 'Cамый громкий конфликт этого года',
          nominees: [
            { 
              name: 'СТИНТ vs OLESHA', 
              image: Nominant_stint_olesha
            },
            { 
              name: 'БРАТИШКИН vs ХЕСУС', 
              image: Nominant_bratishkin_hesus
            },
            {
              name: 'СТИНТ vs БУСТЕР',  
              image: Nominant_buster_stint
            }
          ]        
        },
        'ГТА СТРИМЕР ГОДА': {
          title: 'ГТА СТРИМЕР ГОДА',
          description: 'Cамый топовый и активный ГТА стример этого года',
          nominees: [
            { 
              name: 'СТИНТ', 
              image: Nominant_stint_gta
            },
            { 
              name: 'STINTIK', 
              image: Nominant_stint 
            },
            {
              name: 'МАКСИМ ШАБАНОВ',  
              image: Nominant_maxim_shabanov
            },

          ]        
        },
        'ПЕРФОРМАНС ГОДА': {
          title: 'ПЕРФОРМАНС ГОДА',
          description: 'Самый запоминающийся перфоманс этого года',
          nominees: [
            { 
              name: 'ЖМИ SHARE 10 МИНУТ', 
              image: Nominant_jmi_sher_10_min
            },
            { 
              name: 'СУПЕР ПУПЕР ШОУ', 
              image: Nominant_supershow
            },
            {
              name: '4-Х ЧАСОВОЙ ТРЕК SAPSAN',  
              image: Nominant_sapsan
            },
            {
              name: 'ЕБЛАНСКВАД ЛЫСЫЙ',  
              image: Nominant_eblan_squad_lisi
            },
            {
              name: 'ТОХА СБРИЛ БОРОДУ',  
              image: Nominant_toxa_sbril_borody
            },
            {
              name: 'РЕКОРД ФАЕРОВ НА КОНЦЕРТЕ МАЗЕЛЛОВА',  
              image: Nominant_faera_mzlff
            }
             
            
          ]        
        },
        'КОСПЛЕЙ ГОДА': {
          title: 'КОСПЛЕЙ ГОДА',
          description: 'Лучший косплей этого года',
          nominees: [
            { 
              name: 'НЕЛЯ - ЦИРИ', 
              image: Nominant_nelya_ray_ciri
            },
            { 
              name: 'МЕЛЛШЕР - КРАТОС', 
              image: Nominant_mellsher_kraatos 
            },
            {
              name: 'ДРЕЙК - МИМ',  
              image: Nominant_drakeoffc_mim
            }
          ]        
        },
        'АФК ГОДА': {
          title: 'АФК ГОДА',
          description: 'За этого бро может стримить даже стул и ниче не изменится',
          nominees: [
            { 
              name: 'МАЗЕЛЛОВ', 
              image: Nominant_mzlff
            },
            { 
              name: 'ТОХА', 
              image: Nominant_t2x2
            },
            {
              name: 'МЕЛЛШЕР',  
              image: Nominant_mellsher

            },
            {
              name: 'БРАТИШКИН',  
              image: Nominant_bratishkin
            }
          ]        
        },
        'ОЦЕНКА ГОДА': {
          title: 'ОЦЕНка ГОДА',
          description: 'На какую оценку вы бы оценили этот год?',
          nominees: [
            { 
              name: '1',     
              image: Nominant_1
            },
            { 
              name: '2', 
              image: Nominant_2
            },
            {
              name: '3',  
              image: Nominant_3
            },
            {
              name: '4',  
              image: Nominant_4
            },
            {
              name: '5',  
              image: Nominant_5
            },
            {
              name: '6',  
              image: Nominant_6
            },
            {
              name: '7',  
              image: Nominant_7
            },
            {
              name: '8',  
              image: Nominant_8
            },
            {
              name: '9',  
              image: Nominant_9
            },
            {
              name: '10',  
              image: Nominant_10
            },
          ]        
        },
        'ЕБЛАНКА ГОДА': {
          title: 'ЕБЛАНКА ГОДА',
          description: 'Главная ебл#нка этого года',
          nominees: [
            { 
              name: 'БЕБРИНА', 
              image: Nominant_b3brina 
            },
            { 
              name: 'НЕЛЯ', 
              image: Nominant_nelya
            },
            { 
              name: 'КСЮША', 
              image: Nominant_priyatnogopoleta
            },
            { 
              name: 'СОНЕЧКА', 
              image: Nominant_sonasheka
            },
          ]        
        },
        'ЕБЛАН ГОДА': {
          title: 'ЕБЛАН ГОДА',
          description: 'Главные ебл#ны этого года',
          nominees: [
            { 
              name: 'МАЗЕЛЛОВ', 
              image: Nominant_mzlff 
            },
            { 
              name: 'СТИНТ', 
              image: Nominant_stint
            },
            { 
              name: 'ДРЕЙК', 
              image: Nominant_drake
            },
            { 
              name: 'TОХА', 
              image: Nominant_t2x2
            },
            { 
              name: 'ПЯТЕРКА', 
              image: Nominant_5opka
            },
            { 
              name: 'БРАТИШКИН', 
              image: Nominant_bratishkin
            },
            { 
              name: 'MАФАНЯ', 
              image: Nominant_mafanya
            },
            { 
              name: 'МЕЛЛШЕР', 
              image: Nominant_mellsher
            },
          ]        
        },
      }
    }
  },
  async mounted() {
    // Сначала предзагружаем все изображения
    await this.preloadAllImages();
    
    // Затем инициализируем приложение
    this.initTelegramWebApp();
  },
  methods: {
    // Метод для предзагрузки всех изображений
    async preloadAllImages() {
      // Собираем все уникальные URL изображений из nominationsData
      const imageUrls = new Set();
      
      // Добавляем фоновые изображения
      Object.values(this.nominationBackgrounds).forEach(url => {
        imageUrls.add(url);
      });
      
      // Добавляем изображения номинантов
      Object.values(this.nominationsData).forEach(nomination => {
        nomination.nominees.forEach(nominee => {
          if (nominee.image) {
            imageUrls.add(nominee.image);
          }
        });
      });
      
      this.totalImages = imageUrls.size;
      this.loadedImages = 0;
      
      if (this.totalImages === 0) {
        this.isLoading = false;
        return;
      }
      
      const loadPromises = Array.from(imageUrls).map(url => 
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            this.loadedImages++;
            resolve();
          };
          img.onerror = () => {
            this.loadedImages++;
            resolve(); // Продолжаем даже если какое-то изображение не загрузилось
          };
          img.src = url;
        })
      );
      
      await Promise.all(loadPromises);
      this.isLoading = false;
    },

    // Метод для получения фона номинации
    getBoxBackground(nominationTitle) {
      const backgroundImage = this.nominationBackgrounds[nominationTitle];
      if (backgroundImage) {
        return {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      }
      return {
        background: 'rgb(255, 253, 253)'
      };
    },

    initTelegramWebApp() {
      if (window.Telegram?.WebApp) {
        console.log("Обнаружен Telegram WebApp");
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();

        const tg_user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (tg_user) {
          this.userData = tg_user;
          console.log("Данные пользователя:", this.userData);
          
          this.registerUser().then((result) => {
            if (result && result.isNewUser) {
              this.showAdvertisement = true;
            }
            this.fetchUserVotes();
            this.checkAdminRights();
          });
        } else {
          const errorMsg = "Данные пользователя не найдены в initDataUnsafe. Убедитесь, что WebApp запущен через Telegram.";
          console.error(errorMsg);
          alert(errorMsg);
        }
      } else {
        const errorMsg = "Telegram WebApp не обнаружен. Запустите приложение через Telegram.";
        console.error(errorMsg);
        alert(errorMsg);
      }
    },

    async registerUser() {
      try {
        if (!this.userData) {
          const errorMsg = 'Нет данных пользователя для регистрации';
          alert(errorMsg);
          console.error(errorMsg);
          return { isNewUser: false };
        }

        const userData = {
          telegram_id: this.userData.id,
          username: this.userData.username || `${this.userData.first_name}_${this.userData.last_name || ''}`.trim(),
          first_name: this.userData.first_name || '',
          last_name: this.userData.last_name || '',
        };

        console.log('Отправка данных на регистрацию:', userData);

        const apiUrl = 'https://eblannaawardssssss.ru/register-user';

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        console.log('Ответ получен, статус:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Регистрация пользователя:', data);
          return { 
            success: true, 
            isNewUser: data.is_new_user || false 
          };
        } else {
          const errorText = await response.text();
          console.error('Ошибка при регистрации (статус):', response.status, errorText);
          alert('Ошибка при регистрации: ' + response.status + ' ' + errorText);
          return { success: false, isNewUser: false };
        }
      } catch (error) {
        console.error('Произошла сетевая ошибка или сервер недоступен:', error);
        alert('Сетевая ошибка: ' + error.message);
        return { success: false, isNewUser: false };
      }
    },

    closeAdvertisement() {
      this.showAdvertisement = false;
    },

    async fetchUserVotes() {
      if (!this.userData || !this.userData.id) {
        console.log("Нет данных пользователя для загрузки голосов");
        return;
      }
      
      try {
        const response = await fetch(`https://eblannaawardssssss.ru/user-votes/${this.userData.id}`);
        if (response.ok) {
          this.userVotes = await response.json();
          console.log("Голоса пользователя:", this.userVotes);
        } else {
          console.error("Ошибка при загрузке голосов пользователя");
        }
      } catch (error) {
        console.error("Ошибка при загрузке голосов:", error);
      }
    },
    
    async checkAdminRights() {
      if (!this.userData?.id) return;
      
      try {
        const response = await fetch(`https://eblannaawardssssss.ru/admin/check?telegram_id=${this.userData.id}`);
        if (response.ok) {
          const data = await response.json();
          this.isAdmin = data.is_admin;
          console.log("Права администратора:", this.isAdmin);
        }
      } catch (error) {
        console.error("Ошибка при проверке прав администратора:", error);
      }
    },
    
    async downloadData() {
      if (!this.isAdmin || this.isDownloading) return;
      
      this.isDownloading = true;
      
      try {
        const response = await fetch('https://eblannaawardssssss.ru/admin/download-data', {
          method: 'GET',
          headers: {
            'X-Telegram-ID': this.userData.id.toString()
          }
        });
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'voting_data.zip';
        
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
      } catch (error) {
        console.error('Ошибка при скачивании данных:', error);
        alert('Ошибка при скачивании данных: ' + error.message);
      } finally {
        this.isDownloading = false;
      }
    },
    
    hasUserVoted(nominationTitle) {
      return this.userVotes.hasOwnProperty(nominationTitle);
    },
    
    getUserVote(nominationTitle) {
      return this.userVotes[nominationTitle] || '';
    },
  
    openNomination(title) {
      console.log('Opening:', title)
      this.selectedNomination = this.nominationsData[title] || {
        title: title,
        nominees: []
      }
      this.showModal = true
    },
    
    async handleSelection(nominee) {
      if (!this.userData) {
        alert("Для голосования необходимо авторизоваться через Telegram");
        return;
      }
      
      if (this.isVoting) {
        console.log('Голосование уже в процессе...');
        return;
      }
      
      this.isVoting = true;
      
      try {
        // Определяем, является ли это переголосованием
        this.isRevote = this.hasUserVoted(this.selectedNomination.title);
        
        // Обновляем локальное состояние пользовательских голосов
        const newValue = nominee.name;
        
        this.userVotes = {
          ...this.userVotes,
          [this.selectedNomination.title]: newValue
        };
        
        // Закрываем модальное окно номинации и показываем благодарность
        this.showModal = false;
        this.selectedNomineeName = nominee.name;
        this.showThankYouModal = true;
        
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при голосовании');
      } finally {
        this.isVoting = false;
      }
    }
  }
}
</script>

<style scoped>
/* Стили для экрана предзагрузки */
.preload-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: white;
  font-family: 'Giga Sans', sans-serif;
}

.preload-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #FFD043;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 18px;
  font-weight: bold;
  color: #FFD043;
}

.loading-progress {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.menu-box {
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 850;
  font-family: 'Giga Sans', sans-serif;
  color: rgb(0, 0, 0);
  box-shadow: -1px 5px 12px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  box-sizing: border-box;
  margin: 4px;
  overflow: hidden;
}

/* Эффект при наведении */
.menu-box:hover {
  transform: scale(1.05);
}

/* Стиль для номинаций, в которых пользователь уже голосовал */
.menu-box.voted {
  border: 2px solid #4CAF50;
}

/* Контент бокса */
.box-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Текст бокса с улучшенной читаемостью */
.box-text {
  background: rgba(255, 255, 255, 0.7);
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 850;
  font-size: smaller;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
 
}

/* Индикатор голосования */
.vote-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  z-index: 3;
}

.menu-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  touch-action: pan-y;
}

.main-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png') no-repeat center center/cover;
  z-index: 0;
}

.overlay-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/aad14439f637013041918f5bbca5f98a.png') no-repeat center center/cover;
  z-index: 1;
  opacity: 0.4;
  background-attachment: fixed;
}



.menu-container {
  position: relative;
  z-index: 3;
  padding: 80px 20px 200px;
  min-height: calc(100vh + 500px);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100vw;
  overflow-x: hidden;
}

.row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
  flex-wrap: wrap;
  max-width: 100%;
}

.center {
  justify-content: center;
}

.small {
  width: 98px;
  height: 98px;
  font-size: 15px;
  font-weight: 850;
  border-radius: 22px;
  font-family: 'Giga Sans', sans-serif;
  text-align: center;
  box-shadow: 
    0px 4px 4px rgba(0, 0, 0, 0.25),
    inset 0px 4px 4px rgba(255, 255, 255, 0.25);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.large {
  width: 400px;
  height: 200px;
  border-radius: 25px;
  font-family: 'Giga Sans', sans-serif;
  box-shadow: 
    0px 6px 8px rgba(0, 0, 0, 0.3),
    inset 0px 4px 4px rgba(255, 255, 255, 0.3);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.logo-container {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-decoration: none;
}

.logo-container:hover {
  transform: translateX(-50%) scale(1.1);
}

.logo-container:active {
  transform: translateX(-50%) scale(0.95);
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Стили для кнопки админа */
.admin-download-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 5;
  background: linear-gradient(135deg, #FFD043 0%, #FFB400 100%);
  color: #000;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
}

.admin-download-btn:hover:not(:disabled) {
  transform: scale(1.05);
}

.admin-download-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>