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
    button(v-show="isShowButt" type="submit") {{buttonCaption}}
    p.wrong(v-show="showMessageWrongPeriod") Completed tasks cannot be edited
</template>

<script lang="ts">
import {defineComponent, ref, computed, watch} from 'vue';
import {TodoInterface, StatusEnum, StatusOperation} from '@/types/task.interface';
import Datepicker from 'vue3-datepicker';
import getDateInStringFormat from '../composables/getDateInStringFormat';
import {useStore} from 'vuex';

export default defineComponent({
  props: ['modifyTaskId', 'parentComp'],

  setup(props, {emit}) {
    const store = useStore();
    const compDate = ref(new Date());
    const isDisable = ref(false);
    const isShowButt = props.parentComp != 'calendar' ? true : false;
    const statusOper = ref<StatusOperation>(StatusOperation.Add);
    const showMessageWrongPeriod = ref(false);
    const from = new Date();
    const inputFormat = 'MM/dd/yyyy';

    const buttonCaption = computed(() => {
      switch (statusOper.value) {
        case StatusOperation.Edit:
          return StatusOperation[1];

        case StatusOperation.Cancel:
          return StatusOperation[2];

        case StatusOperation.Save:
          return StatusOperation[3];

        default:
          return StatusOperation[0];
      }
    });
    const isStatusOperationAdd = computed(() => {
      return statusOper.value == StatusOperation.Add;
    });

    let changeRecord = ref<TodoInterface>({
      taskId: Math.floor(Math.random() * 1000),
      name: '',
      desc: '',
      completionDate: getDateInStringFormat(new Date(), 5),
      createDate: getDateInStringFormat(compDate.value as Date),
      completed: false,
      show: false,
      status: StatusEnum.Todo,
    });

    if (props.modifyTaskId != -1) {
      store.dispatch('todos/AC_GET_TASK_BY_ID', {params: {id: props.modifyTaskId}}).then((result) => {
        if (result) {
          changeRecord.value = {...result};
          waitForChange();
        }
      });
    }

    if (props.modifyTaskId != -1) {
      isDisable.value = true;
      statusOper.value = StatusOperation.Edit;
      compDate.value = new Date(changeRecord.value.completionDate as string);
    }

    const onSubmit = () => {
      //-- Edit -----
      if (isDisable.value) {
        if (changeRecord.value.status != StatusEnum.Done) {
          isDisable.value = false;
          statusOper.value = StatusOperation.Cancel;
        } else {
          showMessageWrongPeriod.value = true;
        } //-- Cancel -----
      } else if (statusOper.value == StatusOperation.Cancel) {
        emit('cancel');
      } else {
        //-- Add/Edit new task -----
        if (props.modifyTaskId != -1) {
          store
            .dispatch('todos/AC_MODIFY_TODO', {id: props.modifyTaskId, task: {...changeRecord.value}})
            .then(() => {
              emit('save-task');
            })
            .catch((error) => {
              if (error) {
                errorHandler(error);
              }
            });
        } else {
          store
            .dispatch('todos/AC_ADD_TODO', {...changeRecord.value})
            .then(() => {
              emit('save-task');
            })
            .catch((error) => {
              if (error) {
                errorHandler(error);
              }
            });
        }
      }
    };

    const errorHandler = (error: any) => {
      alert('Error\nOperation was rejected(modalWindow) !!! \n' + error);
      emit('cancel');
    };

    const waitForChange = () => {
      if (statusOper.value != StatusOperation.Add) {
        const changeRec = watch(
          changeRecord,
          () => {
            statusOper.value = StatusOperation.Save;
            changeRec();
          },
          {deep: true},
        );
      }
    };
    // onMounted(waitForChange);

    watch(compDate, (newValue) => {
      changeRecord.value.completionDate = getDateInStringFormat(newValue as Date);
    });

    return {
      compDate,
      isDisable,
      statusOper,
      changeRecord,
      showMessageWrongPeriod,
      from,
      inputFormat,
      buttonCaption,
      isStatusOperationAdd,
      onSubmit,
      getDateInStringFormat,
      isShowButt,
    };
  },

  components: {
    datepicker: Datepicker,
  },

  emits: {
    'save-task': null,
    cancel: null,
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
