<template lang="pug">
h1 Event Calendar
Calendar(:attributes="attributes" title-position="left" is-expanded )

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TodoInterface} from '@/types/task.interface';
import {Calendar, DatePicker} from 'v-calendar';
import {mapState} from 'vuex';

export default defineComponent({
  data() {
    return {};
  },

  name: 'calendar',

  components: {
    Calendar,
    DatePicker,
  },

  emits: {},

  computed: {
    ...mapState('todos', {todoList: 'todoList'}),

    attributes() {
      return [
        // ...this.$store.modules.todos.state.todoList.map((todo: TodoInterface) => ({
        //   dates: todo.completionDate,
        //   dot: false,
        //   popover: {
        //     label: todo.name,
        //     visibility: 'click',
        //     // hideIndicator: true,
        //     style: {
        //       backgroundColor: 'red',
        //     },
        //   },
        //   // customData: todo,
        //   highlight: {
        //     color: 'indigo',
        //     fillMode: 'solid',
        //     style: {
        //       borderRadius: 0,
        //     },
        //   },
        // })),
      ];
    },
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

  .vc-weeks {
    &.vc-weekday,
    &.vc-day-box-center-center {
      border-top: 1px solid #cccccc;
    }
  }
}
</style>
