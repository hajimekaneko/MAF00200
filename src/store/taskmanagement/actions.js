import * as types from "./mutation-types";
import { Auth, List, Task, TaskGroup } from "@/api";
// import firebase from "firebase";
// import { Auth, Task } from '@/api'

function changestatus(Content_Status, status) {
  let nextstatus;
  if (status === 99) {
    if (Content_Status === 0 || Content_Status === 1) {
      nextstatus = Content_Status + 1;
    } else if (Content_Status === 2) {
      nextstatus = 0;
    } else {
      console.log("ステータスがエラーです。");
    }
  } else {
    nextstatus = status;
  }
  return nextstatus;
}

export default {
  // login: ({ commit }) => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       const user = result.user;
  //       commit("LOGINSTATUSCHANGE", true);
  //       console.log("Login was successful");
  //       commit("SETUSERUID", user.uid);
  //       commit("SETUSERNAME", user.displayName);
  //       this.$router.push("/dashboard");
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       console.log("error : " + errorCode);
  //     });
  // },
  // // 認証状態の取得をするaction
  // onAuth: ({ commit }) => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     user = user ? user : {};
  //     commit("SETUSERUID", user.uid);
  //     commit("LOGINSTATUSCHANGE", user.uid ? true : false);
  //   });
  // },
  setsigninstate: ({ commit }, { user, idToken }) => {
    return Auth.setsigninstate(idToken)
      .then(() => {
        // userじゃなくてバックエンドから持ってきたresponce.dataを使った方がええと思う
        commit(types.SETSIGNINSTATE, user);
      })
      .catch((err) => {
        throw err;
      });
  },

  addtaskgroup: ({ dispatch, state }) => {
    return TaskGroup.addtaskgroup(state.auth.uid, state.auth.uid)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },

  addtask: ({ dispatch, state }, TaskGroupId) => {
    return Task.addTask(state.auth.uid, TaskGroupId)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },

  addlist: ({ dispatch, state }, TaskId) => {
    return List.addlist(state.auth.uid, TaskId)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },

  changeliststatus: ({ dispatch, state }, { status, List_Id, List_Status }) => {
    let nextstatus;
    nextstatus = changestatus(List_Status, status);
    return List.changestatus(state.auth.uid, List_Id, nextstatus)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },

  changememo: (
    { dispatch, state },
    { status, newmemo, List_Id, List_Status }
  ) => {
    let nextstatus;
    nextstatus = changestatus(List_Status, status);
    return List.changememo(state.auth.uid, List_Id, nextstatus, newmemo)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  changetaskstatus: ({ dispatch, state }, { status, TaskId, Task_Status }) => {
    let nextstatus;
    nextstatus = changestatus(Task_Status, status);
    return Task.changestatus(state.auth.uid, TaskId, nextstatus)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  changetaskgroupstatus: (
    { dispatch, state },
    { status, TaskGroupId, TaskGroup_Status }
  ) => {
    let nextstatus;
    nextstatus = changestatus(TaskGroup_Status, status);
    return TaskGroup.changestatus(
      state.auth.uid,
      TaskGroupId,
      nextstatus,
      state.auth.uid
    )
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },

  editlistname: ({ commit }, { TaskGroup_index, Task_index, List_index }) => {
    commit(types.EDITLISTNAME, { TaskGroup_index, Task_index, List_index });
  },
  editedlistname: ({ commit }, { TaskGroup_index, Task_index, List_index }) => {
    commit(types.EDITEDLISTNAME, { TaskGroup_index, Task_index, List_index });
  },
  edittaskname: ({ commit }, { TaskGroup_index, Task_index }) => {
    commit(types.EDITTASKNAME, { TaskGroup_index, Task_index });
  },
  editedtaskname: ({ commit }, { TaskGroup_index, Task_index }) => {
    commit(types.EDITEDTASKNAME, { TaskGroup_index, Task_index });
  },
  edittaskgroupname: ({ commit }, { TaskGroup_index }) => {
    commit(types.EDITTASKGROUPNAME, { TaskGroup_index });
  },
  editedtaskgroupname: ({ commit }, { TaskGroup_index }) => {
    commit(types.EDITEDTASKGROUPNAME, { TaskGroup_index });
  },
  changelistname: ({ dispatch, state }, { listID, newlistname }) => {
    return List.changename(state.auth.uid, listID, newlistname)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  changetaskname: ({ dispatch, state }, { taskID, newtaskname }) => {
    return Task.changename(state.auth.uid, taskID, newtaskname)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  changetaskgroupname: (
    { dispatch, state },
    { taskgroupID, newtaskgroupname }
  ) => {
    return TaskGroup.changename(state.auth.uid, taskgroupID, newtaskgroupname)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },

  showtasks: ({ commit }, TaskGroup_index) => {
    commit(types.SHOWTASKS, TaskGroup_index);
  },

  showlists: ({ commit }, { Task_index, TaskGroup_index }) => {
    commit(types.SHOWLISTS, { Task_index, TaskGroup_index });
  },
  deletelist: ({ dispatch, state }, listID) => {
    return List.deletelist(state.auth.uid, listID)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  deletetask: ({ dispatch, state }, TaskID) => {
    return Task.deletetask(state.auth.uid, TaskID)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  deletetaskgroup: ({ dispatch, state }, TaskGroupID) => {
    return TaskGroup.deletetaskgroup(state.auth.uid, TaskGroupID)
      .then(() => {
        dispatch("fetchLists");
      })
      .catch((err) => {
        throw err;
      });
  },
  // login: ({ commit }, authInfo) => {
  //   return Auth.login(authInfo)
  //     .then(({ token, userId }) => {
  //       localStorage.setItem("token", token);
  //       commit(types.AUTH_LOGIN, { token, userId });
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // },

  fetchLists: ({ commit, state }) => {
    return TaskGroup.fetch(state.auth.uid, state.auth.uid)
      .then((response) => {
        // Group及びTaskに表示、非表示をコントロールするshowを追加
        if (response.lists != null) {
          for (let i = 0; i < response.lists.length; i++) {
            if (response.lists[i].Task != null) {
              for (let j = 0; j < response.lists[i].Task.length; j++) {
                if (response.lists[i].Task[j].List != null) {
                  for (
                    let k = 0;
                    k < response.lists[i].Task[j].List.length;
                    k++
                  ) {
                    // Listへedit_listnameを追加
                    response.lists[i].Task[j].List[
                      k
                    ].List_edit_listname_flg = false;
                  }
                }
                // Taskへshowを追加
                response.lists[i].Task[j].Task_show_list = true;
                response.lists[i].Task[j].Task_edit_taskname_flg = false;
              }
            }
            // Groupへshowを追加
            response.lists[i].TaskGroup_show_task = true;
            response.lists[i].TaskGroup_edit_taskgroupname_flg = false;
          }
        }
        commit(types.FETCH_ALL_TASKLIST, response.lists);
      })
      .catch((err) => {
        throw err;
      });
  },

  addTask_: ({ commit, state }, { name, description, list }) => {
    return Task.add(state.auth.uid, { list, description, name })
      .then((task) => {
        commit(types.ADD_TASK, task);
      })
      .catch((err) => {
        throw err;
      });
  },

  updateTask: ({ commit, state }, task) => {
    return Task.update(state.auth.uid, task)
      .then(() => {
        commit(types.UPDATE_TASK, task);
      })
      .catch((err) => {
        throw err;
      });
  },

  removeTask: ({ commit, state }, { taskId, list }) => {
    return Task.remove(state.auth.uid, taskId)
      .then(() => {
        commit(types.REMOVE_TASK, { taskId, list });
      })
      .catch((err) => {
        throw err;
      });
  },

  moveTaskFrom: ({ commit }, { taskId, ListId }) => {
    commit(types.MOVE_TASK_FROM, { targetId: taskId, from: ListId });
    return Promise.resolve();
  },

  moveToTask: ({ commit }, { taskId, ListId, tolist }) => {
    commit(types.MOVE_TO_TASK, {
      targetId: taskId,
      to: ListId,
      tolist: tolist,
    });
    return Promise.resolve();
  },

  performTaskMoving: ({ commit, state }) => {
    const { target, from, to, tolist } = state.dragging;
    return Task.move(state.auth.uid, { taskId: target, list: tolist })
      .then(() => {
        commit(types.MOVE_TASK_DONE, { target, from, to });
      })
      .catch((err) => {
        throw err;
      });
  },

  logout: ({ commit, state }) => {
    return Auth.logout(state.auth.uid)
      .then(() => {
        commit(types.AUTH_LOGOUT, { token: null, userId: null });
      })
      .catch((err) => {
        throw err;
      });
  },
};
