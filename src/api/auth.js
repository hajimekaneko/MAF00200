import client from "./client";

export default {
  setsigninstate: (idToken) => {
    return new Promise((resolve, reject) => {
      console.log(idToken);
      client
        .post("/main/login/", idToken)
        .then((response) =>
          resolve({ email: response.data.email, userId: response.data.userId })
        )
        .then((response) => console.log(response))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  login: (authInfo) => {
    return new Promise((resolve, reject) => {
      console.log(authInfo);
      client
        .post("/main/login/", authInfo)
        .then((response) =>
          resolve({ token: response.data.email, userId: response.data.userId })
        )
        .then((response) => console.log(response))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },

  logout: (token) => {
    return new Promise((resolve, reject) => {
      client
        .delete("/main/logout/", { headers: { "x-kbn-token": token } })
        .then(() => resolve())
        .catch((err) => {
          console.log("err"),
            reject(new Error(err.response.data.message || err.message));
        });
    });
  },
};
