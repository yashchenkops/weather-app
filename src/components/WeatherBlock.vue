<script setup>
import { ref } from 'vue';
import { getWeather } from '../api/weather';

const emit = defineEmits(['delete']);

const city = ref('');
const weather = ref(null);
const loading = ref(false);
const error = ref(null);

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
</script>

<template>
  <div class="weather-block">
    <div class="top-row">
      <input v-model="city" type="text" placeholder="Enter city" @keyup.enter="loadWeather" />
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

.top-row input {
  flex: 1;
  padding: 6px;
}

.favorite-btn {
  white-space: nowrap;
}

.switch-row {
  margin-bottom: 15px;
}

.switch-row button {
  margin-right: 8px;
}

.weather-content {
  padding: 10px 0;
}
</style>
