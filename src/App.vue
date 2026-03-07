<script setup>
import { ref } from 'vue';

import WeatherBlock from './components/WeatherBlock.vue';

const tab = ref('home');
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="logo">Weather app</h1>
      <nav class="tabs">
        <button @click="tab = 'home'" :class="{ active: tab === 'home' }">Home</button>
        <button @click="tab = 'favorites'" :class="{ active: tab === 'favorites' }">Favorites</button>
      </nav>
    </header>
    <main>
      <div v-if="tab === 'home'"><WeatherBlock /></div>
      <div v-if="tab === 'favorites'">Favorites page</div>
    </main>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
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

button {
  padding: 10px 15px;
  border: none;
  font-weight: 600;

  &:not(.active) {
    cursor: pointer;
  }
}

.active {
  background: black;
  color: white;
}
</style>
