import client from "./client";

export default {
  setsigninstate: (idToken) => {
    return new Promise((resolve, reject) => {
      client
        .post("/main/login/", idToken)
        .then((response) =>
          resolve({ email: response.data.email, userId: response.data.userId })
        )
        .then((response) => console.log(response))
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status == "404") {
            client.post("/main/signup/", idToken).then((response) =>
              resolve({
                email: response.data.email,
                userId: response.data.userId,
              })
            );
          } else {
            reject(new Error(err.response.data.message || err.message));
          }
        });
    });
  },
  login: (authInfo) => {
    return new Promise((resolve, reject) => {
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
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
};
