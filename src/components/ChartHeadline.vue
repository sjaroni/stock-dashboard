<template>
  <div class="chartHeadline">
    {{ headlineTitle }}
  </div>
</template>

<script>
export default {
  props: {
    headlineTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.chartHeadline {
  font-size: 20px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
}
</style>
