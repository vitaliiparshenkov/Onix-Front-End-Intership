<template lang="pug">
form(@submit.prevent="onSubmit")
  fieldset
    legend &nbsp;Form for add/edit a new task&nbsp;
    label(for="todoName") Name
      em *
    input(type="text" v-model="changeRecord.name" id="todoName" placeholder="" required autofocus :disabled="isDisable")
    br
    label(for="todoDesc") Description
      em *
    textarea(v-model="changeRecord.desc" id="todoDesc" placeholder="" required rows="2" :disabled="isDisable")
    .flex
      .status
        br
        label(for="status") Status
          em *
        select(v-model="changeRecord.status" id="status" :disabled="isDisable || isStatusOperationAdd")
          option(value="todo") To Do
          option(value="inprogress") In Progress
          option(value="done") Done
      .date
        br
        label(for="date") Complete&nbsp;date
          em *
        datepicker.date-class(id="date" v-model="compDate" :lowerLimit="from" readonly :disabled="isDisable" :inputFormat="inputFormat" startingView="day")
    button(type="submit" :class="{hidden: !visible}") {{buttonCaption}}
    p.wrong(v-show="showMessageWrongPeriod") Completed tasks cannot be edited
</template>

<script lang="ts">
import {defineComponent, ref, computed, watch, onMounted} from 'vue';
import {TodoInterface, StatusEnum, StatusOperation} from '@/types/task.interface';
import Datepicker from 'vue3-datepicker';
import dateInStringFormat from '@/mixins/dateInStringFormat';
import getDateInStringFormat from '../composables/getDateInStringFormat';
import {useStore} from 'vuex';
import {mapState, mapMutations, mapActions} from 'vuex';

