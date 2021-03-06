export default {
  // 状態`Auth`と状態`Board`をVuexのstateで一元管理できるよう定義する
  userInfo: {},
  auth: {
    // 状態`Auth`
    isAuth: false,
    uid: "",
    userId: null, // `userId`はnullで初期化
    displayName: "",
    email: "",
    photoURL: "",
    token: localStorage.getItem("token"), // `token`は locale storage から取得する
  },
  board: {
    // 状態`Board`
    lists: [], // 状態`TaskList`は空で初期化
  },
  dragging: {
    // ドラッグ&ドロップされるタスクを処理するための状態を格納する
    target: null, // ドラッグ&ドロップ対象のタスクID
    from: null, // ドラッグ元のタスクリストID
    to: null, // ドロップ先のタスクリストID
    tolist: null, // ドロップ先のlist
  },
};
