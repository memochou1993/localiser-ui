<template>
  <div
    class="q-pb-xs"
  >
    <q-card
      bordered
      class="q-my-xs q-px-sm"
      flat
    >
      <q-input
        v-model="text"
        autofocus
        autogrow
        borderless
        dense
        input-style="max-height: 6rem"
        type="textarea"
        @keyup.enter.stop
      />
    </q-card>
  </div>
  <div
    class="q-my-xs"
  >
    <q-btn
      class="q-mr-xs"
      color="primary"
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
  name: 'ValueCreateForm',
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
