<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <h1>Admin</h1>
      <label for="adminname">User Name</label>
      <input type="text">
      <label for="adminpassword">Password</label>
      <input type="password">
      <button>Login</button>
    </div>
    <div>
      <h1>Dashboard</h1>
      <label for="surveycode">Survey Code</label>
      <input type="password">
      <label for="accesscode">Access Code</label>
      <input type="text">
      <button v-on:click="loginDashboard()">View Dashboard</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    loginDashboard: () => {
      console.log('go to dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
