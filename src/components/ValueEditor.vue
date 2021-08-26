<template>
  <q-menu
    :offset="[offset, 0]"
    :style="`width: ${width + offset}px`"
    class="q-pa-md shadow-4"
    @hide="submit"
  >
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
        @click="submit"
      />
      <q-btn
        class="q-mr-xs"
        icon="mdi-close"
        outline
        size="sm"
        @click="onClose"
      />
    </div>
  </q-menu>
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
      type: String,
      default: '',
    },
    languageId: {
      type: String,
      default: '',
    },
    valueId: {
      type: String,
      default: '',
    },
    offset: {
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
    width: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const state = reactive({
      text: props.defaultText,
    });
    const submit = () => {
      props.onSubmit({
        keyId: props.keyId,
        languageId: props.languageId,
        valueId: props.valueId,
        text: state.text,
      });
    };
    return {
      state,
      submit,
    };
  },
};
</script>
