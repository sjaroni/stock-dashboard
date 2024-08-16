<template>
    <BaseCard>
      <h1>Revenue last 3 years</h1>
      <p>Dies ist ein Beispielinhalt für die erste Karte.</p>
    </BaseCard>
</template>

<script>
import BaseCard from './components/BaseCard.vue';

export default {
  name: 'App',
  components: {        
    BaseCard
  }
}
</script>

<style>
body{
  margin: 0;
  font-family: 'Rubik', sans-serif;
  display: flex;
  justify-content: center;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);  
}
#app {
  width: 100vw;
  max-width: 1440px;
  min-height: 100vh;
  padding: 100px;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
</style>
