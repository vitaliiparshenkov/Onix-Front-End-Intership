<template lang="pug">
p.day today
.msg_container(v-for="(msgItem, index) of MessageList" :key="index")
  div(:class="'status_' + msgItem.status")
  .msg
    p.msg {{ msgItem.message }}

    .msg_answer(v-if="msgItem.answer")
      p.answer {{ msgItem.answer }}

    .msg_list(v-if="msgItem.imageList")
      .img_item(v-for="(imgItem, ind) of msgItem.imageList" :key="ind")
        img(:src="require('@/assets/' + imgItem)" :alt="imgItem" @click="$emit('changeNotifis', ind)")
  time.time(datetime="2010-07-26T23:42+03:00") {{ msgItem.time }}
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {MessageInterface} from '@/types/activity.interface.ts';
export default defineComponent({
  data() {
    return {
      MessageList: [
        {
          status: 'check',
          message: 'Darika Samak mark sa done Listing on Product Hunt so that we can reach as many potential users',
          time: '8:40 PM',
        },
        {
          status: 'msg',
          message: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          time: '7:32 PM',
          answer:
            'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
        },
        {
          status: 'download',
          message: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          time: '6:02 PM',
          imageList: ['img-1.png', 'foto_2.jpg', 'foto_3.jpg', 'img-4.png'],
        },
      ] as MessageInterface[],
    };
  },
  emits: ['changeNotifis'],
});
</script>
