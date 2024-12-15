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
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25rem;
  text-align: left;
}
</style>
