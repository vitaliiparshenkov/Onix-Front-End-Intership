<template lang="pug">
div(:class="['wrapper', {lock: showStats}]" @lockWrapper="showStats = $event")
	.wrapper_container
		.sidebar
			TheSidebar(:notifications="notifications")

		.content
			TheHeader
			main
				router-view(@change-notifis="notifications = $event" :todoListGlobal="todoListGlobal" @remove-task="removeTask" @save-task="saveTask")
</template>

<script lang="ts">
import TheSidebar from '@/components/TheSidebar.vue';
import TheHeader from '@/components/TheHeader.vue';
import {defineComponent} from 'vue';
import {TodoInterface, StatusEnum} from '@/types/task.interface';

export default defineComponent({
  data() {
    return {
      notifications: '~',
      showStats: false,
      todoListGlobal: [] as TodoInterface[],
    };
  },

  name: 'layout',

  components: {
    TheSidebar,
    TheHeader,
  },

  methods: {
    saveTask(task: TodoInterface): void {
      if (task.taskId == -1) {
        let newId = this.todoListGlobal.length;
        while (this.todoListGlobal.findIndex((t) => t.taskId == newId) != -1) {
          newId++;
        }
        task.taskId = newId;
        this.todoListGlobal.push(task);
      } else {
        const globalId: any = task.globalId;
        delete task.globalId;
        this.todoListGlobal[globalId] = task;
      }
    },

    removeTask(i: number): void {
      this.todoListGlobal.splice(i, 1);
    },
  },

  created() {
    this.todoListGlobal = [
      {
        taskId: 1,
        name: 'Доделать домашнее задание №3',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('11/22/2021'),
        show: false,
        status: StatusEnum.Done,
      },
      {
        taskId: 2,
        name: 'Сделать домашнее задание №4',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('11/05/2021'),
        show: false,
        status: StatusEnum.Todo,
      },
      {
        taskId: 3,
        name: 'Закончить Onix front-end Intership',
        desc: 'Получить диплом(грамоту)',
        completionDate: new Date('12/31/2021'),
        show: false,
        status: StatusEnum.Todo,
      },
      {
        taskId: 4,
        name: 'Попасть в onix team',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('01/31/2022'),
        show: false,
        status: StatusEnum.Todo,
      },
      {
        taskId: 5,
        name: 'Получить offer',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('01/15/2022'),
        show: false,
        status: StatusEnum.Done,
      },
      {
        taskId: 6,
        name: 'Пройти испытательный срок',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('04/15/2022'),
        show: false,
        status: StatusEnum.Done,
      },
      {
        taskId: 7,
        name: 'Договориться о высокой ЗП',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('01/10/2022'),
        show: false,
        status: StatusEnum.Inprogress,
      },
      {
        taskId: 8,
        name: 'Полноценно приступить к работе',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: new Date('02/10/2022'),
        show: false,
        status: StatusEnum.Todo,
      },
    ];
  },
});
</script>

<style scoped lang="scss"></style>
