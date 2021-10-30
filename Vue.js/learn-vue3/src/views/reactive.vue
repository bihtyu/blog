<template>
  <p>age: {{ age }}</p>
  <p>computedAge: {{ computedAge }}</p>
  <button @click="testHandle">testHandle</button>
  <!-- <h3>{{ count }}</h3>
  <h3>{{ obj.count }}</h3> -->
  <!-- <button @click="changeObj">changeObj</button> -->
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  readonly,
  watchEffect,
  isProxy,
  effect,
  computed
} from 'vue'

export default defineComponent({
  name: 'Reactive',
  setup() {
    const raw = {
      count: ref(123)
    }

    const age = ref(28)
    const name = ref('bihtyu')
    const computedAge = computed({
      get: () => age.value++,
      set: (val) => age.value + val
    })

    effect(() => {
      console.log('in effect1')
      console.log(age.value)
    })
    effect(() => {
      console.log('in effect2')
      console.log(name.value)
    })

    const copy = readonly({ name: 123 })

    const testHandle = () => {
      // age.value++
      name.value = 'dz'
    }
    
    return {
      age,
      computedAge,
      testHandle
    }
  }
})
</script>
