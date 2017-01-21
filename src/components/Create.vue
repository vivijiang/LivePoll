<template>
  <div class="login">
    <h1>create new live survey</h1>
    
    <div class="event-name l-mb3">
    <h2>What's the name of your survey?</h2>
      <input class="form-control" v-model="surveyName" placeholder="Survey Name">
    </div>
<!--     <div class="event-name l-mb3">
        <h2>When does the survey start?</h2>
      <input class="form-control" v-model="startDate" placeholder="Start Date">
    </div> -->
<!--     <div class="event-name l-mb3">
        <h2>Participants can join with WeChat mini program with the event code:</h2>
        <h3>Search 'XXX' or scan the QR code by WeChat</h3>
      <input class="form-control" v-model="surveyCode" placeholder="Survey Code">
    </div>  -->   
    <div class="l-mb1">
      <button class="btn btn-success" v-bind:disabled="!surveyName" v-on:click="goSetup"> Next </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  data () {
    return {
      surveyName: ''
    };
  },
  methods: {
    goSetup: function () {
      
      this.$router.push({ path: 'setup/democode' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control {
    display: block;
    width: 100%;
    padding: .45rem .5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: .07143rem solid #ccc;
    border-radius: .25rem;
  }

  .event-date, .event-name {
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
}
.l-mb3 {
    margin-bottom: 30px;
}
.l-mb1 {
    margin-bottom: 10px;
}
.btn{
  padding: .375rem 1rem;
    font-size: 1rem;
    line-height: 1.5;
    transition: background .2s ease-out;
    display: inline-block;
    font-weight: 500;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: .07143rem solid transparent;
    border-radius: .25rem;
        min-width: 7.5rem;
}
.btn-success {
    color: #fff;
    background-color: #70be4e;
    border-color: #70be4e;
}
.btn.disabled, .disabled.modal-header-close, .modal-header-actions button.disabled, .btn:disabled, .modal-header-close:disabled, .modal-header-actions button:disabled {
    cursor: not-allowed;
    opacity: .65;
     pointer-events: none;
    box-shadow: none;
}

</style>
