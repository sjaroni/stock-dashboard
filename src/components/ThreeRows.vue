<template>
  <div class="three-rows-container">
    <div class="row rowOne">Zeile 1 Inhalt</div>
    <div class="row rowTwo">Zeile 2 Inhalt</div>
    <div class="row rowThree">Zeile 3 Inhalt</div>
  </div>
</template>

<script>
export default {
  name: 'ThreeRows',
};
</script>

<style scoped>
.three-rows-container {
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  gap: 32px;
  color: #FFFFFF;
  top: 155px;
  position: absolute;
  width: 1240px;
}

.row{
  display: flex;
  align-items: center; /* Zentriert den Inhalt vertikal */
  justify-content: center; /* Zentriert den Inhalt horizontal */
  padding: 24px;
  gap: 24px;
  border-radius: 20px;
  opacity: 0px;
}

.rowOne {
  height: 191px;  
  background: #023a6233;
}
.rowTwo {
  height: 352px;  
  background: #011F35;
}
.rowThree {
  height: 296px;
  background: #011F35;
}
</style>
