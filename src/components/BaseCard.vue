<template>
  <div class="baseCard">
    <img :src="company.icon" alt="Company Icon" />
    <h1>{{ company.companyName }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedCompanyName() {
      return this.company.companyName.toUpperCase();
    }
  }
};
</script>

<style scoped>
.baseCard {
  background: #011f35;
  box-sizing: border-box;
  padding: 20px 24px;
  border-radius: 16px;
  color: #ffffff;
  width: 173px;
  min-width: 173px;
  max-width: 173px;
  height: 143px;
}
</style>
