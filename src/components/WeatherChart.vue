<script setup>
import { ref, watch, onMounted } from 'vue';
import Chart from 'chart.js/auto';

import { lang, t } from '../utils/i18n';

const props = defineProps({
  labels: Array,
  temps: Array,
});

const canvas = ref(null);
let chart = null;

function renderChart() {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(canvas.value, {
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
}

onMounted(renderChart);

watch(() => [props.labels, props.temps], renderChart);
</script>

<template>
  <canvas ref="canvas"></canvas>
</template>
