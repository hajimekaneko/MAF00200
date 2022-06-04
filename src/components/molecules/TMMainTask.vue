<template>
  <div class="task-main row px-2">
    <div class="col">
      <TMMainTMP
        :name="Task_name"
        :edit_content_flg="Task_edit_taskname_flg"
        :content_status="Task_status"
        @deleteContent="openDeleteModal"
        @decompress="task_decompress(TaskGroup_index, Task_index)"
        @addContent="addContent(TaskGroup_index, Task_index)"
        @edit_content_name="edit_task_name(TaskGroup_index, Task_index)"
        @edited_content_name="
          edited_task_name($event, TaskGroup_index, Task_index, Task)
        "
        @changeStatus="changeTaskStatus($event)"
      />
      <ul v-show="Task_show_list" class="row">
        <li class="col-12" v-for="(list, index) in lists" :key="list.ListId">
          <TMMainList
            :List_edit_listname_flg="list.List_edit_listname_flg"
            :List_name="list.List_name"
            :List_Status="list.List_status"
            :List_Memo="list.List_memo"
            :List_index="index"
            :Task_index="Task_index"
            :TaskGroup_index="TaskGroup_index"
            @edit_list_name="edit_list_name(TaskGroup_index, Task_index, index)"
            @changeStatus="
              changeListStatus(
                $event,
                list.ListId,
                list.List_status,
                TaskGroup_index,
                Task_index,
                index
              )
            "
            @edited_list_name="
              edited_list_name($event, TaskGroup_index, Task_index, index, list)
            "
          />
        </li>
      </ul>
    </div>
    <TMModalWindowsDelete
      :Content_name="Task_name"
      v-show="showDeleteModal"
      @closeDeleteModal="closeDeleteModal"
      @deleteContent="deleteTask(TaskGroup_index, Task_index)"
    >
    </TMModalWindowsDelete>
  </div>
</template>

<script>
import TMMainTMP from "@/components/molecules/TMMainTMP.vue";
import TMMainList from "@/components/molecules/TMMainList.vue";
import TMModalWindowsDelete from "@/components/organisms/TMModalWindowsDelete.vue";

// import _ from 'lodash'

export default {
  name: "TMMainTask",

  components: {
    TMMainTMP,
    TMMainList,
    TMModalWindowsDelete,
  },
  // data () {
  //   return {
  //     hoge: 'test'
  //   }
  // },
  data() {
    return {
      showDeleteModal: false,
    };
  },

  props: {
    lists: {
      type: Array,
      required: true,
    },
    Task_name: {
      type: String,
      required: true,
    },
    Task_show_list: {
      type: Boolean,
      required: true,
    },
    TaskGroup_index: {
      type: Number,
      required: true,
    },
    Task_index: {
      type: Number,
      required: true,
    },
    Task_edit_taskname_flg: {
      type: Boolean,
      required: true,
    },
    Task_status: {
      type: Number,
      required: true,
    },
    Task: {
      type: Object,
      required: true,
    },
  },
  created: function () {},
  computed: {},
  methods: {
    // `click`イベントを発行
    task_decompress() {
      this.$emit("task_decompress");
    },
    addContent(TaskGroup_index, Task_index) {
      let TaskId;
      // let list = new Array()
      TaskId =
        this.$store.state.board.lists[TaskGroup_index].Task[Task_index].TaskId;
      this.$store.dispatch("addlist", TaskId);
    },
    edit_list_name(TaskGroup_index, Task_index, List_index) {
      // console.log(TaskGroup_index, Task_index, List_index)
      this.$store.dispatch("editlistname", {
        TaskGroup_index,
        Task_index,
        List_index,
      });
    },
    edited_list_name(
      newlistname,
      TaskGroup_index,
      Task_index,
      List_index,
      list
    ) {
      var listID;
      listID =
        this.$store.state.board.lists[TaskGroup_index].Task[Task_index].List[
          List_index
        ].ListId;
      if (newlistname === list.List_name) {
        // LIST名が変更なし
        this.$store.dispatch("editedlistname", {
          TaskGroup_index,
          Task_index,
          List_index,
        });
      } else {
        this.$store.dispatch("changelistname", { listID, newlistname });
      }
    },
    edit_task_name(TaskGroup_index, Task_index) {
      this.$store.dispatch("edittaskname", {
        TaskGroup_index,
        Task_index,
      });
    },
    edited_task_name(newtaskname, TaskGroup_index, Task_index, Task) {
      var taskID;
      taskID =
        this.$store.state.board.lists[TaskGroup_index].Task[Task_index].TaskId;
      if (newtaskname === Task.Task_name) {
        // TASK名が変更なし
        this.$store.dispatch("editedtaskname", {
          TaskGroup_index,
          Task_index,
        });
      } else {
        this.$store.dispatch("changetaskname", { taskID, newtaskname });
      }
    },
    changeListStatus(
      event,
      List_Id,
      List_Status,
      TaskGroup_index,
      Task_index,
      List_index
    ) {
      var status;
      var newmemo;
      var memo;
      status = event.status;
      newmemo = event.newmemo;
      memo =
        this.$store.state.board.lists[TaskGroup_index].Task[Task_index].List[
          List_index
        ].List_memo;
      if (newmemo === undefined || memo === newmemo) {
        this.$store.dispatch("changeliststatus", {
          status,
          List_Id,
          List_Status,
        });
      } else {
        console.log("changememo");
        this.$store.dispatch("changememo", {
          status,
          newmemo,
          List_Id,
          List_Status,
        });
      }
    },
    changeTaskStatus(event) {
      this.$emit("changeTaskStatus", event);
    },
    closeDeleteModal: function () {
      this.showDeleteModal = false;
    },
    openDeleteModal() {
      // confirm('削除してよろしいですか?')
      this.showDeleteModal = true;
    },
    deleteTask(TaskGroup_index, Task_index) {
      var TaskID;
      TaskID =
        this.$store.state.board.lists[TaskGroup_index].Task[Task_index].TaskId;
      this.$store.dispatch("deletetask", TaskID);
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 0px;
}
.col {
  padding: 0px;
}
.form-control {
  height: 28px;
}
ul {
  display: flex;
  /* min-height: 5vh; */
  list-style-type: none;
  margin: 16px;
  padding: 0;
}
ul li {
  width: 192px;
  /* margin-right: 8px; */
  border: thin solid black;
  border-radius: 0.5em;
}
.col-12 {
  padding: 0px;
}
</style>
