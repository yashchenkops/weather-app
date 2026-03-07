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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 280px;
  text-align: center;
}

.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
