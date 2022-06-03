<template>
  <div class="auth">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer"/>

    <template v-if="!user">
      <b-button variant="light" class="logButton" @click="signInWithGoogle" pill> Log In with Google </b-button>
    </template>

    <template v-if="user">
      <img class="avatar" :src="user.photoURL" alt="avatar" referrerpolicy="no-referrer" id="profile-photo" style="">
      <b-button variant="light" class="logButton" @click="signOut" pill> 
        Log Out 
        <i class="fa fa-solid fa-right-from-bracket fa-xl" style="color: #2ebf77"></i>
      </b-button>
    </template>

  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig";

export default {
    components: {},
    name: 'LoginButton',

    data: function() {
      return {
        user: null
      }
    },

    beforeCreate: function() {
      auth.onAuthStateChanged(user => {
        if (user) {        
          this.user = user;
        } else {
          this.user = null;
        }
      });
    },

    methods: {
      signInWithGoogle: function() {
        auth.signInWithRedirect(provider)
          .then(result => {
            this.user = result.user;
          })
          .catch(err => console.log(err));
      },
      
      signOut: function() {
        auth.signOut()
          .then(() => {
            this.user = null;
            this.$router.replace('/') 
          })
          .catch(err => console.log(err));
      }
    }
};
</script>

<style scoped>
.avatar {
  width: 2em; 
  height: 2em; 
  border-radius: 50%;
}

button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  border-radius: 6px;
}

.logButton {
  /* margin-left: 10px;
  margin-bottom: 3em; */
  height: 2em
}

#profile-photo{
  height:32px; 
  width:32px;
  margin-right: 8px;
  margin-bottom: 3px;
}
</style>