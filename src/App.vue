<script setup>
import { ref, onMounted } from 'vue';
import { getFavorites } from './utils/favorites';
import { getUserCity } from './api/ip';

import WeatherBlock from './components/WeatherBlock.vue';

const tab = ref('home');
const blocks = ref([1]);
const favoriteCities = ref([]);

function addBlock() {
  if (blocks.value.length >= 5) return;
  blocks.value.push(Date.now());
}

function removeBlock(id) {
  blocks.value = blocks.value.filter((block) => block.id !== id);
}

function openFavorites() {
  tab.value = 'favorites';
  favoriteCities.value = getFavorites();
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
});
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Weather</h1>
      <div class="header__actions">
        <nav class="header__tabs">
          <button @click="tab = 'home'" :class="{ active: tab === 'home' }">Home</button>
          <button @click="openFavorites" :class="{ active: tab === 'favorites' }">Favorites</button>
        </nav>
        <button v-if="tab === 'home'" class="add-btn" @click="addBlock">+</button>
      </div>
    </header>
    <main>
      <div v-if="tab === 'home'">
        <WeatherBlock v-for="block in blocks" :key="block.id" :initial-city="block.city" @delete="removeBlock(block.id)" />
      </div>
      <div v-if="tab === 'favorites'">
        <WeatherBlock v-for="city in favoriteCities" :key="city" :initial-city="city" :is-favorite-layout="true" />
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

button {
  padding: 10px 15px;
  border: none;
  font-weight: 600;

  &:hover {
    background-color: rgb(211, 211, 211);
  }

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
