<template>
  <div>
    <button class="btn btn-secondary" v-on:click="authMethod">認証</button>
    <p class="h5">
      {{ data.email_address }} <br />
      {{ address }}
    </p>
  </div>
  <h1>Kanban App Login</h1>
  <!-- {{ process.env.VUE_APP_FIREBASE_AUTH_DOMAIN }} -->
</template>

<script>
// import { mapState } from "vuex";
import { useStore } from "vuex";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { initializeApp, getApps } from "firebase/app";
// import firebase from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { firebaseConfig } from "@/key/firebaseconfig.js";

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
    const firebaseConfig = {
      apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID,
      measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
    };
    const authMethod = () => {
      if (!getApps().length) {
        initializeApp(firebaseConfig);
      }

      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          auth.currentUser
            .getIdToken(/* forceRefresh */ true)
            .then(function (idToken) {
              console.log(idToken);
              const user = result.user;
              data.email_address = user.email;
              // userじゃなくてバックエンドから持ってきた値を使った方がええと思う
              store.dispatch("setsigninstate", { user, idToken }).then(() => {
                router.push("/taskmanagement/");
              });
            });
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
      return process.env.VUE_APP_FIREBASE_AUTH_DOMAIN;
      // return this.$store.state.auth.email;
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
