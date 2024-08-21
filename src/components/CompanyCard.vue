<template>
  <div class="companyCard">
    <div class="company">
      <div class="logo">
        <img :src="company.icon" alt="Company Icon" />
      </div>
      <h2>{{ company.companyName }}</h2>
    </div>
    <div class="revenue">
      <div class="text">Revenue Q1 2024</div>
      <div class="currentValues">
        <div class="revenueValue">38.52</div>
        <div class="right">
          <div class="top">
            <div class="fluctuation">+1.06</div>
            <div class="icon">&#8593;</div>
          </div>
          <div class="bottom">
            <div class="percentage">2.83</div>
            <div class="icon">%</div>
          </div>
        </div>
      </div>
      <div class="currency">In Bill USD</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedCompanyName() {
      return this.company.companyName.toUpperCase();
    },
  },
};
</script>

<!-- Arrow Up &#8593;
Arrow Down &#8595; -->

<style scoped>
.companyCard {
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

.company {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    width: 24px;
  }

  h2 {
    margin-block-start: 0;
    margin-block-end: 0;
    font-family: Rubik;
    font-size: 20px;
    font-weight: 500;
    line-height: 23.7px;
    text-align: left;
  }
}

.revenue {
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: flex-start;

  .text {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.22px;
    text-align: left;
  }

  .currentValues {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;    
    width: 100%;
    height: 40px;

    .revenueValue {
      font-size: 24px;
      font-weight: 500;
      line-height: 28.44px;
      text-align: left;
    }

    .right {
      font-family: Rubik;
      font-size: 13px;
      font-weight: 500;
      line-height: 15.41px;
      text-align: left;
      color: #3ba752;
      width: 54px;
    }
    .top,
    .bottom {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .fluctuation,
    .percentage {
      text-align: right;
    }

    .icon {
      width: 20px;
      text-align: center;
    }
  }

  .currency {
    font-size: 8px;
    font-weight: 400;
    line-height: 9.48px;
    text-align: left;
  }
}
</style>
