<template>
  <q-card
    bordered
    class="q-mb-md q-px-sm"
    flat
  >
    <q-input
      v-model="text"
      autofocus
      autogrow
      borderless
      dense
      input-style="max-height: 6rem;"
      type="textarea"
      @keyup.enter.stop
    />
  </q-card>
  <div>
    <q-btn
      class="q-mr-xs"
      color="primary"
      icon="mdi-check"
      size="sm"
      unelevated
      @click="$emit('onSubmit', { keyId, languageId, valueId, text })"
    />
    <q-btn
      class="q-mr-xs"
      icon="mdi-close"
      outline
      size="sm"
      @click="$emit('onClose')"
    />
  </div>
</template>

<script>
import {
  ref,
} from 'vue';

export default {
  name: 'ValueEditor',
  props: {
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
    valueText: {
      type: String,
      default: '',
    },
  },
  emits: [
    'onClose',
    'onSubmit',
  ],
  setup(props) {
    const text = ref(props.valueText);
    return {
      text,
    };
  },
};
</script>
