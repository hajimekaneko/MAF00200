import client from "./client";

export default {
  getList: (token) => {
    return new Promise((resolve, reject) => {
      client
        .get("/taskmanagement/lists", { headers: { "x-kbn-token": token } })
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  addlist: (token, TaskId) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          "/taskmanagement/lists/",
          { Task: TaskId, List_name: "newList", List_status: 0 },
          { headers: { "x-kbn-token": token } }
        )
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  changestatus: (token, list_Id, nextstatus) => {
    return new Promise((resolve, reject) => {
      console.log({ list_Id, nextstatus });
      client
        .patch(
          `/taskmanagement/lists/${list_Id}/`,
          { List_status: nextstatus },
          { headers: { "x-kbn-token": token } }
        )
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  changememo: (token, list_Id, nextstatus, newmemo) => {
    return new Promise((resolve, reject) => {
      client
        .patch(
          `/taskmanagement/lists/${list_Id}/`,
          { List_status: nextstatus, List_memo: newmemo },
          { headers: { "x-kbn-token": token } }
        )
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  changename: (token, listID, newlistname) => {
    return new Promise((resolve, reject) => {
      console.log({ listID, newlistname });
      client
        .patch(
          `/taskmanagement/lists/${listID}/`,
          { List_name: newlistname },
          { headers: { "x-kbn-token": token } }
        )
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  deletelist: (token, listID) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`/taskmanagement/lists/${listID}/`, {
          headers: { "x-kbn-token": token },
        })
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
};
