<template>
  <div class="headLine">
    <div class="rectangle"></div>
    <div class="text">The Magnificent Seven Companies</div>
  </div>
</template>

<script>
export default {
  name: 'HeadLine',
};
</script>

<style scoped>
.headLine {
  position: absolute;
  left: 0;
  top: 64px;
  width: 714px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
}

.rectangle {
  width: 96px;
  height: 32px;
  gap: 0px;
  border-radius: 0px 100px 100px 0px;
  opacity: 0px;
  background: #39daff;
}

.text {
  font-weight: 500;
  font-size: 36px;
  line-height: 42.66px;
  color: #f9f9f9;
}
</style>
