<script setup>
import { lang, t } from '../utils/i18n';

const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>{{ t('modalConfirmText') }}</p>
      <div class="actions">
        <button @click="emit('confirm')">{{ t('modalConfirm') }}</button>
        <button @click="emit('cancel')">{{ t('modalCancel') }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
}

.modal {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  background: var(--bg);
  text-align: center;

  p {
    font-size: 20px;
  }
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>
