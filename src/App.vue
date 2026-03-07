<script setup>
import { ref } from 'vue';
import { getFavorites } from './utils/favorites';

import WeatherBlock from './components/WeatherBlock.vue';

const tab = ref('home');
const blocks = ref([1]);
const favoriteCities = ref([]);

function addBlock() {
  if (blocks.value.length >= 5) return;
  blocks.value.push(Date.now());
}

function removeBlock(id) {
  blocks.value = blocks.value.filter((b) => b !== id);
}

function openFavorites() {
  tab.value = 'favorites';
  favoriteCities.value = getFavorites();
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Weather</h1>
      <nav>
        <button @click="tab = 'home'" :class="{ active: tab === 'home' }">Home</button>
        <button @click="openFavorites" :class="{ active: tab === 'favorites' }">Favorites</button>
      </nav>
    </header>
    <main>
      <div v-if="tab === 'home'">
        <button class="add-btn" @click="addBlock">+</button>
        <WeatherBlock v-for="id in blocks" :key="id" @delete="removeBlock(id)" />
      </div>
      <div v-if="tab === 'favorites'">
        <WeatherBlock v-for="city in favoriteCities" :key="city" :initialCity="city" :noSearch="true" />
      </div>
    </main>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  font-weight: 600;

  &:not(.active) {
    cursor: pointer;
  }

  &.active {
    background: black;
    color: white;
  }
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
</style>
