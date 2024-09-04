<template>
  <div class="headLine">
    <div class="rectangle"></div>
    <div class="text">
      The Magnificent Seven Companies
      <div class="info">
        <img src="../assets/icons/info.svg" alt="Info Icon" />
        <div id="info-text">
          <div id="close">X</div>
          <div class="info-text-content">
            Die Kurse spiegeln nicht alle Märkte wider sind möglicherweise bis
            zu 20 Minuten zeitverzögert. Die Angaben werden ohne Mängelgewähr
            zur Verfügung gestellt. Sie dienen nur zur Information und sind
            nicht zu Handels- oder Beratungszwecken zu verwenden.
          </div>
        </div>
      </div>
    </div>
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
  font-size: 36px;
  line-height: 42.66px;
  color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .info {    
    text-align: right;
    position: relative;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    line-height: 20px;

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

    #info-text {
      position: absolute;
      left: 50%;
      transform: translate(-75%, 0);
      height: 20vh;
      width: 50%;
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
      }
    }
  }
}
</style>
