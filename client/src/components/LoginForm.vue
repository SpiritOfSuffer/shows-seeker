<template>
  <div>
    <div v-if="isLogined">
      <button v-on:click="userLogout">Logout</button>
    </div>
    <div v-else>
      <button v-on:click="userLogin">Login</button>
    </div>
  </div>
</template>

<script>
import UserService from '../services/UserService';
/* eslint-disable */
export default {
    data () {
      return {
        isLogined: false,
        login: '4234',
        password: 'ROOT'
      }
    },
    methods: {
      async userLogin() {
          console.log(await UserService.login(this.login, this.password));
          this.isLogined = true
          console.log(this.isLogined);
      },
      async userLogout() {
          this.isLogined = false;
      }
    },
}
</script>

<style scoped>

</style>
