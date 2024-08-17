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
  /* background: #011F35; */
  box-sizing: border-box;
  background-color: gold;
  padding: 20px 24px;
  gap: 8px;
  border-radius: 16px;
  color: #FFFFFF;
  width: 173px;
  height: 143px;
}
</style>