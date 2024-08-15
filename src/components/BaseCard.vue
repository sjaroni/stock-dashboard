<template>
  <div class="baseCard">
    <slot></slot> <!-- Hier wird der dynamische Inhalt eingefügt -->
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
};
</script>

<style scoped>
.baseCard {
  background: #011F35;  
  padding: 20px 32px;
  gap: 20px;
  border-radius: 16px 0px 0px 0px;
  opacity: 1;
}
</style>