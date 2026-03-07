<script setup>
import { ref } from 'vue';

const tab = ref('home');
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="logo">Weather</h1>
      <nav class="tabs">
        <button @click="tab = 'home'" :class="{ active: tab === 'home' }">Home</button>
        <button @click="tab = 'favorites'" :class="{ active: tab === 'favorites' }">Favorites</button>
      </nav>
    </header>
    <main>
      <div v-if="tab === 'home'">Home page</div>
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

.tabs {
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    padding: 10px 15px;
    cursor: pointer;
    border: none;

  }
}

.active {
  background: black;
  color: white;
}
</style>
