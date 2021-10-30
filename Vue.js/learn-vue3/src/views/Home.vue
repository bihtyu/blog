<template>
  <ul>
    <!-- <li><router-link to="/reactive">reactive</router-link></li> -->
    <app-link to="reactive">reactive</app-link>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLink from '../components/AppLink.vue'

export default defineComponent({
  components: { AppLink },
  setup() {

  }
})
</script>


<style lang="stylus" scoped>
li
  list-style: none;
  color: green;
  a
    color: inherit;
</style>