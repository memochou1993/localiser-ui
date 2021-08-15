<template>
  <div
    class="q-mb-md"
  >
    <q-input
      v-model="state.text"
      :model-value="state.text"
      autocomplete="off"
      autofocus
      autogrow
      borderless
      dense
      input-style="max-height: 6rem;"
      type="textarea"
      @keyup.enter.stop
    />
  </div>
  <div>
    <q-btn
      class="q-mr-xs"
      color="primary"
      icon="mdi-check"
      size="sm"
      unelevated
      @click="onSubmit({ keyId, languageId, valueId, text: state.text })"
    />
    <q-btn
      class="q-mr-xs"
      icon="mdi-close"
      outline
      size="sm"
      @click="onClose"
    />
  </div>
</template>

<script>
import {
  reactive,
} from 'vue';

export default {
  name: 'ValueEditor',
  props: {
    defaultText: {
      type: String,
      default: '',
    },
    keyId: {
      type: Number,
      default: 0,
    },
    languageId: {
      type: Number,
      default: 0,
    },
    valueId: {
      type: Number,
      default: 0,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      text: props.defaultText,
    });
    return {
      state,
    };
  },
};
</script>
