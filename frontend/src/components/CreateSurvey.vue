<template>
 <div id="container">
    <h1 id="wherePage">Create a new survey</h1>
      <b-card id="card">
        <form
        id="app"
        @submit="onSubmit"
        method="post"
        >
        <p>
            <label for="name">Name of the Survey</label>
            <input
                id="name"
                name="name"
                v-model="addSurveyForm.title"
                type="text"
                placeholder="Enter name"
                :class="{ 'has-error': submitting && invalidTitle }"
                @focus="clearStatus"
                
            >
        </p>

        <p>
            <label for="movie">Category</label>
            <select
                id="Category"
                name="Category"
                v-model="addSurveyForm.category"
                placeholder="Choose category"
                :class="{ 'has-error': submitting && invalidCategory }"
                @focus="clearStatus"
            >
                <option>Cultural(movies, books ...)</option>
                <option>Health</option>
                <option>History</option>
                <option>Policy</option>
            </select>
        </p>

        <p>
            <input
                class="btn btn-danger btn-sm"
                type="submit"
                value="Submit"
            >
        </p>

        </form>
      </b-card>

    <p v-if="error" class="error-message">
		❗Please fill out all required fields
    </p>
    <p v-if="success" class="success-message">
		✅ Survey successfully created
    </p>
 </div>
</template>

<script>
//import axios from 'axios';
import router from '../router'

export default {
  name: 'CreateSurvey',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      addSurveyForm: {
        title: '',
        category: '',
      },
    };
  },
  computed: {
		invalidTitle() {
			return this.addSurveyForm.title === ''
    },
    invalidCategory() {
			return this.addSurveyForm.category === ''
		},
	},
  methods: {
   
    onSubmit(event) {
        event.preventDefault();
        this.submitting = true
        this.clearStatus()
        if (this.invalidTitle || this.invalidCategory) {
				this.error = true
				return
			}
      const title =  this.addSurveyForm.title;
      const category = this.addSurveyForm.category;
      router.push({ name: 'CreateQuestion', params :{
          title: title,
          category: category
      } })
    },

    clearStatus() {
			this.success = false
			this.error = false
		}
    
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#container{
  margin:0%;
}
#wherePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}

#card{
  margin: 10% 20%;
  padding: 0%;
  max-width: 60%;
}

$mobile-width-limit: 600px;//maximum width for mobile device
$desktop-width-limit: 1024px;//minimum width for destock device
@media only screen and (max-width: $mobile-width-limit) {
  #card{
    margin: 10% 5%;
    max-width: 90%;
  }
}
@media only screen and (min-width: $mobile-width-limit + 1) and (max-width: $desktop-width-limit - 1) {
  #card{
    margin: 10% 15%;
    max-width: 70%;
  }
}

[class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }

  .has-error{
    border: 1px solid #d33c40;
  }
</style>
