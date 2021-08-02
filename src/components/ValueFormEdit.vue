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
      :disable="text === valueText"
      icon="mdi-check"
      size="sm"
      unelevated
      @click="onEditValue({ keyId, valueId, text })"
    />
    <q-btn
      class="q-mr-xs"
      icon="mdi-close"
      outline
      size="sm"
      @click="$emit('close')"
    />
  </div>
</template>

<script>
import {
  ref,
} from 'vue';

export default {
  name: 'ValueFormEdit',
  props: {
    keyId: {
      type: Number,
      required: true,
    },
    onEditValue: {
      type: Function,
      default: () => {},
    },
    valueId: {
      type: Number,
      required: true,
    },
    valueText: {
      type: String,
      default: '',
    },
  },
  emits: [
    'close',
  ],
  setup(props) {
    const text = ref(props.valueText);
    return {
      text,
    };
  },
};
</script>
