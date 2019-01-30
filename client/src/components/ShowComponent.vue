<template>
    <div>
      <!--<input :value="query" placeholder="search shows...">-->
      <!--<form @submit="showsFilter"> 
      <input type="text" v-model="query" placeholder="What do u want to watch?">
      <input type="submit" value="Submit" class="btn">
    </form>-->
      <h1> Top 300 Shows from MyShows! </h1>
      <input type="text" id="query" class="query-text" v-model="query" placeholder="What do u want to watch?">
      <div class="show-item"
          v-for="(show, index) in filteredShows" 
          v-bind:item="show"
          v-bind:index="index" 
          v-bind:key="show.rank">
          <p>{{ show.show.title }}</p>
          <p><a v-bind:href="'https://myshows.me/view/'+ show.show.id + '/'"><img v-bind:src="show.show.image" /></a></p>
      </div>
    </div>
</template>

<script>
import ShowService from '../services/ShowService';

export default {
  name: 'ShowComponent',
  methods: {
     async showsFilter() {
       this.shows = [];
       //this.shows = await ShowService.getShowByQuery(this.query);
        /* eslint-disable */
        
      }
    },
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

  #query {
    background: white; outline: none; border: 1 none;
    font: inherit; text-align: center; color: hsl(120, 40%, 30%);
    box-sizing: border-box;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-top: 1%;
    margin-right: auto;
    margin-left: auto;
    width: 25%;

   
  }
  .query-text {
	line-height: 40px; height: 40px;
	background: hsl(120, 40%, 20%);
}
p {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
}
</style>
