<template lang="pug">
form(@submit.prevent="onSubmit")
  fieldset
    legend &nbsp;Form for adding a new task&nbsp;
    label(for="todoName") Name
      em *
    input(type="text" v-model="todoName" id="todoName" placeholder="" required autofocus)
    br
    label(for="todoDesc") Description
      em *
    textarea(v-model="todoDesc" id="todoDesc" placeholder="" required rows="2")
    button(type="submit" :class="{hidden: !visible}") Add task
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
  data() {
    return {
      todoName: '',
      todoDesc: '',
      visible: true,
    };
  },
  methods: {
    onSubmit() {
      if (this.todoName.trim() && this.todoDesc.trim()) {
        let nowDate = new Date();
        let currDate = nowDate.getMonth() + 1 + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();

        const newTask = {
          name: this.todoName,
          desc: this.todoDesc,
          completionDate: currDate,
          completed: false,
          show: false,
          // status: StatusEnum.Todo,
          status: 'todo',
        };

        this.$emit('add-task', newTask);
        this.visible = false;
        setTimeout(() => {
          this.visible = true;
        }, 3000);
        this.todoName = '';
        this.todoDesc = '';
      }
    },
  },

  watch: {
    // todoName(value) {
    //
    // },
    // todoDesc(value) {
    //
    // },
  },
});
</script>

<style lang="scss" scoped>
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
      border-radius: 15px;
      background-color: #ffc200;
      color: #131313;
      padding: 5px 15px;
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
