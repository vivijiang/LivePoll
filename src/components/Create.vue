<template>
  <div class="login">
    <h1>create new live survey</h1>
  </div>
</template>

<script>
export default {
  name: 'create',
  data () {
    return {
      msg: ''
    };
  },
  methods: {
    loginDashboard: () => {
      console.log('go to dashboard');
    }
  }
};
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
