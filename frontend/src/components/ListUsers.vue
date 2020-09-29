<template>
 <div id="container">
   <h1 id="wherePage">User list</h1>
    <b-card id="card">
    <table id="listSurvey">
          <thead>
            <tr>
              <th scope="Username">Username</th>
              <th class="options3" scope="Firstname">First Name</th>
              <th class="options3" scope="Lastname">Last Name</th>
              <th class="options1" scope="Birthdate">Birthdate</th>
              <th class="options1" scope="Gender">Gender</th>
              <th class="options2" scope="Phone">Phone</th>
              <th class="options3" scope="Email">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userList" :key="index" :id="user.userName">
              <td>{{ user.userName }}</td>
              <td class="options3">{{ user.firstName }}</td>
              <td class="options3">{{ user.lastName }} </td>
              <td class="options1">{{ user.birthdate }}</td>
              <td class="options1">{{ user.gender }}</td>
              <td class="options2">{{ user.phone }} </td>
              <td class="options3">{{ user.email }}</td>
              <td>
                <button 
                    id="DeleteUser"
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDeleteUser(user)"
                    >
                    Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-card>
 </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'ListUsers',
  data() {
    return {
      userList: [],
    };
  },
  methods: {

    getUsers(){
      const path = 'http://localhost:5000/get_user';
      axios.get(path)
        .then((res) => {
            console.log(res);
          this.userList = res.data.users;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error.response);
        });
    },

    onDeleteUser(user){
      swal({
          title: 'Are you sure to have to delete this user?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
              const path = `http://localhost:5000/delete_user`;
              const payload = {
                  idU: user.idU
              };
              axios.post(path, payload)
              .then(() => {
                  this.getUsers();
                   swal(
                  'Deleted!',
                  'The user has been deleted.',
                  'success'
                )
              })
              .catch((error) => {
                  console.error(error);
            });

           
          }
        })
        
    },

  
 },
created() {
    this.getUsers();
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#container{
  width: 100%;
  height:100%;
  font-size: 20px;
}

#card{
  margin: 5% 7.5%;
  padding: 2.5%;
  max-width: 85%;
}
#wherePage{
  margin:0%;
  padding: 1%;
  background-color: #eeeeee;
}
.options1{
  display: table-cell;
}

.options2{
  display: table-cell;
}
.options3{
  display: table-cell;
}
#listSurvey {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 2% 0%;
  width: 100%;
}

td{
    border-top-width: 1px;
    border-top-style: solid;
    border-top-color: #2c3e50;
  }

$mobile-width-limit: 700px;//maximum width for mobile device
$desktop-width-limit2: 900px;//minimum width for destock device
$desktop-width-limit: 1200px;//minimum width for destock device
@media only screen and (max-width: $mobile-width-limit) {
  #card{
    margin: 12% 2.5%;
    margin-bottom: 40%;
    max-width: 95%;
  }
  .options1, .options2, .options3{
     display: none;
  }

}
@media only screen and (min-width: $mobile-width-limit + 1) and (max-width: $desktop-width-limit2 - 1) {
  #card{
    margin: 10% 5%;
    margin-bottom: 30%;
    max-width: 90%;
  }
  .options1, .options2{
     display: none;
  }
}

@media only screen and (min-width: $desktop-width-limit2 + 1) and (max-width: $desktop-width-limit - 1) {
  #card{
    margin: 8% 5%;
    margin-bottom: 20%;
    max-width: 90%;
  }
  .options1{
     display: none;
  }
}
button{
  margin: 2%;
}
</style>
