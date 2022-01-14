<template lang="pug">
.flex-container
  .todo(@dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box To Do
      p.header-box-count -&nbsp;{{getCountTodoStatus('todo')}}&nbsp;-
    .task-box(v-for="(todo, todoId) of getTodoType('todo')" :key="todo" :class="getClassDependentOn(todo.status)" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_' + todoListGlobal.indexOf(todo)")
      i.status.fas(:class="getClassStatus(todo.completionDate)")
      p.name {{ todo.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") {{ todo.completionDate.toString().substr(4, 11) }}
      i.modify.fas.fa-pen(@click="modifyTask(todoListGlobal.indexOf(todo))")

  .inprogress(@dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box In Progress
      p.header-box-count -&nbsp;{{getCountTodoStatus('inprogress')}}&nbsp;-
    .task-box(v-for="(inprogress, inprogressId) of getTodoType('inprogress')" :key="inprogress" :class="getClassDependentOn(inprogress.status)" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_' + todoListGlobal.indexOf(inprogress)")
      i.status.fas(:class="getClassStatus(inprogress.completionDate)")
      p.name {{ inprogress.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") {{ inprogress.completionDate.toString().substr(4, 11) }}
      i.modify.fas.fa-pen(@click="modifyTask(todoListGlobal.indexOf(inprogress))")

  .done(@dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave" @drop="dragDrop")
    h2.header-box Done
      p.header-box-count -&nbsp;{{getCountTodoStatus('done')}}&nbsp;-
    .task-box(v-for="(done, doneId) of getTodoType('done')" :key="done" :class="getClassDependentOn(done.status)" draggable="true" @dragstart="dragStart" @dragend="dragEnd" :id="'todoId_' + todoListGlobal.indexOf(done)")
      i.status.far.fa-calendar-check
      p.name {{ done.name }}
      strong
        time(datetime="2010-07-26T23:42+03:00") {{ done.completionDate.toString().substr(4, 11) }}
      <!--i.modify.fas.fa-pen(@click="modifyTask(todoListGlobal.indexOf(done))")-->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {TodoInterface, StatusEnum} from '@/types/task.interface';

export default defineComponent({
  data() {
    return {
      StatusEnum,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
