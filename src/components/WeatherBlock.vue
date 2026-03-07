<script setup>
import { ref, computed } from 'vue';
import { getWeather, getForecast, searchCities } from '../api/weather';

import WeatherChart from './WeatherChart.vue';

const emit = defineEmits(['delete']);

const city = ref('');
const weather = ref(null);
const loading = ref(false);
const error = ref(null);
const suggestions = ref([]);
const showSuggestions = ref(false);
const forecast = ref(null);
const mode = ref('day');

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

    forecast.value = await getForecast(city.value);
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

const dayLabels = computed(() => {
  if (!forecast.value) return [];

  return forecast.value.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt_txt);
    return date.getHours() + ':00';
  });
});

const dayTemps = computed(() => {
  if (!forecast.value) return [];

  return forecast.value.list.slice(0, 8).map((item) => item.main.temp);
});

const weekLabels = computed(() => {
  if (!forecast.value) return [];

  const days = {};

  forecast.value.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(item.main.temp);
  });

  return Object.keys(days).slice(0, 5);
});

const weekTemps = computed(() => {
  if (!forecast.value) return [];

  const days = {};

  forecast.value.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(item.main.temp);
  });

  return Object.values(days)
    .slice(0, 5)
    .map((arr) => arr.reduce((a, b) => a + b, 0) / arr.length);
});

const chartLabels = computed(() => {
  return mode.value === 'day' ? dayLabels.value : weekLabels.value;
});

const chartTemps = computed(() => {
  return mode.value === 'day' ? dayTemps.value : weekTemps.value;
});
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
      <button @click="mode = 'day'" :class="{ active: mode === 'day' }">Day</button>
      <button @click="mode = 'week'" :class="{ active: mode === 'week' }">Week</button>
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
      <WeatherChart v-if="forecast" :key="mode" :labels="chartLabels" :temps="chartTemps" />
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