export default defineComponent({
  setup(props, {emit}) {
    // const compDate = ref(new Date());
    // const visible = ref(true); // {value: true}
    // const isDisable = ref(false);
    // let statusOper: StatusOperation = ref(StatusOperation.Add);
    // let changeRecord: TodoInterface = ref({});
    // const showMessageWrongPeriod = ref(false);
    // let from = new Date();
    // let inputFormat = 'MM/dd/yyyy';
	//
    // const buttonCaption = computed(() => {
    //   switch (statusOper.value) {
    //     case StatusOperation.Edit:
    //       return StatusOperation[1];
	//
    //     case StatusOperation.Cancel:
    //       return StatusOperation[2];
	//
    //     case StatusOperation.Save:
    //       return StatusOperation[3];
	//
    //     default:
    //       return StatusOperation[0];
    //   }
    // });
    // const isStatusOperationAdd = computed(() => {
    //   return statusOper.value == StatusOperation.Add;
    // });
    // const waitForChange = () => {
    //   if (statusOper.value != StatusOperation.Add) {
    //     const changeRec = watch(
    //       changeRecord.value,
    //       () => {
    //         statusOper.value = StatusOperation.Save;
    //         changeRec();
    //       },
    //       {deep: true},
    //     );
    //   }
    // };
    // const onSubmit = () => {
    //   //-- Edit -----
    //   if (isDisable.value) {
    //     if (changeRecord.value.status != StatusEnum.Done) {
    //       isDisable.value = false;
    //       statusOper.value = StatusOperation.Cancel;
    //     } else {
    //       showMessageWrongPeriod.value = true;
    //     } //-- Cancel -----
    //   } else if (statusOper.value == StatusOperation.Cancel) {
    //     emit('cancel');
    //   } else {
    //     //-- Add/Edit new task -----
    //     if (props.modifyTaskId != -1) {
    //       store.dispatch('modifyTodo', {id: props.modifyTaskId, task: {...changeRecord}});
    //     } else {
    //       let newId = store.state.todoList.length;
    //       while (store.state.todoList.findIndex((t: TodoInterface) => t.taskId == newId) != -1) {
    //         newId++;
    //       }
    //       changeRecord.value.taskId = newId;
    //       store.commit('addTodo', changeRecord.value);
    //     }
    //     emit('save-task');
    //     visible.value = false;
    //     setTimeout(() => {
    //       visible.value = true;
    //     }, 3000);
    //   }
    // };
	//
    // const store = useStore();
	//
    // if (props.modifyTaskId != -1) {
    //   changeRecord.value = {...store.state.todoList[props.modifyTaskId]};
    //   isDisable.value = true;
    //   statusOper = StatusOperation.Edit;
    //   compDate.value = new Date(changeRecord.value.completionDate);
    // } else {
    //   changeRecord.value = {
    //     taskId: -1,
    //     name: '',
    //     desc: '',
    //     completionDate: getDateInStringFormat(new Date()),
    //     completed: false,
    //     show: false,
    //     status: StatusEnum.Todo,
    //   };
    // }
	//
    // onMounted(waitForChange);

    // watch(compDate, (newValue, oldValue) => {
    //   changeRecord.value.completionDate = getDateInStringFormat(newValue);
    // });
    //watch(propName, funcName);

    return {
      // compDate,
      // visible,
      // isDisable,
      // statusOper,
      // changeRecord,
      // showMessageWrongPeriod,
      // from,
      // inputFormat,
      // buttonCaption,
      // isStatusOperationAdd,
      // onSubmit,
    };
  },

  data() {
    return {
      compDate: new Date(),
      visible: true,
      isDisable: false,
      statusOper: StatusOperation.Add as StatusOperation,
      changeRecord: {} as TodoInterface,
      showMessageWrongPeriod: false,
      from: new Date(),
      inputFormat: 'MM/dd/yyyy',
    };
  },

  components: {
    datepicker: Datepicker,
  },

  props: ['modifyTaskId'],

  mixins: [dateInStringFormat],

  emits: {
    'save-task': null,
    cancel: null,
  },

  methods: {
    //--- 1 variant
    // ...mapMutations(['addTodo']),

    //--- 2 variant
    ...mapMutations('todos', {addNewTodo: 'ADD_TODO'}),
    ...mapActions('todos', {changeTodo: 'modifyTodo'}),

    onSubmit() {
      //-- Edit -----
      if (this.isDisable) {
        if (this.changeRecord.status != StatusEnum.Done) {
          this.isDisable = false;
          this.statusOper = StatusOperation.Cancel;
        } else {
          this.showMessageWrongPeriod = true;
        } //-- Cancel -----
      } else if (this.statusOper == StatusOperation.Cancel) {
        this.$emit('cancel');
      } else {
        //-- Add/Edit new task -----
        if (this.modifyTaskId != -1) {
          this.changeTodo({id: this.modifyTaskId, task: {...this.changeRecord}});
        } else {
          let newId = this.todoList.length;
          while (this.todoList.findIndex((t: TodoInterface) => t.taskId == newId) != -1) {
            newId++;
          }
          this.changeRecord.taskId = newId;
          this.addNewTodo(this.changeRecord);
        }
        this.$emit('save-task');
        this.visible = false;
        setTimeout(() => {
          this.visible = true;
        }, 3000);
      }
    },
  },

  created() {
    if (this.modifyTaskId != -1) {
      this.changeRecord = {...this.todoList[this.modifyTaskId]};
      this.isDisable = true;
      this.statusOper = StatusOperation.Edit;
      this.compDate = new Date(this.changeRecord.completionDate);
    } else {
      this.changeRecord = {
        taskId: -1,
        name: '',
        desc: '',
        completionDate: this.getDateInStringFormat(new Date(), 5),
        createDate: this.getDateInStringFormat(new Date()),
        completed: false,
        show: false,
        status: StatusEnum.Todo,
      };
      this.compDate = new Date(this.changeRecord.completionDate);
    }
  },

  mounted() {
    if (this.statusOper != StatusOperation.Add) {
      const changeRec = this.$watch(
        'changeRecord',
        () => {
          this.statusOper = StatusOperation.Save;
          changeRec();
        },
        {deep: true},
      );
    }
  },

  computed: {
    ...mapState('todos', ['todoList']),

    buttonCaption() {
      switch (this.statusOper) {
        case StatusOperation.Edit:
          return StatusOperation[1];

        case StatusOperation.Cancel:
          return StatusOperation[2];

        case StatusOperation.Save:
          return StatusOperation[3];

        default:
          return StatusOperation[0];
      }
    },

    isStatusOperationAdd() {
      return this.statusOper == StatusOperation.Add;
    },
  },

  watch: {
    compDate(currVal, oldVal) {
      this.changeRecord.completionDate = this.getDateInStringFormat(currVal);
    },
  },
});
</script>

<style lang="scss">
.wrong {
  color: red;
  font-size: 12px;
  margin-top: 10px;
}

.flex {
  display: flex;
  justify-content: space-between;

  .status,
  .date {
    width: 45%;
  }
}

.hidden {
  visibility: hidden;
  transition: all 0.8s ease;
}

form {
  margin-top: 15px;

  fieldset {
    border: 1px solid #cccccc;
    padding: 10px;

    legend {
      font-size: 15px;
      font-weight: bolder;
      letter-spacing: 1.2px;
    }

    label {
      display: inline-block;
      width: 85px;
      margin: 3px 0;

      em {
        color: red;
        font-weight: bold;
      }
    }

    input,
    textarea,
    select,
    input#date.date-class {
      padding: 3px 5px;
      display: block;
      width: 100%;
      max-width: 648px;
      border: 1px solid #cccccc;
      font-size: 13px;
      line-height: 16px;

      &:focus {
        background: #fff8dd;
      }
    }

    select {
      min-width: 100%;
      max-width: 40%;
      background-color: inherit;

      option {
        border-top: 1px solid #cccccc;
      }
    }

    button {
      margin-top: 20px;
      background-color: #ffc200;
      color: #131313;
      padding: 4px 25px;
      border: 1px solid #cccccc;
      font-size: 15px;
      transition: all 0.8s ease;

      &:hover {
        background-color: #eaeaea;
        border: 1px solid #cccccc;
        transition: 0.3s ease-out;
      }
    }
  }
}

@media only screen and (max-width: 450px) {
  .flex {
    flex-direction: column-reverse;

    .status,
    .date {
      width: 100%;
    }
  }
}
</style>
