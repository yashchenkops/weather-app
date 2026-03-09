<script setup>
const emit = defineEmits(['confirm', 'cancel']);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <p>Are you sure you want to delete this block?</p>
      <div class="actions">
        <button @click="emit('confirm')">Confirm</button>
        <button @click="emit('cancel')">Cancel</button>
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
  width: 280px;
  padding: 20px;
  border-radius: 8px;
  background: var(--bg);
  text-align: center;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}
</style>
