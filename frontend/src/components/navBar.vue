//src/components/Navbar.vue
<template>
    <div>
      <b-navbar toggleable="sm" type="dark" class="border-bottom border-light" variant="dark">
            <b-navbar-brand>
				Your customed Survey
			</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav id="router" v-if="isLoggedIn">
                <router-link to="/ListSuveys">Surveys List </router-link> <span class="separator">| |</span>
                <router-link to="/CreateSurvey">Create a Survey</router-link> <span class="separator">| |</span>
             </b-navbar-nav>
            
                 <b-navbar-nav class ="ml-auto" v-if="isLoggedIn"> 
                      <router-link to="/ListUsers" v-if="$store.state.user.right === 2">List Users</router-link><span class="separator">| |</span>
                      <router-link to="/myProfile">My Profile</router-link><span class="separator">| |</span>
                      <a id="logout" @click="logout">Logout</a>
                  </b-navbar-nav>
                  <b-navbar-nav class ="ml-auto" v-else>                          
                        <router-link to="/SignIN">Sign in</router-link><span class="separator">| |</span>
                        <router-link to="/SignUp">Sign up</router-link>
                  </b-navbar-nav>
            </b-collapse>
      </b-navbar>
    </div>  
</template>
<script>
import swal from 'sweetalert';
export default {

  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          swal("You have been disconnected!");
          this.$router.push('/SignIn')
        })
      }
    },
}    
</script>

<style lang="scss">
  a {
    font-weight: bold;
    color: #007bff;


    &.router-link-exact-active {
      color: #92b7e7;
    }
  }

  #router{
      text-align: center;
  }

  #logout{
    color: #2183ec;
    cursor: pointer;
  }


  .separator{
     color: #343a40;
  }


</style>