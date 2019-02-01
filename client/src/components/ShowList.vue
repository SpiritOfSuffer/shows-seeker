<template>
  <div>
    <div v-bind:key="show.show.rank" v-for="show in shows">
      <ShowComponent v-bind:show="show" />
    </div>
  </div>
</template>

<script>
import ShowComponent from './ShowComponent.vue';
export default {
  name: "ShowList",
  components: {
    ShowComponent
  },
  props: ["shows"],
  methods: {},
  data() {
    return {
      shows: [],
      error: '',
      query: '',
    }
  },
  async created() {
    try {
      
      this.shows = await ShowService.getShows();
    }
    catch(err) {
      this.error = err.message;
    }
  },
  computed: {
    filteredShows: function() {
      return this.shows.filter((show) =>{
        return show.show.title.match(new RegExp(this.query, "i"));
      });
    }
  }
}
</script>

<style scoped>

</style>
