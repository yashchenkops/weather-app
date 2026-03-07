<script setup></script>

<template>
  <div class="weather-block">
    <div class="top-row">
      <input type="text" placeholder="Enter city" />
      <button class="favorite-btn">☆ Add to favorites</button>
    </div>

    <div class="switch-row">
      <button>Day</button>
      <button>Week</button>
    </div>
    <div class="weather-content">Weather data will be here</div>
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
  margin-bottom: 10px;
}

.top-row input {
  flex: 1;
  margin-right: 10px;
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
