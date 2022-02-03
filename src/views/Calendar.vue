<template lang="pug">
modal-window(@closeModalWindow="closeModalWindow" :is-open="isOpenModal" :class="{lock: isOpenModal}")
  template(v-slot:body)
    add-edit-task(@cancel="closeModalWindow" :modify-task-id="modifyTaskId" :parent-comp="nameComponent")

h1 Event Calendar
Calendar(:attributes="attributes()" title-position="left" is-expanded class="custom-calendar max-w-full")
  template(#day-popover="{ day, dayTitle, attributes }")
    ul
      li(v-for="{key, customData} in attributes" :key="customData.taskId" class="todoItem" @click.prevent="showDetails(customData.taskId)")
        a(class="todoLink") {{ customData.name }}

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TodoInterface} from '@/types/task.interface';
import {Calendar} from 'v-calendar';
import ModalWindow from '@/components/ModalWindow.vue';
import AddEditTask from '@/components/AddEditTask.vue';
import modifyTodo from '@/composables/modifyTodo.ts';

export default defineComponent({
  setup() {
    // const isOpenModal = ref(false);
    // const modifyTaskId = ref(-1);
    const nameComponent = 'calendar';

    const {
      todoList,
      getList,
      modifyTaskId,
      isOpenModal,
      // removeTask,
      // saveTask,
      closeModalWindow,
      modifyTask: showDetails,
    } = modifyTodo();

    getList();

    // const {modifyTask: showDetails} = _modifyTask(modifyTaskId, isOpenModal);
    // const {closeModalWindow} = _closeModal(modifyTaskId, isOpenModal);

    const attributes = () => {
      return [
        ...todoList.value.map((todo: TodoInterface) => ({
          dates: todo.createDate,
          dot: false,
          customData: todo,
          popover: true,
          highlight: {
            color: 'indigo',
            fillMode: 'solid',
            style: {
              borderRadius: 0,
            },
          },
        })),
      ];
    };

    return {
      attributes,
      showDetails,
      isOpenModal,
      modifyTaskId,
      closeModalWindow,
      nameComponent,
    };
  },

  name: 'calendar',

  components: {
    Calendar,
    'add-edit-task': AddEditTask,
    'modal-window': ModalWindow,
  },
});
</script>

<style lang="scss" scoped>
.todoItem {
  padding: 5px;
  margin: 3px 0;
  background-color: #ed64a6;
  border-radius: 3px;

  .todoLink {
  }

  &:hover {
    cursor: pointer;
  }
}

.lock {
  overflow: hidden;
  position: fixed;
}

h1 {
  border-bottom: 1px solid #cccccc;
  margin-bottom: 20px;
}

.vc-container {
  border-radius: 0;
  z-index: 0;

  .vc-weeks {
    &.vc-weekday,
    &.vc-day-box-center-center {
      border-top: 1px solid #cccccc;
    }
  }
}
</style>
