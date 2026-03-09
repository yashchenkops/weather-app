<script setup>
import { ref, onMounted, watch } from 'vue';
import { getFavorites } from './utils/favorites';
import { getUserCity } from './api/ip';
import { messages } from './i18n';

import WeatherBlock from './components/WeatherBlock.vue';

const tab = ref('home');
const blocks = ref([1]);
const favoriteCities = ref([]);
const isDarkTheme = ref(false);
const lang = ref('en');

function addBlock() {
  if (blocks.value.length >= 5) return;
  blocks.value.push({
    id: Date.now(),
  });
  console.log(blocks.value);
}

function removeBlock(id) {
  if (blocks.value.length === 1) return alert('Must be at least one block!');
  blocks.value = blocks.value.filter((block) => block.id !== id);
}

function openFavorites() {
  tab.value = 'favorites';
  favoriteCities.value = getFavorites();
}

function applyTheme(value) {
  document.documentElement.classList.toggle('dark', value);
}

function t(key) {
  return messages[lang.value][key];
}

onMounted(async () => {
  try {
    const city = await getUserCity();
    blocks.value = [
      {
        id: Date.now(),
        city,
      },
    ];
  } catch {
    blocks.value = [
      {
        id: Date.now(),
        city: '',
      },
    ];
  }

  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    isDarkTheme.value = savedTheme === 'dark';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isDarkTheme.value = prefersDark;
  }

  applyTheme(isDarkTheme.value);
});

watch(isDarkTheme, (value) => {
  applyTheme(value);

  localStorage.setItem('theme', value ? 'dark' : '');
});
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header__top">
        <h1>Weather</h1>
        <div class="header__tabs">
          <select v-model="lang">
            <option value="en">EN</option>
            <option value="uk">UK</option>
          </select>
          <label class="switch">
            <input type="checkbox" v-model="isDarkTheme" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="header__actions">
        <nav class="header__tabs">
          <button @click="tab = 'home'" :class="{ active: tab === 'home' }">{{ t('home') }}</button>
          <button @click="openFavorites" :class="{ active: tab === 'favorites' }">{{ t('favorites') }}</button>
        </nav>
        <button v-if="tab === 'home'" class="add-btn" @click="addBlock">+</button>
      </div>
    </header>
    <main>
      <div v-if="tab === 'home'">
        <WeatherBlock
          v-for="block in blocks"
          :key="block.id"
          :initial-city="block.city"
          :lang="lang"
          :t="t"
          @delete="removeBlock(block.id)" />
      </div>
      <div v-if="tab === 'favorites'">
        <WeatherBlock v-for="city in favoriteCities" :key="city" :initial-city="city" :is-favorite-layout="true" :lang="lang" :t="t" />
      </div>
    </main>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  min-width: 360px;
}

.container.day {
  background: #f5f5f5;
  color: #000;
}

.container.night {
  background: #1e1e1e;
  color: #fff;
}

.container.night .weather-block {
  background: #2a2a2a;
  border-color: #444;
}

.container.night input {
  background: #333;
  color: white;
  border: 1px solid #555;
}

.header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__tabs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  text-align: center;
  margin-top: 0;
}

.tabs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.switch {
  position: relative;
  width: 3.5em;
  height: 2em;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f4f5;
  transition: 0.4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #303136;
}

input:checked + .slider::before {
  left: calc(100% - (1.4em + 0.3em));
  background: #303136;
  box-shadow:
    inset -3px -2px 5px -2px #8983f7,
    inset -10px -4px 0 0 #a3dafb;
}
</style>
