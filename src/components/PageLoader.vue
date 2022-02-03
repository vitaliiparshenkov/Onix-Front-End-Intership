<template lang="pug">
.pre-loader
  .wrap
    .loading
      .bounceball
      <!--.text {{operation}}-->
      .text
        slot(name="operation")
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';
export default defineComponent({
  setup() {
    const operation = inject('operation');

    return {
      operation,
    };
  },
});
</script>

<style lang="scss" scoped>
$width: 15px;
$height: 15px;
$bounce_height: 30px;

.pre-loader {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #9b9b9b;
  opacity: 0.92;
  z-index: 1;
}

.wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  /*position: fixed;*/
}

.text {
  color: #fbae17;
  display: inline-block;
  margin-left: 5px;
}

.bounceball {
  position: relative;
  display: inline-block;
  height: 37px;
  width: $width;
  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: $width;
    height: $height;
    border-radius: 50%;
    background-color: #fbae17;
    transform-origin: 50%;
    animation: bounce 500ms alternate infinite ease;
  }
}

@keyframes bounce {
  0% {
    top: $bounce_height;
    height: 5px;
    border-radius: 60px 60px 20px 20px;
    transform: scaleX(2);
  }
  35% {
    height: $height;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
}
</style>
