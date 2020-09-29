<template>
 <div id="container">
    <b-card id="SignIn" header="Sign in">
    <form
     id="app"
     @submit="onSubmit"
     method="post"
    >

     <p>
        <label for="Username">Username</label>
        <input
            id="Username"
            name="Username"
            v-model="addUser.Username"
            type="text"
            placeholder="Enter your username"
            :class="{ 'has-error': submitting && invalidUserName }"
            @focus="clearStatus"
            
        >
    </p>

     <p>
        <label for="Password">Password</label>
        <input
            id="Password"
            name="Password"
            v-model="addUser.Password"
            type="text"
            placeholder="Enter your Password"
            :class="{ 'has-error': submitting && invalidPassword }"
            @focus="clearStatus"
            
        >
    </p>

    <p>
        <input
            class="btn btn-danger btn-sm"
            type="submit"
            value="Submit"
        >
    </p>

    </form>

    <p v-if="error" class="error-message">
		❗Please fill out all required fields
    </p>
    <p v-if="success" class="success-message">
		✅ Survey successfully created
    </p>
    </b-card>
 </div>
</template>

<script>
//import axios from 'axios';
import router from '../router';


export default {
  name: 'Login',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      addUser: {
        Username: '',
        Password: '',
      },
    };
  },
  computed: {
      invalidUserName() {
			return this.addUser.Username === ''
        },
        invalidPassword() {
			return this.addUser.Password === ''
        }
	},
  methods: {
   
    onSubmit(event) {
        event.preventDefault();
        this.submitting = true
        this.clearStatus()
         if (this.invalidUserName || this.invalidPassword) {
				this.error = true
				return
        }
        const payload = {
            userName: this.addUser.Username,
            password: this.addUser.Password,
        };
        this.$store.dispatch('login', payload)
       .then(() => {router.push('ListSuveys');})
       .catch(err => console.log(err))
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
  min-height: 100%;
  margin: 10%;
}

#SignIn{
  margin: 0% 20%;
  padding: 0%;
  max-width: 60%;
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
