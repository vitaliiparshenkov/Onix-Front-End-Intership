<template lang="pug">
h1 Event Calendar
Calendar(:attributes="attributes()" title-position="left" is-expanded)

</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {TodoInterface} from '@/types/task.interface';
import {Calendar, DatePicker} from 'v-calendar';
import {useStore} from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    let todoList = computed(() => {
      return store.state.todos.todoList;
    });

    const attributes = () => {
      return [
        ...todoList.value.map((todo: TodoInterface) => ({
          dates: todo.createDate,
          dot: false,
          popover: {
            label: todo.name,
            visibility: 'click',
            // hideIndicator: true,
            style: {
              backgroundColor: 'red',
            },
          },
          // customData: todo,
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
    };
  },

  name: 'calendar',

  components: {
    Calendar,
    DatePicker,
  },
});
</script>

<style lang="scss" scoped>
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
