<template lang="pug">
.modal-shadow(v-if="isOpen" @click="closeModalWindow")
  .modal(@click.stop)
    .modal-close(@click="closeModalWindow") &#10006;
    .modal-title
      slot(name="title")
    .modal-content
      slot(name="body")
    .modal-footer
      slot(name="footer")
</template>

<script lang="ts">
import {defineComponent, onMounted, onBeforeUnmount} from 'vue';

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      require: true,
    },
  },

  setup(props, {emit}) {
    const closeModalWindow = () => {
      emit('closeModalWindow');
    };

    const handleKeydown = (e: any) => {
      if (e.key === 'Escape') {
        closeModalWindow();
      }
    };

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeydown);
    });

    return {
      closeModalWindow,
    };
  },

  emits: {
    closeModalWindow: null,
  },
});
</script>

<style lang="scss">
.modal-shadow {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.41);
  z-index: 1;
}

.modal {
  background: #fff;
  padding: 15px;
  min-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &-close {
    color: #fff;
    background: #753ad7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 7px;
    right: 7px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: 0.3s ease-out;
    /*margin-bottom: 30px;*/

    &:hover {
      color: darkred;
      background-color: transparent;
      transform: scale(1.4);
    }
  }

  &-title {
    color: #0971c7;
    margin-top: 40px;
    h2 {
      /*color: #000000;*/
    }
  }

  &-content {
    margin-bottom: 20px;
  }

  &-footer {
    button {
      background-color: #ffc200;
      color: #131313;
      margin-top: 15px;
      padding: 4px 15px;

      font-size: 16px;
      transition: all 0.8s ease;
      font-weight: 600;
      /*border-radius: 15px;*/
      min-width: 120px;
      border: 1px solid #cccccc;

      &:hover {
        background-color: #eaeaea;
        border: 1px solid #cccccc;
        transition: 0.3s ease-out;
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  .modal {
    min-width: 300px;
  }
}
</style>
