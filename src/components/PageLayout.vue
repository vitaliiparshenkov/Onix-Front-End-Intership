<template lang="pug">
div(:class="['wrapper', {lock: showStats}]" @lockWrapper="showStats = $event")
	.wrapper_container
		.sidebar
			TheSidebar(:notifications="notifications")

		.content
			TheHeader
			main
				router-view(@changeNotifis="notifications = $event" :todoListGlobal="todoListGlobal" @todoListGlobalUpdate="todoListGlobal = $event")
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
  created() {
    this.todoListGlobal = [
      {
        name: 'Доделать домашнее задание №3',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '11/22/2021',
        completed: false,
        show: false,
        status: StatusEnum.Todo,
        // status: 'todo',
      },
      {
        name: 'Сделать домашнее задание №4',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '11/05/2021',
        completed: false,
        show: false,
        status: StatusEnum.Todo,
        // status: 'todo',
      },
      {
        name: 'Закончить Onix front-end Intership',
        desc: 'Получить диплом(грамоту)',
        completionDate: '12/31/2021',
        completed: false,
        show: false,
        status: StatusEnum.Todo,
        // status: 'todo',
      },
      {
        name: 'Попасть в onix team',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '01/31/2022',
        completed: false,
        show: false,
        status: StatusEnum.Todo,
        // status: 'todo',
      },
      {
        name: 'Получить offer',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '01/15/2022',
        completed: false,
        show: false,
        status: StatusEnum.Done,
        // status: 'done',
      },
      {
        name: 'Пройти испытательный срок',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '04/15/2022',
        completed: false,
        show: false,
        status: StatusEnum.Done,
        // status: 'done',
      },
      {
        name: 'Договориться о высокой ЗП',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '01/10/2022',
        completed: false,
        show: false,
        status: StatusEnum.Inprogress,
        // status: 'inprogress',
      },
      {
        name: 'Полноценно приступить к работе',
        desc: 'Написать программу, содержащую процедуру, которая меняет местами первый и пятый элементы непустого списка. Если элементы не найдены, то выдать на экран соответствующие сообщение.',
        completionDate: '02/10/2022',
        completed: false,
        show: false,
        status: StatusEnum.Todo,
        // status: 'todo',
      },
    ];
  },
});
</script>

<style scoped lang="scss"></style>
