<template>
  <div class="baseCard">
    <div class="company">
      <img :src="company.icon" alt="Company Icon" />
      <h2>{{ company.companyName }}</h2>
    </div>      
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
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.company{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  img{
    height: 24px;
    width: 24px;
  }

  h2{
    margin-block-start: 0;
    margin-block-end: 0;
  }

}

</style>
