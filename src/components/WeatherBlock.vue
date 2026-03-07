<script setup>
import { ref } from 'vue';
import { getWeather, searchCities } from '../api/weather';

const emit = defineEmits(['delete']);

const city = ref('');
const weather = ref(null);
const loading = ref(false);
const error = ref(null);
const suggestions = ref([]);
const showSuggestions = ref(false);

function selectCity(item) {
  city.value = item.name;

  suggestions.value = [];
  showSuggestions.value = false;

  loadWeather();
}

async function loadWeather() {
  if (!city.value) return;

  loading.value = true;
  error.value = null;

  try {
    weather.value = await getWeather(city.value);
  } catch (e) {
    error.value = 'City not found';
  }

  loading.value = false;
}

async function search() {
  if (city.value.length < 2) {
    suggestions.value = [];
    return;
  }

  const data = await searchCities(city.value);

  suggestions.value = data;
  showSuggestions.value = true;
}
</script>

<template>
  <div class="weather-block">
    <div class="top-row">
      <div class="weather-block__search">
        <input class="search-input" v-model="city" type="text" placeholder="Enter city" @input="search" @keyup.enter="loadWeather" />
        <ul v-if="showSuggestions && suggestions.length" class="suggestions">
          <li v-for="item in suggestions" :key="item.lat" @click="selectCity(item)">{{ item.name }}, {{ item.country }}</li>
        </ul>
      </div>
      <button class="favorite-btn">☆ Add to favorites</button>
      <button class="delete-btn" @click="emit('delete')">✕</button>
    </div>

    <div class="switch-row">
      <button>Day</button>
      <button>Week</button>
    </div>
    <div class="weather-content">
      <div v-if="loading">Loading...</div>

      <div v-if="error">
        {{ error }}
      </div>
      <div v-if="weather">
        <h3>{{ weather.name }}</h3>
        <p>Temperature: {{ weather.main.temp }} °C</p>
        <p>{{ weather.weather[0].description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-block {
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 8px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.weather-block__search {
  display: flex;
  flex: 1;
  position: relative;

  .search-input {
    flex: 1;
    padding: 6px;
  }

  .suggestions {
    list-style: none;
    border: 1px solid #ddd;
    margin-top: 5px;
    padding: 0;
    background: white;
    position: absolute;
    top: 32px;
    left: 0;
    width: 100%;
  }

  .suggestions li {
    padding: 6px;
    cursor: pointer;
  }

  .suggestions li:hover {
    background: #eee;
  }
}

.favorite-btn {
  white-space: nowrap;
}

.switch-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
</style>
