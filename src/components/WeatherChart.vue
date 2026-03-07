<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  labels: Array,
  temps: Array,
});

const canvas = ref(null);

onMounted(() => {
  new Chart(canvas.value, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: 'Temperature °C',
          data: props.temps,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
});
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
