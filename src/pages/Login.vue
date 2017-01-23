<template>
  <div>
    <h1>LiveSurvey</h1>
    <div class="login flex">
      <div class="flex-auto bg-white">
        <h2>Admin</h2>
        <div class="event-name l-mb3">
          <label for="adminname">User Name</label>
          <input class="form-control" type="text" v-model="userName" placeholder="User Name">
        </div>
        <div class="event-name l-mb3">
          <label for="adminpassword">Password</label>
          <input class="form-control" type="password" v-model="adminPassword" placeholder="Password">
        </div>
        <button class="btn btn-success" v-bind:disabled="!userName || !adminPassword" v-on:click="loginAdmin">Login</button>
      </div>
      <div class="flex-auto bg-white">
        <h2>Dashboard</h2>
        <div class="event-name l-mb3">
          <label for="surveycode">Survey Code</label>
          <input class="form-control" v-model="surveyCode" placeholder="Survey Code">
        </div>
        <div class="event-name l-mb3">
          <label for="surveycode">Access Code</label>
          <input class="form-control" v-model="accessCode" placeholder="Access Code">
        </div>
        <button class="btn btn-success" v-bind:disabled="!surveyCode || !accessCode" v-on:click="loginDashboard()">View Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      surveyCode: '',
      accessCode: '',
      userName: '',
      adminPassword: ''
    };
  },
  methods: {
    loginAdmin: function () {
      this.$router.push({ path: 'surveys' });
    },
    loginDashboard: function () {
      // todo: verfiy the surveycode
      const self = this;
      self.$router.push({
        name: 'dashboard',
        params: {
          id: self.surveyCode
        }});
      // this.$route.push({ path: 'create-survey' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


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

.login{
  width: 800px;
  margin: 50px auto;
}

.login .flex-auto{
      border: .07143rem solid #ccc;
    border-radius: .25rem;
    padding: 20px;
}
</style>
