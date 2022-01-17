<template>
  <div class="about">
    <h1
      data-tooltip="<b>ПодсказОчка</b> <br/> dfujbadfjnbo ;ajbjadfjb ln badkfj bnkaj dfnb;k jn;ROEIJ GVPDJF LKBad lfjnbv nfrjf"
      :data-options ="'error , onFloat , top'"
    >
      This is an about page
    </h1>

    <div class="container">
      <p>
        <span
          data-tooltip="Я дефолтная подсказка"
        >
          aaa
        </span>
        aa aaaa aaa a aa a a aaaa aa aaa aaa a
        <span
          data-tooltip="jgfxb"
          :data-options ="'warning, left'"
        >
          tip
        </span>
        ddd aaa aa a a aaa aaaa
      </p>
    </div>
    <div v-for="i in 30" :key="i">
      <h1>Line {{i}}</h1>
    </div>
  </div>
</template>
<script lang="ts">

import Vue from "vue";
import InitTooltip from '../functions/initTooltip'
export default Vue.extend({
  name: 'About',
  mounted() {
     InitTooltip();
  }
})
</script>
<style>

.container{
  margin: auto;
  max-width: 100%;
}
body {
  overflow: hidden;
}
</style>