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
    button(type="submit" :class="{hidden: !visible}") {{buttonCaption}}
    p.wrong(v-show="showMessageWrongPeriod") Completed tasks cannot be edited
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TodoInterface, StatusEnum, StatusOperation} from '@/types/task.interface';
export default defineComponent({
  data() {
    return {
      visible: true,
      isDisable: false,
      statusOper: StatusOperation.Add as StatusOperation,
      changeRecord: {} as TodoInterface,
      showMessageWrongPeriod: false,
    };
  },

  props: ['modifyTask'],

  emits: {
    'save-task': null,
    cancel: null,
  },

  methods: {
    onSubmit() {
      //-- Edit -----
      if (this.isDisable) {
        if (this.modifyTask.status != StatusEnum.Done) {
          this.isDisable = false;
          this.statusOper = StatusOperation.Cancel;
        } else {
          this.showMessageWrongPeriod = true;
        } //-- Cancel -----
      } else if (this.statusOper == StatusOperation.Cancel) {
        this.$emit('cancel');
      } else {
        //-- Add/Edit new task -----
        if (this.statusOper == StatusOperation.Add && this.changeRecord.name.trim() && this.changeRecord.desc.trim()) {
          let nowDate = new Date();
          let currDate = nowDate.getMonth() + 1 + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();
          this.changeRecord.completionDate = currDate;
        }

        this.$emit('save-task', this.changeRecord);
        this.visible = false;
        setTimeout(() => {
          this.visible = true;
        }, 3000);
      }
    },
  },

  created() {
    if (Object.keys(this.modifyTask).length != 0) {
      this.changeRecord = {...this.modifyTask};
      this.isDisable = true;
      this.statusOper = StatusOperation.Edit;
    } else {
      this.changeRecord = {
        name: '',
        desc: '',
        completionDate: '',
        completed: false,
        show: false,
        status: StatusEnum.Todo,
      };
    }
  },

  mounted() {
    if (this.statusOper != StatusOperation.Add) {
      const changeRec = this.$watch(
        'changeRecord',
        () => {
          this.statusOper = StatusOperation.Save;
          // console.log(this.statusOper);
          changeRec();
        },
        {deep: true},
      );
    }
  },

  computed: {
    buttonCaption() {
      if (this.statusOper == StatusOperation.Edit) {
        return StatusOperation[1];
      }
      if (this.statusOper == StatusOperation.Cancel) {
        return StatusOperation[2];
      }
      if (this.statusOper == StatusOperation.Save) {
        return StatusOperation[3];
      }
      return StatusOperation[0];
    },
  },
});
</script>

<style lang="scss" scoped>
.wrong {
  color: red;
  font-size: 12px;
  margin-top: 10px;
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
    textarea {
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

    button {
      margin-top: 15px;
      /*border-radius: 15px;*/
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
</style>
