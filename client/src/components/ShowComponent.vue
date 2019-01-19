<template>
    <div>
      <h1> Top 300 Show from MyShows! </h1>
      <div 
          v-for="(show, index) in shows" 
          v-bind:item="show"
          v-bind:index="index" 
          v-bind:key="show.jsonrpc">
          <p>{{ show.result[index].show.title }}</p>
      </div>
    </div>
</template>

<script>
import ShowService from '../ShowService';

export default {
  name: 'ShowComponent',
  data() {
    return {
      shows: [],
      error: '',

    }
  },
  async created() {
    try {
      let data = await ShowService.getShows();
      this.shows = JSON.parse(data);
      /* eslint-disable */
      console.log("shows are");
      console.log(this.shows);
    }
    catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
