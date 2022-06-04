import client from "./client";

export default {
  fetch: (token, UserId) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          "/taskmanagement/fetch_lists",
          {
            params: {
              // ここにクエリパラメータを指定する
              UserId: UserId,
            },
          },
          {
            headers: { "x-kbn-token": token },
          }
        )
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  addtaskgroup: (token, UserId) => {
    return new Promise((resolve, reject) => {
      console.log(UserId);
      client
        .post(
          "/taskmanagement/task_groups/",
          {
            User: UserId,
            TaskGroup_name: "newTaskGroup",
            TaskGroup_status_No: 0,
          },
          { headers: { "x-kbn-token": token } }
        )
        .then((response) => resolve(response.data))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  changestatus: (token, TaskGroupId, nextstatus, UserId) => {
    return new Promise((resolve, reject) => {
      console.log({ TaskGroupId, nextstatus });
      client
        .patch(
          `/taskmanagement/task_groups/${TaskGroupId}/`,
          { User: UserId, TaskGroup_status_No: nextstatus },
          { headers: { "x-kbn-token": token } }
        )
        .then((response) => resolve({ lists: response.data }))
        .catch((err) => {
          console.log("aaa");
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
  deletetaskgroup: (token, TaskGroupID) => {
    return new Promise((resolve, reject) => {
      console.log(TaskGroupID);
      client
        .delete(`/taskmanagement/task_groups/${TaskGroupID}/`, {
          headers: { "x-kbn-token": token },
        })
        .then((response) => resolve({ taskgroups: response.data }))
        .catch((err) => {
          reject(new Error(err.response.data.message || err.message));
        });
    });
  },
};
