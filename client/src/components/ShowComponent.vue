<template>
    <div>
      <h1> Top 300 Show from MyShows! </h1>
      <div class="show-item"
          v-for="(show, index) in shows" 
          v-bind:item="show"
          v-bind:index="index" 
          v-bind:key="show.rank">
          <p>{{ show.show.title }}</p>
          <p><img v-bind:src="show.show.image" /></p>
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
      /* eslint-disable */
      this.shows = await ShowService.getShows();
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

.show-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }
  .del {
    background: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
  }
</style>
