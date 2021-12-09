<template>
  <div class="about">
    <h1 :data-tooltip="JSON.stringify(test1)" id="dd" >This is an about page</h1>
    <div class="container">
      <p><span :data-tooltip="JSON.stringify(test2)">aaa</span> aa aaaa aaa a aa a a aaaa aa aaa aaa a <span :data-tooltip="JSON.stringify(tooltipOption)" id="tooltip">tip</span> aaaa aaa aa a a aaa aaaa</p>
    </div>
    <div v-for="i in 30" :key="i">
      <h1>Line {{i}}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import initTooltip from '../functions'
export default Vue.extend({
  name: 'About',
  data(){
    const test1 = {content: 'adfadgag', theme: 'warning', effect:'onHover',};
    const test2 = {
      theme: 'fill',
      effect:'onClick',
      position: 'right',
      content: "sssss ssss ss sssss sss ssssss ssss ss"
    }
    const tooltipOption = {
      theme: 'success',
      effect:'onFloat',
      position: 'bottom',
      content: "ПодсказОчка <br/> dfujbadfjnbo ;ajbjadfjb ln badkfj bnkaj dfnb;k jn;ROEIJ GVPDJF LKBad lfjnbv nfrjf"
    }
     return {
       tooltipOption,
       test1,
       test2
     }
  },
  mounted() {
     initTooltip();
  }
})
</script>
<style>
#app {
  overflow: hidden;
}
.container{
  margin: auto;
  max-width: 100%;
}
</style>