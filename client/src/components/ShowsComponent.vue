<template>
  <div>
    <div v-bind:key="show.show.rank" v-for="show in shows">
      <TodoItem v-bind:show="show" />
    </div>
  </div>
</template>

<script>
import ShowComponent from './ShowComponent.vue';
export default {
  name: "ShowsComponent",
  components: {
    ShowComponent
  },
  props: ["shows"]
}
</script>

<style scoped>
</style>
