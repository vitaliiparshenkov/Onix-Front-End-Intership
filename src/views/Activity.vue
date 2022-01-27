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
        <!--img(:src="require('@/assets/' + imgItem)" :alt="imgItem" @click="$emit('change-notifis', ind)")-->
        img(:src="require('@/assets/' + imgItem)" :alt="imgItem" @click="changeNotofis(ind)")
  time.time(datetime="2010-07-26T23:42+03:00") {{ msgItem.time }}
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import {useStore} from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();

    let MessageList = computed(() => {
      return store.state.messages.MessageList;
    });

    function changeNotofis(param: number) {
      store.commit('modifyNotofis', param);
    }

    return {
      MessageList,
      changeNotofis,
    };
  },

  name: 'activity',
});
</script>
