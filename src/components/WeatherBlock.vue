<script setup>
import { ref, computed, onMounted } from 'vue';

import { getWeather, getForecast, searchCities } from '../api/weather';
import { getFavorites, toggleFavorite } from '../utils/favorites';
import { lang, t } from '../utils/i18n';

import WeatherChart from './WeatherChart.vue';
import ConfirmModal from './ConfirmModal.vue';
import Loader from './Loader.vue';

const props = defineProps({
  initialCity: String,
  isFavoriteLayout: Boolean,
  initialCity: String,
});

const emit = defineEmits(['delete']);

const city = ref('');
const weather = ref(null);
const loading = ref(false);
const error = ref(null);
const suggestions = ref([]);
const showSuggestions = ref(false);
const forecast = ref(null);
const mode = ref('day');
const favorites = ref(getFavorites());
const showModal = ref(false);

function selectCity(item) {
  city.value = item.name;

  suggestions.value = [];
  showSuggestions.value = false;

  loadWeather();
}

function onFavorite() {
  if (!weather.value) return;

  try {
    favorites.value = toggleFavorite(weather.value.name);
  } catch (e) {
    alert(e.message);
  }
}

function askDelete() {
  showModal.value = true;
}

function confirmDelete() {
  showModal.value = false;
  emit('delete');
}

function cancelDelete() {
  showModal.value = false;
}

async function loadWeather() {
  if (!city.value) return;

  loading.value = true;
  error.value = null;

  try {
    weather.value = await getWeather(city.value, props.lang);
    forecast.value = await getForecast(city.value, props.lang);
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

  return forecast.value.list.slice(0, 24).map((item) => {
    const date = new Date(item.dt_txt);
    return date.getHours() + ':00';
  });
});

const dayTemps = computed(() => {
  if (!forecast.value) return [];

  return forecast.value.list.slice(0, 24).map((item) => item.main.temp);
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

const isFavorite = computed(() => (weather.value ? favorites.value.includes(weather.value.name) : false));

onMounted(() => {
  if (props.initialCity) {
    city.value = props.initialCity;
    loadWeather();
  }
});
</script>

<template>
  <div class="weather-block">
    <div v-if="isFavoriteLayout" class="weather-block__top is-favorite-layout">
      <div class="switch-row">
        <button type="button" @click="mode = 'day'" :class="{ active: mode === 'day' }">{{ t('day') }}</button>
        <button type="button" @click="mode = 'week'" :class="{ active: mode === 'week' }">{{ t('week') }}</button>
      </div>
      <div class="top-row">
        <button type="button" class="favorite-btn" @click="onFavorite">
          {{ isFavorite ? t('favorite') : t('addToFavorites') }}
        </button>
      </div>
    </div>
    <div v-else class="weather-block__top">
      <div class="top-row">
        <div class="weather-block__search">
          <input class="search-input" v-model="city" type="text" :placeholder="t('search')" @input="search" @keyup.enter="loadWeather" />
          <ul v-if="showSuggestions && suggestions.length" class="suggestions">
            <li v-for="item in suggestions" :key="item.lat" @click="selectCity(item)">{{ item.name }}, {{ item.country }}</li>
          </ul>
        </div>
        <div class="weather-block__actions">
          <button type="button" class="favorite-btn" @click="onFavorite">
            {{ isFavorite ? t('favorite') : t('addToFavorites') }}
          </button>
          <button class="delete-btn" @click="askDelete">✕</button>
        </div>
      </div>

      <div v-if="weather" class="switch-row">
        <button type="button" @click="mode = 'day'" :class="{ active: mode === 'day' }">{{ t('day') }}</button>
        <button type="button" @click="mode = 'week'" :class="{ active: mode === 'week' }">{{ t('week') }}</button>
      </div>
    </div>
    <div class="weather-content">
      <Loader v-if="loading" />
      <div v-else-if="error">
        {{ error }}
      </div>
      <div v-else>
        <div v-if="weather">
          <h3>{{ weather.name }}</h3>
          <p>Temperature: {{ weather.main.temp }} °C</p>
          <p>{{ weather.weather[0].description }}</p>
        </div>
        <WeatherChart v-if="forecast" :key="mode" :labels="chartLabels" :temps="chartTemps" />
      </div>
    </div>
  </div>
  <ConfirmModal v-if="showModal" @confirm="confirmDelete" @cancel="cancelDelete" />
</template>

<style scoped>
.weather-block {
  background-color: var(--item-bg);
  border: 1px solid var(--border);
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 15px;
}

.is-favorite-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.top-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
}

.weather-block__search {
  display: flex;
  flex: 1;
  position: relative;

  .search-input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--text);
    border-radius: 5px;
  }

  .suggestions {
    list-style: none;
    background-color: var(--bg);
    border: 1px solid var(--border);
    margin-top: 5px;
    padding: 0;
    position: absolute;
    top: 32px;
    left: 0;
    width: 100%;

    li {
      padding: 6px;
      cursor: pointer;

      &:hover {
        background-color: var(--border);
      }
    }
  }
}

.weather-block__actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.favorite-btn {
  white-space: nowrap;
  margin-left: auto;

  @media (max-width: 500px) {
    margin-left: unset;
  }
}

.switch-row {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
</style>
