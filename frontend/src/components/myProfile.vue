<template>
<div>
<h1 id="wherePage">My profile</h1>
<b-card id="MyProfile">
    <p id="username"> Username : {{ $store.state.user.userName }}</p>
    <p id="firstname"> First Name : {{ $store.state.user.firstName }}</p>
    <p id="lastname"> Last Name : {{ $store.state.user.lastName }}</p>
    <p id="birthdate"> Birthdate : {{ $store.state.user.birthdate }}</p>
    <p id="gender"> Gender : {{ $store.state.user.gender }}</p>
    <p id="phone"> Phone : {{ $store.state.user.phone }}</p>
    <p id="email"> Email : {{ $store.state.user.email }}</p>
    <button 
                    type="button"
                    id = "EditProfil"
                    class="btn btn-danger btn-sm"
                    @click="onEditUser(user)"
                    >
                    Edit my profile</button>
</b-card>

    <h1>My Surveys</h1>
    <div v-if="surveys[0]">
    <table id="listSurvey">
          <thead>
            <tr>
              <th scope="Title">Title</th>
              <th class="options2" scope="Categorie">Categorie</th>
              <th class="options1" scope="Number">Number of question</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(survey, index) in surveys" :key="index">
              <td>{{ survey.title }}</td>
              <td class="options2">{{ survey.category }}</td>
              <td class="options1">{{ survey.nbOfQuestions }} </td>
              <td>
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onVoteSurvey(survey)"
                      >
                      Vote</button>
                
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onResultSurvey(survey)"
                      >
                      Result</button>
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onEditSurvey(survey)"
                      >
                      Edit</button>
                  <button 
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onDeleteSurvey(survey)"
                      >
                      Delete</button>
                  <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="onDownloadSurvey(survey)"
                      >
                      Download</button>
                </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div v-else>
      <h3>You didn't create any survey yet</h3>
    </div>
 </div>
</template>

<script>
import axios from 'axios';
import FileSaver from 'file-saver'
import swal from 'sweetalert';
import router from '../router';

export default {
  name: 'MyProfile',
  data() {
    return {
      surveys: [],
    };
  },
  methods: {
    getSurveys() {
      const path = 'http://localhost:5000';
      const payload = {
            idU: this.$store.state.user.idU
        };
      axios.post(path, payload)
        .then((res) => {
            console.log(res);
          this.surveys = res.data.surveys;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },

  removeSurvey(SurveyId) {
    const path = `http://localhost:5000/delete_survey`;
    console.log(SurveyId)
    const payload = {
            idS: SurveyId
        };
    axios.post(path, payload)
    .then(() => {
        swal('Deleted!','The survey has been deleted.','success')
        this.getSurveys();
      
    })
    .catch((error) => {
      // eslint-disable-next-line
        console.error(error);
    });
   },

  onDeleteSurvey(survey) {
        swal({
          title: 'Are you sure to have to delete this survey?',
          text: "You won't be able to revert it!",
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                this.removeSurvey(survey.idS);
              }
        })
    },

    onVoteSurvey(survey) {
        const idS = survey.idS;
        const title =  survey.title;
        const category = survey.category;
        const number = survey.nbOfQuestions;
        this.$router.push({ name: 'Vote', params :{
          idS: idS,
          title: title,
          category: category,
          numberOfQuestion: number
      } })
    },
    onEditSurvey(survey){
        const idS = survey.idS;
        router.push({ name: 'EditSurvey', params :{
          idS: idS
        } })
    },

    onResultSurvey(survey){
        const idS = survey.idS;
        const title =  survey.title;
        const category = survey.category;
        this.$router.push({ name: 'Consult', params :{
          idS: idS,
          title: title,
          category: category
      } })
    },

    onEditUser(){
      const idU = this.$store.state.user.idU;
        this.$router.push({ name: 'EditMyProfile', params :{
          idU: idU
        } })
    },

    downloadSurvey(SurveyId){
        const path = `http://localhost:5000/download_survey`;
        const payload = {
            idS: SurveyId
        };
        axios.post(path, payload,{responseType: 'blob'})
        .then((response) => {
            FileSaver.saveAs(response.data, "YourSurvey.xls");
            
        })
        .catch((error) => {
          // eslint-disable-next-line
            console.error(error);
        });
    },

    onDownloadSurvey(survey){
        this.downloadSurvey(survey.idS)
    }
  
 },
created() {
    this.getSurveys();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mobile-width-limit: 600px;//maximum width for mobile device
$desktop-width-limit: 1024px;//minimum width for destock device
.options1{
  display: table-cell;
}

.options2{
  display: table-cell;
}
#container{
  width: 100%;
  font-size: 20px;
}
#wherePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}
#MyProfile{
  margin: 5% 20%;
  padding: 0%;
  max-width: 60%;
}
#listSurvey {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 70%;
  margin: 5% 15%;

  td{
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #2c3e50;
  }
}
@media only screen and (max-width: $mobile-width-limit) {
  .options1, .options2{
  display: none;
}
}
@media only screen and (min-width: $mobile-width-limit + 1) and (max-width: $desktop-width-limit - 1) {
  .options1{
  display: none;
}
}
button{
  margin: 2%;
}
</style>
