<template>
  <div>
    <h1 id="wherePage">What is YCS ?</h1>
    <b-card id="card">
    <h2><strong>An application to create surveys</strong></h2>
    <h3><strong>YCS (acronym for Your Custom Survey) is an application which will allow you to create your own survey</strong></h3>
    <ul>
      <li>For each survey, you can create unlimited number of questions</li>
      <li>For each question, you can create 5 answers, and precise if it's multiple or unique answer</li>
      <li>Get the results for each of your surveys</li>
    </ul>
    <h3><strong>The team</strong></h3>
    <ul>
      <li>Antoine Landrieu</li>
      <li>Thomas Gurtler</li>
    </ul>
    <h3><strong>Technologies used</strong></h3>
    <ul>
      <li>Frontend : Vue.js</li>
      <li>Backend : Flask</li>
      <li>Database : Sqlite</li>
    </ul>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
#wherePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}
#card{
  margin: 1.5% 2.5%;
  padding: 2.5%;
  max-width: 95%;
}
a {
  color: #42b983;
}
</style>
