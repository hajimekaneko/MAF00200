<template>
  <div>
    <button class="btn btn-secondary" v-on:click="authMethod">認証</button>
    <p class="h5">
      {{ data.email_address }} <br />
      {{ address }}
    </p>
  </div>
  <h1>Kanban App Login</h1>
</template>

<script>
// import { mapState } from "vuex";
import { useStore } from "vuex";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { initializeApp, getApps } from "firebase/app";
// import firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
  name: "TaskManagement",
  props: {},
  // data() {
  //   return {
  //     address: "aa",
  //   };
  // },
  setup() {
    const store = useStore();
    const router = useRouter();
    const authMethod = () => {
      const firebaseConfig = {
        apiKey: "AIzaSyCD8kRLrcxGkQO9jri9_INSBD0C2Nvngiw",
        authDomain: "mas00100.firebaseapp.com",
        projectId: "mas00100",
        storageBucket: "mas00100.appspot.com",
        messagingSenderId: "580818454655",
        appId: "1:580818454655:web:adf753882179128c77d74a",
        measurementId: "G-EQEG4J42VH",
      };
      if (!getApps().length) {
        initializeApp(firebaseConfig);
      }

      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          data.email_address = user.email;
          store.commit("SETSIGNINSTATE", result.user);
          console.log(store.state.auth);
          router.push("/taskmanagement/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          console.log(
            "errorCode: " +
              errorCode +
              "/errorMessage: " +
              errorMessage +
              "/email: " +
              email
          );
        });
    };

    const data = reactive({
      email_address: "",
    });

    return {
      data,
      authMethod,
    };
  },
  computed: {
    address: function () {
      return this.$store.state.auth.email;
      // return "this.$store.state.auth.email";
    },
  },
  // computed: {
  //   ...mapState({
  //     address: this.$store.state.auth.email,
  //   }),
  // },
  mounted() {
    console.log(this.$store.state.auth.email);
    // this.address = this.$store.state.auth.email;
  },
};
</script>

<style scoped>
.login-view {
  padding-top: 10vh;
  height: 80vh;
}

.login-view {
  width: 320px;
  margin: auto;
}
</style>
