<template>
  <div class="headLine">
    <div class="rectangle"></div>
    <div class="text">
      The Magnificent Seven Companies
      <div class="info">
        <img
          @click="toggleInfoBox"
          src="../assets/icons/info.svg"
          alt="Info Icon"
        />
      </div>
    </div>
  </div>
  <div id="info-text" class="d-none">
    <div id="close" @click="toggleInfoBox">Close</div>
    <div class="info-text-content">
      Prices do not reflect all markets and may be delayed by up to 20 minutes.
      The information is provided “as is”. They are for informational purposes
      only and should not be used for trading or advisory purposes.
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadLine',
  methods: {
    toggleInfoBox() {
      const infoTextElement = document.getElementById('info-text');
      if (infoTextElement) {
        infoTextElement.classList.toggle('d-none');
      }
    },
  },
};
</script>

<style scoped>
.headLine {
  position: absolute;
  left: 0;
  top: 64px;
  width: 1324px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
}

.rectangle {
  width: 96px;
  height: 32px;
  border-radius: 0px 100px 100px 0px;
  background: #39daff;
}

.text {
  font-weight: 500;
  font-size: 2.25rem;
  line-height: 2.67rem;
  color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .info {
    text-align: right;
    position: relative;
    width: 20%;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.25rem;

    img {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      border: 2px solid transparent;
      &:hover {
        border: 2px solid #39daff;
        cursor: pointer;
      }
    }
  }
}

#info-text {
  color: #f9f9f9;
  position: absolute;
  top: 20vh;
  left: 50%;
  transform: translate(-50%, 0);
  min-height: 10vh;
  min-width: 20%;
  background: #39daff;
  border-radius: 16px;
  z-index: 3;
  padding: 40px;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 32px;

  #close {
    text-align: right !important;
    cursor: pointer;
    &:hover {
      font-weight: 600;
    }
  }
}

.d-none {
  display: none !important;
}

@media screen and (max-width: 1440px) {
  .headLine {
    width: 90%;
  }
}

@media screen and (max-width: 440px) {
  .headLine {
    .text {
      font-size: 1.5rem;
    }
  }
}
</style>
