<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 30px;
  height: 30px;
  border: 4px solid #ddd;
  border-top: 4px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
