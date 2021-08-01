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
      @click="onCreateValue({ keyId, languageId, text })"
    />
    <q-btn
      class="q-mr-xs"
      icon="mdi-close"
      outline
      size="sm"
      @click="onReset"
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
    languageId: {
      type: Number,
      required: true,
    },
    onCreateValue: {
      type: Function,
      default: () => {},
    },
    onReset: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const text = ref(null);
    return {
      text,
    };
  },
};
</script>
