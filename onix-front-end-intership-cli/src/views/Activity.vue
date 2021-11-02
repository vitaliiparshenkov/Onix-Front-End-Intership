<template>
  <p class="day">today</p>
  <div class="msg_container" v-for="(msgItem, index) of MessageList" :key="index">
    <div :class="'status_' + msgItem.status"></div>
    <div class="msg">
      <p class="msg">{{ msgItem.message }}</p>

      <div class="msg_answer" v-if="msgItem.answer">
        <p class="answer">{{ msgItem.answer }}</p>
      </div>

      <div class="msg_list" v-if="msgItem.imageList">
        <div class="img_item" v-for="(imgItem, ind) of msgItem.imageList" :key="ind">
          <img :src="require('@/assets/' + imgItem)" :alt="imgItem" @click="$emit('changeNotifis', ind)">
        </div>
      </div>
    </div>
    <time class="time" datetime="2010-07-26T23:42+03:00">{{ msgItem.time }}</time>
  </div>
</template>

<script>
export default {
  data () {
    return {
      MessageList: [
        {
          status: 'check',
          message: 'Darika Samak mark sa done Listing on Product Hunt so that we can reach as many potential users',
          time: '8:40 PM'
          // answer: '',
          // imageList: []
        },
        {
          status: 'msg',
          message: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          time: '7:32 PM',
          answer: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes'
          // imageList: []
        },
        {
          status: 'download',
          message: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          time: '6:02 PM',
          // answer: '',
          imageList: ['img-1.png', 'foto_2.jpg', 'foto_3.jpg', 'img-4.png']
        }
      ]
    }
  },
  emits: ['changeNotifis'],
  methods: {
    // changeNotifis (ind) {
    //   this.$emit('changeNotifis', ind)
    // }
  }
}
</script>
